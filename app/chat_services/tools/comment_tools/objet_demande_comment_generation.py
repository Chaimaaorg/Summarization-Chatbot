# -*- coding: utf-8 -*-
from __future__ import annotations

import logging


from app.chat_services.tools.comment_tools.base_comment_generation import BaseCommentGenerationTool

logger = logging.getLogger(__name__)


class ObjectDemandeCommentGenerationTool(BaseCommentGenerationTool):
    """Objet de la demande Comment Generation Tool."""

    name = "objet_demande_comment_generation_tool"
    appendix_title = "Objet de la demande Comment Generation Appendix"
    # document_ingestion_pipeline: DocumentIngestionPipeline
