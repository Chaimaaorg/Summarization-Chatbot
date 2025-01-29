from app.models.intermediate_output_schema import IntermediateOutputSchema
from app.models.output_model import OutputSchema
from app.models.tool_model import ToolInputSchema
from typing import Any
import numpy as np
import re

# Dictionnary garanties per category
GARANTIES_DICT = {
    "Total HYP (01/03/08/21/22/23/24)": ['HYP01', 'HYP03', 'HYP08', 'HYP21', 'HYP22', 'HYP23', 'HYP24'],
    "Total CAU (03/04/05)": ['CAU03', 'CAU04', 'CAU05'],
    "Total NAN (17/18)": ['NAN17', 'NAN18']
}


def consolidate_results(tool_input: ToolInputSchema, output: IntermediateOutputSchema) -> OutputSchema:
    """Consolide les résultats issus des étapes intermédiaires et les formate."""
    final_output = output.dict()
    final_output["etat_relation_garanties"]["garanties"] = {}

    # Mapping of intermediate steps commentaires des étapes intermédiaires
    intermediate_mappings = {
        "activite_et_rentabilite_comment_generation_tool": ("analyse_financiere", None),
        "structure_financiere_comment_generation_tool": ("structure_financiere", None),
        "faits_marquants_comment_generation_tool": ("presentation_societe", "faits_marquants_societe"),
        "caracteristiques_secteur_activite_comment_generation_tool": ("presentation_societe", "caracteristiques_secteur_activite"),
        "principaux_fournisseurs_comment_generation_tool": ("presentation_societe", "principaux_fournisseurs"),
        "principaux_clients_comment_generation_tool": ("presentation_societe", "principaux_clients"),
        "actif_passif_comment_generation_tool": ("actif_passif_n", None),
        "executive_summary_comment_generation_tool": ("executive_summary", None),
        "garanties_mouvements_confies_comment_generation_tool": ("mouvements_confies_net", None),
        "garanties_mouvements_international_comment_generation_tool": ("mouvements_internationaux", None),
        "etat_autorisations_utilisations_comment_generation_tool": ("etat_autorisations_utilisations", None),
        "description_moyens_exploitation_comment_generation_tool": ("presentation_societe", "description_moyens_exploitation"),
        "objet_demande_comment_generation_tool": ("objet_demande", None)
    }

    # Itération et remplissage des données
    for tool_key, (parent_key, sub_key) in intermediate_mappings.items():
        if tool_key in tool_input.intermediate_steps:
            comment = tool_input.intermediate_steps[tool_key]
            if sub_key:
                if final_output[parent_key]:
                    final_output[parent_key][sub_key]= comment
            else:
                final_output[parent_key] = comment

    # Gestion des commentaires consolidés
    if final_output.get("objet_demande_lignes_sollicitees", {}).get("commentaire"):
        final_output["objet_demande_des_lignes_sollicitees"] = final_output["objet_demande_lignes_sollicitees"]["commentaire"]

    final_output["garanties"] = calculer_totaux(final_output["etat_relation_garanties"]["garanties_actuelles"], GARANTIES_DICT)
    return OutputSchema(**final_output)


def extraire_montant(garantie: str) -> float:
    """Extrait le montant associé à une garantie."""
    match = re.search(
        r"(A HAUTEUR DE|AHAUTEUR DE|A HTDE|A HT|HT.DE|A HT DE|MONTANT DE|AHT DE|A HAUTEURDE|A HAUTEUR|A HT\.DE DH|A H/T DE|A HTDE DH|HAUTEUR DE|HTDE|HT|HT.DE|HT DE|MONTANT DE|AHT DE|HAUTEURDE|HAUTEUR|HT\.DE DH|H/T DE|HTDE DH)\s?(\d+[.,]?\d*)\s?(DHS|DH)?", 
        garantie, 
        re.IGNORECASE
    )
    if match:
        montant = match.group(2).replace(",", ".")  # Gère les séparateurs décimaux
        return float(montant)
    return 0


def calculer_totaux(
    garanties: list, categories: dict
) -> str:
    """Calculate total of garanties per category"""
    totaux = {cat: 0 for cat in categories}
    commentaires = []

    for garantie in garanties:
        libelle = garantie["garantie"]
        montant = extraire_montant(libelle)

        for categorie, codes in categories.items():
            if any(code in libelle for code in codes):
                totaux[categorie] += montant

    for categorie, total in totaux.items():
        commentaires.append(f"• {categorie} : {total:,.2f} DHS")
    return "\n".join(commentaires)


def process_for_frontend(consolidated_results: dict) -> dict:
    """
    Process consolidated results for frontend:

    - Replace all np.nan values with None
    - Round all float values to 2 decimal places
    """

    def process_value(value: Any) -> Any:
        if value is None or (isinstance(value, float) and np.isnan(value)):
            return ""
        elif isinstance(value, float):
            if value > 1:
                return f"{round(value):,.0f}".replace(",", " ")
            else:
                return f"{value:,.2f}".replace(",", " ")
        elif isinstance(value, list):
            return [process_value(v) for v in value]
        elif isinstance(value, dict):
            return {k: process_value(v) for k, v in value.items()}
        elif hasattr(value, "dict"):
            return process_value(value.dict())
        else:
            return value

    return process_value(consolidated_results)
