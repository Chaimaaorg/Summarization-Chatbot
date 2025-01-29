# -*- coding: utf-8 -*-
import logging
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from app.config.config import settings
from app.deps import agent_deps
from app.models.eden_json_model import EdenJsonData
from app.models.output_model import OutputSchema
from app.utils.streaming.helpers import event_generator
from app.chat_services.helpers.chat_helper import (
    create_default_chat_request,
    process_chat_and_create_task,
    process_response_stream
)
from app.utils.streaming.StreamingJsonListResponse import StreamingJsonListResponse

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/")
async def root() -> Any:
    """A simple route for health checks or test purposes."""
    return {"message": "FastAPI backend is running"}


@router.post(
    "/launch_note_generation",
    dependencies=[Depends(agent_deps.set_global_tool_context)],
)
async def launch_note_generation(request: EdenJsonData) -> OutputSchema:
    """
    Endpoint for launching the note generation process.

    Parameters:
    - request: JSON payload adhering to EdenJsonData schema.
    
    Returns:
    - OutputSchema: Structured output containing the generated note.
    """
    chat = create_default_chat_request()
    
    try:
        meta_agent = agent_deps.get_meta_agent(
            chat.api_key or settings.OPENAI_API_KEY, request.dict()
        )
    except Exception as e:
        logger.error(f"Failed to get meta agent: {e}")
        raise HTTPException(status_code=500, detail="Meta agent initialization failed.")
    try:
        stream_handler = await process_chat_and_create_task(
            chat, meta_agent, chat.api_key or settings.OPENAI_API_KEY
        )
    except Exception as e:
        logger.error(f"Failed to process chat: {e}")
        raise HTTPException(status_code=500, detail="Chat processing failed.")

    response = StreamingJsonListResponse(
        content_generator=event_generator(stream_handler),
        media_type="text/plain",
    )
    try:
        result = await process_response_stream(response.body_iterator)
        return result
    except Exception as e:
        logger.error(f"Error while processing stream response: {e}")
        raise HTTPException(status_code=500, detail="Failed to process streaming response.")



        