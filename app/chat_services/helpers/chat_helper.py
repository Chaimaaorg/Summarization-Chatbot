# -*- coding: utf-8 -*-
import asyncio
import json
import logging
from datetime import datetime
from typing import List, Optional
from langchain.agents import AgentExecutor
from app.models.message_model import IChatQuery, IChatMessage
from app.chat_services.meta_agent import get_conv_token_buffer_memory
from app.utils.streaming.callbacks.stream import AsyncIteratorCallbackHandler
from app.utils.streaming.helpers import handle_exceptions
from app.models.output_model import OutputSchema
from fastapi import HTTPException

logger = logging.getLogger(__name__)

def get_meta_tags(chat: IChatQuery) -> List[str]:
    """
    Generate meta tags for tracking purposes in chat sessions.
    Args:
        chat (IChatQuery): The chat object containing metadata.
    Returns:
        List[str]: List of meta tags generated from the chat data.
    """
    if not chat:
        logger.warning("Chat data is empty or None while generating meta tags.")
        return []
    try:
        return [
            "agent_chat",
            f"user_email={chat.user_email}",
            f"conversation_id={chat.conversation_id}",
            f"message_id={chat.new_message_id}",
            f"timestamp={datetime.now()}",
            f"version={chat.settings.version if chat.settings else 'N/A'}",
        ]
    except AttributeError as error:
        logger.error(f"Error generating meta tags: {error}")
        return []

async def process_chat_and_create_task(
    chat: IChatQuery, meta_agent: AgentExecutor, api_key: str
) -> Optional[AsyncIteratorCallbackHandler]:
    """
    Process chat messages and initiate interaction with the agent asynchronously.
    Args:
        chat (IChatQuery): Chat object containing messages and session details.
        meta_agent (AgentExecutor): Initialized agent executor for the session.
        api_key (str): API key for authentication.
    Returns:
        Optional[AsyncIteratorCallbackHandler]: Stream handler for the agent's responses.
    """
    if not chat or not meta_agent:
        logger.error("Invalid chat or meta_agent input for processing.")
        return None

    try:
        chat_messages = [m.to_langchain() for m in chat.messages]
        memory = get_conv_token_buffer_memory(chat_messages[:-1], api_key)
        
        if not chat_messages:
            raise ValueError("Chat messages are empty; cannot proceed.")
        
        chat_content = chat_messages[-1].content if chat_messages[-1] else ""
        stream_handler = AsyncIteratorCallbackHandler()

        asyncio.create_task(
            handle_exceptions(
                meta_agent.arun(
                    input=chat_content,
                    chat_history=memory.load_memory_variables({}).get("chat_history", []),
                    callbacks=[stream_handler],
                    user_settings=chat.settings,
                    tags=get_meta_tags(chat),
                ),
                stream_handler,
            )
        )
        return stream_handler
    except Exception as e:
        logger.error(f"Failed to process chat: {e}")
        return None

def create_default_chat_request() -> IChatQuery:
    """
    Create a default chat request template for quick testing or usage.
    Returns:
        IChatQuery: Predefined chat request object with default values.
    """
    try:
        return IChatQuery(
            messages=[
                IChatMessage(role="user", content="launch actif data extraction tool")
            ],
            api_key="",
            conversation_id="d1128740-93ed-4740-a78e-aa8540bc5089",
            new_message_id="deca7c25-077d-4e6f-85a1-186582d20843",
            user_email="no-auth",
            settings={"data": {}, "version": 1},
        )
    except Exception as e:
        logger.error(f"Error creating default chat request: {e}")
        raise

async def process_response_stream(body_iterator) -> OutputSchema:
    """
    Helper function to process the response body iterator from the streaming response.
    Args:
        body_iterator (AsyncIterator): The iterator providing data as streamed content.
    Returns:
        OutputSchema: The structured final output after parsing the response.
    """
    async for line in body_iterator:
        try:
            value = json.loads(line)
            if value:
                data_type, data_content, metadata = (
                    value.get("data_type"),
                    value.get("data"),
                    value.get("metadata"),
                )
                if data_content and len(data_content) > 0 and data_type == "output":
                    result_metadata = metadata.get("result")
                    if result_metadata:
                        try:
                            parsed_result = json.loads(result_metadata.strip('"'))
                            return OutputSchema(**parsed_result)
                        except json.JSONDecodeError as parse_error:
                            logger.warning(
                                f"Failed to parse metadata result: {parse_error}"
                            )
        except json.JSONDecodeError:
            logger.warning("Failed to decode a line from the response stream.")
            continue
    raise HTTPException(status_code=500, detail="No valid output found in the stream.")