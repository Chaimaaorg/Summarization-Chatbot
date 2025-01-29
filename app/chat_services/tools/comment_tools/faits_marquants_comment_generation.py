# -*- coding: utf-8 -*-
from __future__ import annotations

import logging


from app.chat_services.tools.comment_tools.base_comment_generation import BaseCommentGenerationTool

logger = logging.getLogger(__name__)


class FaitsMarquantsCommentGenerationTool(BaseCommentGenerationTool):
    """Faits marquants Comment Generation Tool."""

    name = "faits_marquants_comment_generation_tool"
    appendix_title = "Faits marquants Comment Generation Appendix"
    # document_ingestion_pipeline: DocumentIngestionPipeline
