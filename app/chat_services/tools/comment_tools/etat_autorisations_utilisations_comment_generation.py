# -*- coding: utf-8 -*-
from __future__ import annotations

import logging


from app.chat_services.tools.comment_tools.base_comment_generation import BaseCommentGenerationTool

logger = logging.getLogger(__name__)


class EtatAutorisationsUtilisationsCommentGenerationTool(BaseCommentGenerationTool):
    """Etat des autorisations / utilisations Comment Generation Tool."""

    name = "etat_autorisations_utilisations_comment_generation_tool"
    appendix_title = "Etat des autorisations / utilisations Comment Generation Appendix"
    # document_ingestion_pipeline: DocumentIngestionPipeline
