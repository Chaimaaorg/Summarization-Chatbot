# -*- coding: utf-8 -*-
import logging
from typing import Dict

from fastapi.exceptions import RequestValidationError
from fastapi import APIRouter
from app.utils.exceptions.main_exception_handler import validation_exception_handler
from fastapi_pagination import add_pagination
from app.api import chat
from app.config.config import settings
from app.config.fastapi import FastAPIWithInternalModels
from app.utils.fastapi_globals import GlobalsMiddleware
from app.utils.lifespan import lifespan
from app.utils.cors import configure_cors

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


app = FastAPIWithInternalModels(
    title=settings.PROJECT_NAME,
    version=settings.API_VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    lifespan=lifespan,
    description = settings.PROJECT_DESCRIPTION
)

app.add_middleware(GlobalsMiddleware)

if settings.BACKEND_CORS_ORIGINS:
    configure_cors(app)

app.add_exception_handler(RequestValidationError, validation_exception_handler)

api_router = APIRouter()

@api_router.get("/")
async def root() -> Dict[str, str]:
    """An example "Hello world" FastAPI route."""
    return {"message": "FastAPI backend"}

api_router.include_router(
    chat.router,
    prefix="/chat",
    tags=["chat"],
)
app.include_router(
    api_router,
    prefix=settings.API_V1_STR,
)
add_pagination(app)






