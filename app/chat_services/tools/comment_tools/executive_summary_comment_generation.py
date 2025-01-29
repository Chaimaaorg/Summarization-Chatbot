# -*- coding: utf-8 -*-
from __future__ import annotations

import logging


from app.chat_services.tools.comment_tools.base_comment_generation import BaseCommentGenerationTool

logger = logging.getLogger(__name__)


class ExecutiveSummaryCommentGenerationTool(BaseCommentGenerationTool):
    """Executive Summaru Comment Generation Tool."""

    name = "executive_summary_comment_generation_tool"
    appendix_title = "Executive Summary Comment Generation Appendix"
    # document_ingestion_pipeline: DocumentIngestionPipeline
