# -*- coding: utf-8 -*-
from __future__ import annotations

import logging


from app.chat_services.tools.comment_tools.base_comment_generation import BaseCommentGenerationTool

logger = logging.getLogger(__name__)


class StructureFinanciereCommentGeneration(BaseCommentGenerationTool):
    """Structure Financiere Comment Generation Tool."""

    name = "structure_financiere_comment_generation_tool"
    appendix_title = "Structure Financiere Comment Generation Appendix"
    # document_ingestion_pipeline: DocumentIngestionPipeline
