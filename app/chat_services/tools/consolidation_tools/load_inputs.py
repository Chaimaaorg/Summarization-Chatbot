# -*- coding: utf-8 -*-
from __future__ import annotations

import logging
from typing import Any, Optional

from langchain.callbacks.manager import AsyncCallbackManagerForToolRun

from app.models.agent_model import AgentAndToolsConfig
from app.models.tool_model import ToolConfig
from app.chat_services.helpers.llm import get_llm
from app.chat_services.tools.ExtendedBaseTool import ExtendedBaseTool
from app.chat_services.tools.utils.retrieve_eden_data import  restructure_for_output


logger = logging.getLogger(__name__)


class LoadInputsTool(ExtendedBaseTool):
    """Load Inputs Tool."""

    name = "load_inputs_tool"
    appendix_title = "Load inputs Appendix"
    eden_json :  Optional[dict[Any,Any]] = {}

    @classmethod
    def from_config(
        cls,
        config: ToolConfig,
        common_config: AgentAndToolsConfig,
        **kwargs: Any,
    ) -> LoadInputsTool:
        llm = kwargs.get(
            "llm",
            get_llm(common_config.llm),
        )
        fast_llm = kwargs.get(
            "fast_llm",
            get_llm(common_config.fast_llm),
        )
        fast_llm_token_limit = kwargs.get(
            "fast_llm_token_limit",
            common_config.fast_llm_token_limit,
        )
        return cls(
            llm=llm,
            fast_llm=fast_llm,
            fast_llm_token_limit=fast_llm_token_limit,
            description=config.description.format(**{e.name: e.content for e in config.prompt_inputs}),
            prompt_message=config.prompt_message.format(**{e.name: e.content for e in config.prompt_inputs}),
            system_context=config.system_context.format(**{e.name: e.content for e in config.prompt_inputs}),
            eden_json=kwargs.get("eden_json",{}),
        )
    async def _arun(
        self,
        *args: Any,
        run_manager: Optional[AsyncCallbackManagerForToolRun] = None,
        **kwargs: Any,
    ) -> dict[Any, Any]:
        """Use the tool asynchronously."""

        try:
            logger.info(f"Launching {self.name}")

            data = restructure_for_output(self.eden_json)

            return {"output": data}

        except Exception as e:
            if run_manager is not None:
                await run_manager.on_tool_error(
                    e,
                    tool=self.name,
                )
                return {"error": repr(e)}
            raise e
