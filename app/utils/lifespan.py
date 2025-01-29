# -*- coding: utf-8 -*-
import gc
import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from fastapi import FastAPI
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_limiter import FastAPILimiter
from langchain.cache import RedisCache
from langchain.globals import set_llm_cache

from app.api.deps import get_redis_client, get_redis_client_sync
from app.config.config import settings, yaml_configs
from app.utils.config_loader import load_agent_config
from app.utils.fastapi_globals import  g
from app.utils.auth import user_id_identifier

@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncGenerator[None, None]:
    """Start up and shutdown tasks."""
    # startup
    yaml_configs["agent_config"] = load_agent_config()
    # yaml_configs["ingestion_config"] = load_ingestion_configs()

    redis_client = await get_redis_client()

    if settings.ENABLE_LLM_CACHE:
        set_llm_cache(RedisCache(redis_=get_redis_client_sync()))

    FastAPICache.init(
        RedisBackend(redis_client),
        prefix="fastapi-cache",
    )
    await FastAPILimiter.init(
        redis_client,
        identifier=user_id_identifier,
    )

    logging.info("Start up FastAPI [Full dev mode]")
    yield

    # shutdown
    await FastAPICache.clear()
    await FastAPILimiter.close()
    g.cleanup()
    gc.collect()
    yaml_configs.clear()