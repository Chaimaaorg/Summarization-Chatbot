# -*- coding: utf-8 -*-
import logging
from pathlib import Path
from typing import Any

from app.config.config import settings, yaml_configs
from app.models.agent_model import ActionPlan, ActionPlans, AgentAndToolsConfig, AgentConfig
from app.models.note_fields_model import CommentGenerationToolsConfig, NoteFieldsConfig
from app.models.tool_model import PromptInput, ToolConfig, ToolsLibrary
from app.utils.config import Config

logger = logging.getLogger(__name__)


def get_tool_config(
    tool_name: str,
    config_values: dict[
        str,
        Any,
    ],
) -> ToolConfig:
    """Get a tool config from a tool name and config values."""
    config_values["prompt_inputs"] = [PromptInput(**item) for item in config_values.get("prompt_inputs", [])]
    return ToolConfig(**config_values)


def load_note_fields_configs() -> NoteFieldsConfig:
    logger.info("Loading note fields config from yaml file...")
    note_fields_config = Config(Path(settings.NOTE_FIELDS_CONFIG_PATH)).read()
    return NoteFieldsConfig(**note_fields_config)


def get_note_fields_configs(tool_type: str) -> CommentGenerationToolsConfig:
    # Add tool name to get the right config
    note_fields_config = yaml_configs.get("note_fields_config", None)
    if note_fields_config is None:
        note_fields_config = load_note_fields_configs()
        yaml_configs["note_fields_config"] = note_fields_config

    try:
        config_value = getattr(note_fields_config, tool_type)
    except AttributeError:
        raise ValueError(f"No configuration found for tool_type '{tool_type}'")

    if not isinstance(config_value, CommentGenerationToolsConfig):
        raise TypeError(f"Expected CommentGenerationToolsConfig, but got {type(config_value).__name__}")

    return config_value

def load_agent_config() -> AgentConfig:
    """Get the agent config."""
    logger.info("Loading agent config from yaml file...")
    agent_config = Config(Path(settings.AGENT_CONFIG_PATH)).read()
    agent_config.action_plans = ActionPlans(
        action_plans={k: ActionPlan(**v) for k, v in agent_config.action_plans.items()}
    )
    agent_config.tools_library = ToolsLibrary(
        library={
            k: get_tool_config(
                k,
                v,
            )
            for k, v in agent_config.tools_library.library.items()
        }
    )
    agent_config.common = AgentAndToolsConfig(**agent_config.common)
    return AgentConfig(**agent_config)


def get_agent_config() -> AgentConfig:
    agent_config = yaml_configs.get("agent_config", None)
    if agent_config is None:
        agent_config = load_agent_config()
        yaml_configs["agent_config"] = agent_config
    return agent_config
