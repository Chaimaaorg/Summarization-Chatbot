# -*- coding: utf-8 -*-
from __future__ import annotations

import json
import logging
from typing import Any, Optional

from langchain.callbacks.manager import AsyncCallbackManagerForToolRun, CallbackManagerForToolRun

from app.models.agent_model import AgentAndToolsConfig

from app.models.streaming_schema import StreamingDataTypeEnum
from app.models.tool_model import ToolConfig, ToolInputSchema
from app.chat_services.helpers.llm import get_llm
from app.chat_services.tools.ExtendedBaseTool import ExtendedBaseTool
from app.chat_services.tools.utils.intermediate_tools import get_eden_data
from app.chat_services.tools.utils.consolidate_tool import consolidate_results, process_for_frontend
logger = logging.getLogger(__name__)


class ConsolidationTool(ExtendedBaseTool):
    """Consolidation Tool."""

    name = "consolidation_tool"
    appendix_title = "Consolidation Appendix"

    @classmethod
    def from_config(
        cls,
        config: ToolConfig,
        common_config: AgentAndToolsConfig,
        **kwargs: Any,
    ) -> ConsolidationTool:
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
        )

    def _run(
        self,
        *args: Any,
        run_manager: Optional[CallbackManagerForToolRun] = None,
        **kwargs: Any,
    ) -> str:
        raise NotImplementedError("Tool does not support sync")

    async def _arun(
        self,
        *args: Any,
        run_manager: Optional[AsyncCallbackManagerForToolRun] = None,
        **kwargs: Any,
    ) -> dict | str:
        """Use the tool asynchronously."""
        query = kwargs.get(
            "query",
            args[0],
        )

        try:
            logger.info(f"Launching {self.name}")

            tool_input = ToolInputSchema.parse_raw(query)

            eden_data = get_eden_data(tool_input=tool_input)

            consolidated_results = consolidate_results(tool_input, eden_data)

            processed_for_frontend_results = process_for_frontend(consolidated_results)

            processed_for_frontend_results = json.dumps(processed_for_frontend_results)

            if run_manager is not None:
                await run_manager.on_text(
                    text="output",
                    result=processed_for_frontend_results,
                    data_type=StreamingDataTypeEnum.OUTPUT,
                    tool=self.name,
                    step=1,
                )
                await run_manager.on_text(
                    text="Pipeline finished successfully!",
                    data_type=StreamingDataTypeEnum.ACTION,
                    tool=self.name,
                    step=1,
                )

            return processed_for_frontend_results

        except Exception as e:
            if run_manager is not None:
                await run_manager.on_tool_error(
                    e,
                    tool=self.name,
                )
                return repr(e)
            raise e


