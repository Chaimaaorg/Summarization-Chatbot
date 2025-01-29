# -*- coding: utf-8 -*-
from __future__ import annotations

import logging

from app.chat_services.tools.comment_tools.base_comment_generation import BaseCommentGenerationTool

logger = logging.getLogger(__name__)


class ActifPassifCommentGenerationTool(BaseCommentGenerationTool):
    """Actif/Passif Comment Generation Tool."""

    name = "actif_passif_comment_generation_tool"
    appendix_title = "Actif/Passif Comment Generation Appendix"
    # document_ingestion_pipeline: DocumentIngestionPipeline
