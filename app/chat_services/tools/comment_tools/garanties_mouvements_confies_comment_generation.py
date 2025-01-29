# -*- coding: utf-8 -*-
from __future__ import annotations

import logging


from app.chat_services.tools.comment_tools.base_comment_generation import BaseCommentGenerationTool

logger = logging.getLogger(__name__)


class GarantiesMouvementsConfiesCommentGenerationTool(BaseCommentGenerationTool):
    """Garanties/Mouvements Confies Comment Generation Tool."""

    name = "garanties_mouvements_confies_comment_generation_tool"
    appendix_title = "Garanties/Mouvements Confies Comment Generation Appendix"
    # document_ingestion_pipeline: DocumentIngestionPipeline
