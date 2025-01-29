# -*- coding: utf-8 -*-
# pylint: disable=cyclic-import
from typing import List,Optional,Any

from langchain.tools import BaseTool

from app.models.agent_model import AgentConfig
from app.models.tool_model import ToolConfig
from app.chat_services.tools.ExtendedBaseTool import ExtendedBaseTool

from app.chat_services.tools.comment_tools.actif_passif_comment_generation import (
    ActifPassifCommentGenerationTool,
)
from app.chat_services.tools.comment_tools.activite_et_rentabilite_comment_generation import (
    ActiviteEtRentabiliteCommentGeneration,
)
from app.chat_services.tools.comment_tools.base_comment_generation import BaseCommentGenerationTool
from app.chat_services.tools.comment_tools.caracteristiques_secteur_activite_comment_generation import (
    CaracteristiquesSecteurActiviteCommentGenerationTool,
)
from app.chat_services.tools.comment_tools.description_moyens_exploitation_comment_generation import (
    DescriptionMoyensExploitationCommentGenerationTool,
)
from app.chat_services.tools.comment_tools.etat_autorisations_utilisations_comment_generation import (
    EtatAutorisationsUtilisationsCommentGenerationTool,
)
from app.chat_services.tools.comment_tools.executive_summary_comment_generation import (
    ExecutiveSummaryCommentGenerationTool,
)
from app.chat_services.tools.comment_tools.faits_marquants_comment_generation import (
    FaitsMarquantsCommentGenerationTool,
)
from app.chat_services.tools.comment_tools.garanties_mouvements_confies_comment_generation import (
    GarantiesMouvementsConfiesCommentGenerationTool,
)
from app.chat_services.tools.comment_tools.garanties_mouvements_international_comment_generation import (
    GarantiesMouvementsInternationalCommentGenerationTool,
)
from app.chat_services.tools.comment_tools.objet_demande_comment_generation import (
    ObjectDemandeCommentGenerationTool,
)
from app.chat_services.tools.comment_tools.principaux_clients_comment_generation import (
    PrincipauxClientsCommentGenerationTool,
)
from app.chat_services.tools.comment_tools.principaux_fournisseurs_comment_generation import (
    PrincipauxFournisseursCommentGenerationTool,
)
from app.chat_services.tools.comment_tools.structure_financiere_comment_generation import (
    StructureFinanciereCommentGeneration,
)
from app.chat_services.tools.consolidation_tools.consolidation import ConsolidationTool
from app.chat_services.tools.consolidation_tools.load_inputs import LoadInputsTool


from app.utils.config_loader import get_agent_config


def get_tools(tools: List[str],eden_json : Optional[dict[Any,Any]]) -> List[BaseTool]:
    """
    Retrieves the tools based on a list of tool names.

    This function takes a list of tool names and returns a list of BaseTool objects.
    It first gets the agent configuration and a list of all available tool classes. It then creates a list of all tools
    specified in the agent configuration. If any tool name in the input list is not in the list of all tools,
    it raises a ValueError.

    Args:
        tools (list[str]): The list of tool names.
        load_nested (bool): Whether to load nested chains too. Included to avoid circular imports

    Returns:
        list[BaseTool]: The list of BaseTool objects.

    Raises:
        ValueError: If any tool name in the input list is not in the list of all tools.
    """
    agent_config = get_agent_config()
    all_tool_classes = [
        ("load_inputs_tool", LoadInputsTool),
        ("base_comment_generation_tool", BaseCommentGenerationTool),
        ("structure_financiere_comment_generation_tool", StructureFinanciereCommentGeneration),
        ("activite_et_rentabilite_comment_generation_tool", ActiviteEtRentabiliteCommentGeneration),
        ("faits_marquants_comment_generation_tool", FaitsMarquantsCommentGenerationTool),
        ("consolidation_tool", ConsolidationTool),
        ("principaux_fournisseurs_comment_generation_tool", PrincipauxFournisseursCommentGenerationTool),
        ("principaux_clients_comment_generation_tool", PrincipauxClientsCommentGenerationTool),
        (
            "caracteristiques_secteur_activite_comment_generation_tool",
            CaracteristiquesSecteurActiviteCommentGenerationTool,
        ),
        ("actif_passif_comment_generation_tool", ActifPassifCommentGenerationTool),
        ("executive_summary_comment_generation_tool", ExecutiveSummaryCommentGenerationTool),
        ("garanties_mouvements_confies_comment_generation_tool", GarantiesMouvementsConfiesCommentGenerationTool),
        (
            "garanties_mouvements_international_comment_generation_tool",
            GarantiesMouvementsInternationalCommentGenerationTool,
        ),
        (
            "objet_demande_comment_generation_tool",
            ObjectDemandeCommentGenerationTool,
        ),
        ("etat_autorisations_utilisations_comment_generation_tool", EtatAutorisationsUtilisationsCommentGenerationTool),
        ("description_moyens_exploitation_comment_generation_tool", DescriptionMoyensExploitationCommentGenerationTool),
    ]
    all_tools: list[ExtendedBaseTool] = [
        c.from_config(
            config=assign_config(agent_config, name),
            common_config=agent_config.common,
            **({"eden_json": eden_json} if name == "load_inputs_tool" else {}),
        )
        for name, c in all_tool_classes
        if name in agent_config.tools
    ]

    tools_map = {tool.name: tool for tool in all_tools}

    if any(tool_name not in tools_map for tool_name in tools):
        raise ValueError(f"Invalid tool name(s): {[tool_name for tool_name in tools if tool_name not in tools_map]}")

    return [tools_map[tool_name] for tool_name in tools]


def assign_config(agent_config: AgentConfig, name: str) -> ToolConfig:
    if name in [
        "activite_et_rentabilite_comment_generation_tool",
        "structure_financiere_comment_generation_tool",
        "faits_marquants_comment_generation_tool",
        "principaux_fournisseurs_comment_generation_tool",
        "caracteristiques_secteur_activite_comment_generation_tool",
        "principaux_clients_comment_generation_tool",
        "actif_passif_comment_generation_tool",
        "executive_summary_comment_generation_tool",
        "garanties_mouvements_confies_comment_generation_tool",
        "garanties_mouvements_international_comment_generation_tool",
        "objet_demande_comment_generation_tool",
        "etat_autorisations_utilisations_comment_generation_tool",
        "description_moyens_exploitation_comment_generation_tool",
    ]:
        return agent_config.tools_library.library["base_comment_generation_tool"]
    return agent_config.tools_library.library[name]
