# -*- coding: utf-8 -*-
from typing import Optional

from pydantic import BaseModel


class CommentGenerationToolConfig(BaseModel):
    table_name: Optional[str] = None
    sub_table_name: Optional[str] = None
    intermediate_tool_name: Optional[str] = None
    analysis_name: Optional[str] = None
    questions: str
    structure_output: str
    garanties_years: Optional[bool] = False
    use_sector_data: Optional[bool] = False


class CommentGenerationToolsConfig(BaseModel):
    activite_et_rentabilite_comment_generation_tool: CommentGenerationToolConfig
    structure_financiere_comment_generation_tool: CommentGenerationToolConfig
    faits_marquants_comment_generation_tool: CommentGenerationToolConfig
    principaux_fournisseurs_comment_generation_tool: CommentGenerationToolConfig
    caracteristiques_secteur_activite_comment_generation_tool: CommentGenerationToolConfig
    principaux_clients_comment_generation_tool: CommentGenerationToolConfig
    description_moyens_exploitation_comment_generation_tool: CommentGenerationToolConfig
    actif_passif_comment_generation_tool: CommentGenerationToolConfig
    executive_summary_comment_generation_tool: CommentGenerationToolConfig
    garanties_mouvements_confies_comment_generation_tool: CommentGenerationToolConfig
    garanties_mouvements_international_comment_generation_tool: CommentGenerationToolConfig
    etat_autorisations_utilisations_comment_generation_tool: CommentGenerationToolConfig
    objet_demande_comment_generation_tool: CommentGenerationToolConfig


class NoteFieldsConfig(BaseModel):
    comment_generation_tools: CommentGenerationToolsConfig
