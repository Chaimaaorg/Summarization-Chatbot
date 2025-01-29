# -*- coding: utf-8 -*-
from __future__ import annotations

import logging


from app.chat_services.tools.comment_tools.base_comment_generation import BaseCommentGenerationTool

logger = logging.getLogger(__name__)


class PrincipauxClientsCommentGenerationTool(BaseCommentGenerationTool):
    """Principaux Clients Comment Generation Tool."""

    name = "principaux_clients_comment_generation_tool"
    appendix_title = "Principaux Clients Comment Generation Appendix"
    # document_ingestion_pipeline: DocumentIngestionPipeline
