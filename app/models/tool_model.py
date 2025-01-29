# -*- coding: utf-8 -*-
from typing import Any, List, Literal, Optional, Union

from box import Box
from langchain.schema import AIMessage, HumanMessage
from pydantic.v1 import BaseModel  # TODO: Remove this line when langchain upgrades to pydantic v2

LLMType = Literal[
    "gpt-4",
    "gpt-3.5-turbo",
    "azure-4-32k",
    "azure-3.5",
    # TODO: fix get_num_tokens to allow gpt-4o to work with agentikit
    "gpt-4o",
    "azure-4o",
]


class PromptInput(BaseModel):
    name: str
    content: str


class ToolConfig(BaseModel):
    description: str
    prompt_message: str
    system_context: str
    prompt_inputs: list[PromptInput]


class ToolsLibrary(BaseModel):
    library: dict[
        str,
        ToolConfig,
    ]


class UserSettings(BaseModel):
    data: dict[
        str,
        Any,
    ]
    version: Optional[int] = None


class ToolInputSchema(BaseModel):
    chat_history: List[
        Union[
            HumanMessage,
            AIMessage,
        ]
    ]
    latest_human_message: str

    # Practice configurations
    user_settings: Optional[UserSettings]

    # Tool outputs (intermediate results)
    intermediate_steps: dict[
        str,
        Any,
    ]
