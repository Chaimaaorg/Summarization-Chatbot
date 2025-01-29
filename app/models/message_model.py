# -*- coding: utf-8 -*-
from datetime import datetime
from enum import Enum
from typing import Any, Dict, Optional, Union
from uuid import UUID

from langchain.schema import AIMessage, HumanMessage, SystemMessage
from pydantic import BaseModel, Field, StrictBool, StrictFloat, StrictInt

from app.models.common_model import QueryBase

LangchainMessage = Union[
    AIMessage,
    HumanMessage,
    SystemMessage,
]


class ICreatorRole(
    str,
    Enum,
):
    SYSTEM = "system"
    USER = "user"
    AGENT = "agent"


class IChatMessage(QueryBase):
    role: ICreatorRole
    content: str

    def to_langchain(
        self,
    ) -> LangchainMessage | None:
        match self.role:
            case ICreatorRole.SYSTEM:
                return SystemMessage(content=self.content)
            case ICreatorRole.USER:
                return HumanMessage(content=self.content)
            case ICreatorRole.AGENT:
                return AIMessage(content=self.content)
            case _:
                return None


class UserSettings(BaseModel):
    data: dict[
        str,
        Any,
    ]
    version: Optional[int] = None


class IChatQuery(QueryBase):
    messages: list[IChatMessage]
    api_key: Optional[str] = None
    conversation_id: UUID
    new_message_id: UUID
    user_email: str
    settings: Optional[UserSettings] = None

