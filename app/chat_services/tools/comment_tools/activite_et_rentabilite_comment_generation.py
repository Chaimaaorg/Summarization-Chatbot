# -*- coding: utf-8 -*-
from __future__ import annotations

import logging


from app.chat_services.tools.comment_tools.base_comment_generation import BaseCommentGenerationTool

logger = logging.getLogger(__name__)


class ActiviteEtRentabiliteCommentGeneration(BaseCommentGenerationTool):
    """Activite Et Rentabilite Comment Generation Tool."""

    name = "activite_et_rentabilite_comment_generation_tool"
    appendix_title = "Activite Et Rentabilite Comment Generation Appendix"
    # document_ingestion_pipeline: DocumentIngestionPipeline
