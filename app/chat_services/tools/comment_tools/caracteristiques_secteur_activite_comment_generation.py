# -*- coding: utf-8 -*-
from __future__ import annotations

import logging


from app.chat_services.tools.comment_tools.base_comment_generation import BaseCommentGenerationTool

logger = logging.getLogger(__name__)


class CaracteristiquesSecteurActiviteCommentGenerationTool(BaseCommentGenerationTool):
    """Caractéristiques du secteur d'activité Comment Generation Tool."""

    name = "caracteristiques_secteur_activite_comment_generation_tool"
    appendix_title = "Caractéristiques du secteur d'activité"
    # document_ingestion_pipeline: DocumentIngestionPipeline
