# -*- coding: utf-8 -*-
from typing import Callable, List, Optional,Any

from langchain.agents import AgentExecutor
from langchain.base_language import BaseLanguageModel
from langchain.memory import ChatMessageHistory, ConversationTokenBufferMemory
from langchain.schema import AIMessage, HumanMessage

from app.config.config import settings
from app.models.agent_model import AgentConfig
from app.models.tool_model import LLMType
from app.chat_services.helpers.llm import get_llm
from app.chat_services.router_agent.SimpleRouterAgent import SimpleRouterAgent
from app.config.tools import get_tools
from app.utils.config_loader import get_agent_config


def get_conv_token_buffer_memory(
    chat_messages: List[AIMessage | HumanMessage],
    api_key: str,
) -> ConversationTokenBufferMemory:
    """
    Get a ConversationTokenBufferMemory from a list of chat messages.

    This function takes a list of chat messages and returns a ConversationTokenBufferMemory object.
    It first gets the agent configuration and the language model, and then creates a ConversationTokenBufferMemory
    object. It then iterates over the chat messages, saving the context of the conversation to the memory.

    Args:
        chat_messages (List[Union[AIMessage, HumanMessage]]): The list of chat messages.
        api_key (str): The API key.

    Returns:
        ConversationTokenBufferMemory: The ConversationTokenBufferMemory object.
    """
    agent_config = get_agent_config()
    llm = get_llm(
        agent_config.common.llm,
        api_key=api_key,
    )
    chat_history = ChatMessageHistory()
    memory = ConversationTokenBufferMemory(
        memory_key="chat_history",
        return_messages=True,
        max_token_limit=agent_config.common.max_token_length,
        llm=llm,
        chat_memory=chat_history,
    )

    i = 0
    while i < len(chat_messages):
        if isinstance(
            chat_messages[i],
            HumanMessage,
        ):
            if isinstance(
                chat_messages[i + 1],
                AIMessage,
            ):
                memory.save_context(
                    inputs={"input": chat_messages[i].content},
                    outputs={"output": chat_messages[i + 1].content},
                )
                i += 1
        else:
            memory.save_context(
                inputs={"input": chat_messages[i].content},
                outputs={"output": ""},
            )
        i += 1

    return memory


def create_meta_agent(
    agent_config: AgentConfig,
    eden_json : Optional[dict[Any,Any]],
    get_llm_hook: Callable[[LLMType, Optional[str]], BaseLanguageModel] = get_llm,
) -> AgentExecutor:
    """
    Create a meta agent from a config.

    This function takes an AgentConfig object and creates a MetaAgent.
    It retrieves the language models and the list tools, with which a SimpleRouterAgent is created.
    Then, it returns an AgentExecutor.

    Args:
        agent_config (AgentConfig): The AgentConfig object.

    Returns:
        AgentExecutor: The AgentExecutor object.
    """
    api_key = agent_config.api_key
    if api_key is None or api_key == "":
        api_key = settings.OPENAI_API_KEY

    llm = get_llm_hook(
        agent_config.common.llm,
        api_key,
    )
    tools = get_tools(tools=agent_config.tools,eden_json=eden_json)
    simple_router_agent = SimpleRouterAgent.from_llm_and_tools(
        tools=tools,
        llm=llm,
        prompt_message=agent_config.prompt_message,
        system_context=agent_config.system_context,
        action_plans=agent_config.action_plans,
    )
    return AgentExecutor.from_agent_and_tools(
        agent=simple_router_agent,
        tools=tools,
        verbose=True,
        max_iterations=15,
        max_execution_time=300,
        early_stopping_method="generate",
        handle_parsing_errors=True,
    )
