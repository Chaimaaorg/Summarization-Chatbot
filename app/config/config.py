# -*- coding: utf-8 -*-
# pylint: disable=no-member
import os
import secrets
from typing import Any, Optional, Union
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application yaml configuration.

    Attributes:
        USE_AZURE (bool): Determines whether Azure chat_services are used.
        API_VERSION (str): API version string.
        API_V1_STR (str): Full API version URL path.
        PROJECT_NAME (Optional[str]): Project's display name.
        PROJECT_DESCRIPTION (Optional[str]) : Project's description
        ENABLE_LLM_CACHE (bool): Toggle for enabling cache for LLMs.
        OPENAI_API_KEY (Optional[str]): API key for OpenAI.
        AZURE_OPENAI_ENDPOINT (Optional[str]): Azure-specific OpenAI endpoint.
        AZURE_OPENAI_API_KEY (Optional[str]): Azure-specific API key for OpenAI.
        OPENAI_ORGANIZATION (Optional[str]): OpenAI organization identifier.
        OPENAI_API_BASE (Optional[str]): Base URL for OpenAI API.
        USE_PROXY (bool): Toggle for proxy usage.
        HTTP_PROXY (Optional[str]): Proxy address.
        REDIS_HOST (str): Hostname for Redis service.
        REDIS_PORT (int): Port number for Redis service.
        ENABLE_AUTH (bool): Determines whether authentication is enabled.
        NEXTAUTH_SECRET (Optional[str]): Secret key for NextAuth.
        SECRET_KEY (str): Application's secret key for signing purposes.
        BACKEND_CORS_ORIGINS (list[str] | list[AnyHttpUrl]): Allowed origins for CORS.
        AGENT_CONFIG_PATH (str): Path to agent configuration file.
        NOTE_FIELDS_CONFIG_PATH (str): Path to note fields configuration file.
    """

    USE_AZURE: bool = False
    API_VERSION: str = "v1"
    API_V1_STR: str = f"/api/{API_VERSION}"
    PROJECT_NAME: Optional[str] = None
    PROJECT_DESCRIPTION : Optional[str] = None
    ENABLE_LLM_CACHE: bool = False

    OPENAI_API_KEY: Optional[str] = None
    AZURE_OPENAI_ENDPOINT: Optional[str] = None
    AZURE_OPENAI_API_KEY: Optional[str] = None
    OPENAI_ORGANIZATION: Optional[str] = None
    OPENAI_API_BASE: Optional[str] = None

    USE_PROXY: bool = False
    HTTP_PROXY: Optional[str] = None

    REDIS_HOST: str = ""
    REDIS_PORT: int = 0

    ENABLE_AUTH: bool = False
    NEXTAUTH_SECRET: Optional[str] = None

    SECRET_KEY: str = secrets.token_urlsafe(32)

    BACKEND_CORS_ORIGINS: Union[list[str], list[AnyHttpUrl]] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, value: Union[str, list[str]]) -> list[str]:
        """Assemble CORS origins from a string or list.

        Args:
            value (Union[str, list[str]]): The CORS origins value.

        Returns:
            list[str]: Processed CORS origins list.
        """
        if isinstance(value, str) and not value.startswith("["):
            return [origin.strip() for origin in value.split(",")]
        if isinstance(value, list):
            return value
        raise ValueError(f"Invalid CORS origins format: {value}")

    AGENT_CONFIG_PATH: str = ""
    NOTE_FIELDS_CONFIG_PATH: str = ""

    class Config:
        """Pydantic configuration for the yaml."""
        case_sensitive = True
        env_file = (
            "./.env"
            if os.path.isfile("./.env")
            else os.path.expanduser("~/.env")
        )


settings = Settings()
yaml_configs: dict[str, Any] = {}
