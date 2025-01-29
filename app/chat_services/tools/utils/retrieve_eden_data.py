# -*- coding: utf-8 -*-
import json
import os
from typing import Union

import numpy as np

from app.models.eden_json_model import EdenJsonData
from app.models.intermediate_output_schema import (
   ActifNSchema,
   ActifPassifNSchema,
   ActiviteRentabiliteSchema,
   AnalyseFinanciereSchema,
   EtatAutorisationsUtilisationsSchema,
   EtatRelationGarantiesSchema,
   FinancialItemSchema,
   IdentificationSocieteSchema,
   LigneGarantiesActuellesSchema,
   LigneMouvementsConfiesNetSchema,
   LigneMouvementsInternationauxSchema,
   LignesAutorisationsUtilisationsSchema,
   LignesSolliciteesDemandeSchema,
   MouvementsConfiesNetSchema,
   MouvementsInternationaux,
   ObjetDemandeCentreLignesSollicitees,
   IntermediateOutputSchema,
   OutputSociete,
   PassifNSchema,
   PresentationSocieteSchema,
   PropositionSchema,
   StructureFinanciereSchema,
)


def convert_to_float(value: Union[str, None]) -> float:
   """Converts a string with a trailing minus sign (e.g., "2 716-") into a float."""
   if value is None or value.strip() == "":
       return np.nan
   value = value.strip().replace(" ", "").replace(",", "")  # Remove spaces and strip any whitespace
   if value.endswith("-"):
       return -(float(value[:-1]))  # Convert to negative float
   return float(value)  # Convert to positive float


def create_percentage_string(value: float) -> str:
   if np.isnan(value):
       return None
   return f"{value:.2f}%"


def create_jours_string(value: float) -> str:
   if np.isnan(value):
       return None
   return f"{value:.0f} jour(s)"


def restructure_for_output(eden_json: dict) -> dict:
   eden_data_parsed = EdenJsonData(**eden_json)

   properties_dict = {prop.SymbolicName: str(prop.Value) for prop in eden_data_parsed.Properties}

   proposition = PropositionSchema(
       num_proposition=properties_dict.get("PME1_BU_IDPROPOSITION"),
       market="",
       date_extraction=eden_data_parsed.NOTE.DATE_EXTRACTION,
       annee_n=eden_data_parsed.NOTE.ANNEE_N,
       annee_n_1=eden_data_parsed.NOTE.ANNEE_N1
       if eden_data_parsed.NOTE.ANNEE_N1 is not None
       else str(int(eden_data_parsed.NOTE.ANNEE_N) - 1),
       annee_n_2=eden_data_parsed.NOTE.ANNEE_N2
       if eden_data_parsed.NOTE.ANNEE_N2 is not None
       else str(int(eden_data_parsed.NOTE.ANNEE_N) - 2),
   )

   societes_du_groupe = [
       OutputSociete(
           detail_du_groupe=soc.SOCIETE, rating=soc.RATING, total_autorisation=soc.AUT, total_utilisation=soc.UTI
       )
       for soc in eden_data_parsed.NOTE.SOCIETES
   ]

   identification_societe = IdentificationSocieteSchema(
       date_creation=properties_dict.get("PME1_BU_DATECREATION"),
       forme_juridique=properties_dict.get("PME1_BU_NATURECLIENT"),  # TODO check this field
       raison_sociale=properties_dict.get("PME1_BU_RAISONSOCIALE"),
       actionnaires=eden_data_parsed.NOTE.ACTIONNAIRES,
       actionnaires_part=eden_data_parsed.NOTE.ACTIONNAIRES_PART,
       groupe_appartenance=eden_data_parsed.NOTE.GROUPE,
       secteur_activite=eden_data_parsed.NOTE.SECTEUR_ACTIVITE,
       adresse=eden_data_parsed.NOTE.ADRESSE,
       capital=eden_data_parsed.NOTE.CAPITALE,
       rating_annee_n=eden_data_parsed.NOTE.ANNEE_RATING,
       rating_systeme=eden_data_parsed.NOTE.RATING_SYSTEME,
       rating_agree=eden_data_parsed.NOTE.RATING_AGREE,
       num_dossier=properties_dict.get("PME1_BU_IDDOSSIER"),
       id_client=properties_dict.get("PME1_BU_IDCLIENT"),
       code_agence=properties_dict.get("PME1_BU_CODEAGENCE"),
       agence=eden_data_parsed.NOTE.AGENCE,
       region=eden_data_parsed.NOTE.REGION,
       total_autorisation=eden_data_parsed.NOTE.TOTAL_AUTORISATION,
       total_utilisation=eden_data_parsed.NOTE.TOTAL_UTILISATION,
       societe_total_autorisation=eden_data_parsed.NOTE.SOCIETES_AUT_TOTAL,
       societe_total_utilisation=eden_data_parsed.NOTE.SOCIETES_UTI_TOTAL,
       exoneration_at_af=eden_data_parsed.NOTE.EXONERATION_AT_AF,
       conditions_date_valeur=eden_data_parsed.NOTE.CONDITIONS_DATE_VALEUR,
       chq_regularise=eden_data_parsed.NOTE.CHQ_REGULARISE,
       chq_nregularise=eden_data_parsed.NOTE.CHQ_NREGULARISE,
       lcn_regularise=eden_data_parsed.NOTE.LCN_REGULARISE,
       lcn_nregularise=eden_data_parsed.NOTE.LCN_NREGULARISE,
       nombre_effet=eden_data_parsed.NOTE.NOMBRE_EFFET,
       montant_effet=eden_data_parsed.NOTE.MONTANT_EFFET,
       societes_du_groupe=societes_du_groupe,
   )

   presentation_societe = PresentationSocieteSchema(
       date_entree_relation=properties_dict.get("PME1_BU_DATEENTREEENRELATION"),
       faits_marquants_societe=None,
       caracteristiques_secteur_activite=None,
       principaux_clients=None,
       principaux_fournisseurs=None,
       description_moyens_exploitation=None,
       principaux_concurrents=None,
   )

   analyse_financiere = AnalyseFinanciereSchema(
       activite_et_rentabilite=ActiviteRentabiliteSchema(
           chiffres_affaires=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_CA),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.CA_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.CA_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_CA_N)),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_CA)),
           ),
           frais_financiers_ca=FinancialItemSchema(
               year_n=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.BILAN_FF)),
               year_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.FF_CA_N1)),
               year_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.FF_CA_N2)),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_FF_N)),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_FF)),
           ),
           resultat_exploitation=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_RE),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.RE_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.RE_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_RE_N)),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_RE)),
           ),
           resultat_net=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_RN),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.RN_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.RN_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_RN_N)),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_RN)),
           ),
           caf=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_CAF),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.CAF_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.CAF_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_CAF_N)),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_CAF)),
           ),
           commentaire=None,
       ),
       structure_financiere=StructureFinanciereSchema(
           capital=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_CAPITAL),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.CAPITAL_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.CAPITAL_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_CAPITAL_N)),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_CAPITAL)),
           ),
           fdr=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_FDR),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.FDR_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.FDR_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_FDR_N)),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_FDR)),
           ),
           bfdr=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_BFDR),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.BFDR_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.BFDR_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_BFDR_N)),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_BFDR)),
           ),
           tresorerie_nette=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_TRS),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.TRS_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.TRS_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_TRS_N)),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_TRS)),
           ),
           fonds_propres_nets=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_FP),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.FP_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.FP_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_FP_N)),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_FP)),
           ),
           endettement=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_ENDET),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.ENDET_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.ENDET_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_ENDET_N)),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_ENDET)),
           ),
           mlt=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_ENDET_MLT),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.ENDET_MLT_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.ENDET_MLT_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_ENDET_MLT_N)),
               variation_n_1_n_2=create_percentage_string(
                   convert_to_float(eden_data_parsed.NOTE.VARIATION_ENDET_MLT)
               ),
           ),
           ct=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_ENDET_CT),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.ENDET_CT_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.ENDET_CT_N2),
               variation_n_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_ENDET_CT_N)),
               variation_n_1_n_2=create_percentage_string(
                   convert_to_float(eden_data_parsed.NOTE.VARIATION_ENDET_CT)
               ),
           ),
           total_bilan=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_TOTAL),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.TOTAL_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.TOTAL_N2),
               variation_n_1_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.VARIATION_TOTAL)),
           ),
           fpn_tb=FinancialItemSchema(
               year_n=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.BILAN_FPNTB)),
               year_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.FPNTB_N1)),
               year_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.FPNTB_N2)),
           ),
           eb_tb=FinancialItemSchema(
               year_n=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.BILAN_EBTB)),
               year_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.EBTB_N1)),
               year_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.EBTB_N2)),
           ),
           dlmt_kp=FinancialItemSchema(
               year_n=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.BILAN_DLMTKP)),
               year_n_1=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.DLMTKP_N1)),
               year_n_2=create_percentage_string(convert_to_float(eden_data_parsed.NOTE.DLMTKP_N2)),
           ),
           cca_nb=FinancialItemSchema(
               year_n=convert_to_float(eden_data_parsed.NOTE.BILAN_CCANB),
               year_n_1=convert_to_float(eden_data_parsed.NOTE.CCANB_N1),
               year_n_2=convert_to_float(eden_data_parsed.NOTE.CCANB_N2),
           ),
           clients_ca=FinancialItemSchema(
               year_n=create_jours_string(convert_to_float(eden_data_parsed.NOTE.BILAN_CLIENTSCA)),
               year_n_1=create_jours_string(convert_to_float(eden_data_parsed.NOTE.CLIENTSCA_N1)),
               year_n_2=create_jours_string(convert_to_float(eden_data_parsed.NOTE.CLIENTSCA_N2)),
           ),
           fournisseurs_achats=FinancialItemSchema(
               year_n=create_jours_string(convert_to_float(eden_data_parsed.NOTE.BILAN_FACHATS)),
               year_n_1=create_jours_string(convert_to_float(eden_data_parsed.NOTE.FACHATS_N1)),
               year_n_2=create_jours_string(convert_to_float(eden_data_parsed.NOTE.FACHATS_N2)),
           ),
           endettement_ebe = FinancialItemSchema(
               year_n = np.nan,
               year_n_1 = np.nan,
               year_n_2 = np.nan,
               variation_n_n_1 = "",
               variation_n_1_n_2 = ""           
           ),            
           commentaire=None,
       ),
       actif_passif_n=ActifPassifNSchema(
           actif_n=ActifNSchema(
               immobilisations_nettes=convert_to_float(eden_data_parsed.NOTE.IMM_NET),
               amortissements=convert_to_float(eden_data_parsed.NOTE.AMORTISSEMENTS),
               stocks=convert_to_float(eden_data_parsed.NOTE.STOCKS),
               tresorerie_actif=convert_to_float(eden_data_parsed.NOTE.TRES_ACTIF),
               total_actif=convert_to_float(eden_data_parsed.NOTE.TOTAL_ACTIF),
           ),
           passif_n=PassifNSchema(
               fonds_propres_nets=convert_to_float(eden_data_parsed.NOTE.FP_NET),
               dettes_bancaires_mlt=convert_to_float(eden_data_parsed.NOTE.DETTES_BANCAIRES_MLT),
               capitaux_permanents=convert_to_float(eden_data_parsed.NOTE.CAP_PERM),
               autres_dettes_ct=convert_to_float(eden_data_parsed.NOTE.ADTETES_CT),
               dettes_bancaires_ct=convert_to_float(eden_data_parsed.NOTE.DETTES_BANCAIRES_CT),
               total_passif=convert_to_float(eden_data_parsed.NOTE.TOTAL_PASSIF),
           ),
           commentaire=None,
       ),
   )

   etat_relation_garanties = EtatRelationGarantiesSchema(
       year_n=eden_data_parsed.NOTE.ANNEE_N_MVT,
       year_n1=eden_data_parsed.NOTE.ANNEE_N1_MVT,
       year_n2=eden_data_parsed.NOTE.ANNEE_N2_MVT,
       mouvements_confies_net=MouvementsConfiesNetSchema(
           lignes=[
               LigneMouvementsConfiesNetSchema(
                   compte=mov.MOV_COMPTE,
                   solde_actuel=convert_to_float(mov.MOV_SOLDE_ACTUEL),
                   solde_moyen_year_n=convert_to_float(mov.MOV_SOLDE_N),
                   mouvement_net_credit_year_n=convert_to_float(mov.MOV_CRD_N),
                   solde_moyen_year_n_1=convert_to_float(mov.MOV_SOLDE_N1),
                   mouvement_net_credit_year_n_1=convert_to_float(mov.MOV_CRD_N1),
                   solde_moyen_year_n_2=convert_to_float(mov.MOV_SOLDE_N2),
                   mouvement_net_credit_year_n_2=convert_to_float(mov.MOV_CRD_N2),
               )
               for mov in eden_data_parsed.NOTE.MOV_COMPTES
           ],
           mouvement_total_year_n=convert_to_float(eden_data_parsed.NOTE.MOV_TOT_N),
           mouvement_total_year_n_1=convert_to_float(eden_data_parsed.NOTE.MOV_TOT_N1),
           mouvement_total_year_n_2=convert_to_float(eden_data_parsed.NOTE.MOV_TOT_N2),
           pourcentage_ca_mouvement_net_credit_year_n=eden_data_parsed.NOTE.MOV_CA_N,
           pourcentage_ca_mouvement_net_credit_year_n_1=eden_data_parsed.NOTE.MOV_CA_N1,
           pourcentage_ca_mouvement_net_credit_year_n_2=eden_data_parsed.NOTE.MOV_CA_N2,
           commentaire=None,
       ),
       mouvements_internationaux=MouvementsInternationaux(
           lignes=[
               LigneMouvementsInternationauxSchema(
                   compte=imp.INT_COMPTE,
                   mouvement_import_year_n=convert_to_float(imp.INT_MOV_IMP_N),
                   mouvement_export_year_n=convert_to_float(exp.INT_MOV_EXP_N),
                   mouvement_import_year_n_1=convert_to_float(imp.INT_MOV_IMP_N1),
                   mouvement_export_year_n_1=convert_to_float(exp.INT_MOV_EXP_N1),
                   mouvement_import_year_n_2=convert_to_float(imp.INT_MOV_IMP_N2),
                   mouvement_export_year_n_2=convert_to_float(exp.INT_MOV_EXP_N2),
                   variation_mouvement_import_n_n_1=convert_to_float(imp.INT_MOV_IMP_VAR),
                   variation_mouvement_export_n_n_1=convert_to_float(exp.INT_MOV_EXP_VAR),
               )
               for imp, exp in zip(eden_data_parsed.NOTE.INT_COMPTES_IMP, eden_data_parsed.NOTE.INT_COMPTES_EXP)
           ],
           commentaire=None,
       ),
       garanties_actuelles=[
           LigneGarantiesActuellesSchema(garantie=garantie.GARANTIE, etat=garantie.GAR_ETAT, motif=garantie.GAR_MOTIF)
           for garantie in eden_data_parsed.NOTE.GARANTIES
       ],
   )

   total_utilisation = convert_to_float(eden_data_parsed.NOTE.LIGNES_UTI_TOTAL)
   total_autorisation = convert_to_float(eden_data_parsed.NOTE.LIGNES_AUT_TOTAL)
   if total_utilisation is not None and total_autorisation is not None and total_autorisation != 0:
       taux_moyen_utilisation = total_utilisation / total_autorisation
   else:
       taux_moyen_utilisation = np.nan

   etat_autorisations_utilisations = EtatAutorisationsUtilisationsSchema(
       lignes_autorisations_utilisations=[
           LignesAutorisationsUtilisationsSchema(
               ligne=ligne.LIGNE,
               ref_arr=ligne.LIGNE_REF_ARR,
               aut_nature=ligne.LIGNE_AUT_NATURE,
               aut=convert_to_float(ligne.LIGNE_AUT),
               uti=convert_to_float(ligne.LIGNE_UTI),
               depassement=convert_to_float(ligne.LIGNE_UTI) > convert_to_float(ligne.LIGNE_AUT),
               condition_appliquee=convert_to_float(ligne.LIGNE_COND) if ligne.LIGNE_COND.strip() else np.nan,
               echeance=ligne.LIGNE_ECH,
           )
           for ligne in eden_data_parsed.NOTE.LIGNES
       ],
       total_autorisations=total_autorisation,
       total_utilisations=total_utilisation,
       taux_moyen_utilisation=taux_moyen_utilisation,
       date_autorisations=eden_data_parsed.NOTE.DATE_AUT,
       date_utilisations=eden_data_parsed.NOTE.DATE_UTI,
       commentaire=None,
   )

   objet_demande_lignes_sollicitees = ObjetDemandeCentreLignesSollicitees(
       lignes_ct=[
           LignesSolliciteesDemandeSchema(
               ligne=ligne.DECAISS_LIGNE_CT,
               ref_arr=ligne.DECAISS_LIGNE_CT_ARR,
               autorisations_sollicitees=convert_to_float(ligne.DECAISS_LIGNE_CT_AUT),
               conditions_proporesses=convert_to_float(ligne.DECAISS_LIGNE_CT_COND)
               if ligne.DECAISS_LIGNE_CT_COND.strip()
               else np.nan,
           )
           for ligne in eden_data_parsed.NOTE.DECAISS_LIGNES_CT
       ],
       lignes_mlt=[
           LignesSolliciteesDemandeSchema(
               ligne=ligne.DECAISS_LIGNE_MLT,
               ref_arr=ligne.DECAISS_LIGNE_MLT_ARR,
               autorisations_sollicitees=convert_to_float(ligne.DECAISS_LIGNE_MLT_AUT),
               conditions_proporesses=convert_to_float(ligne.DECAISS_LIGNE_MLT_COND)
               if ligne.DECAISS_LIGNE_MLT_COND.strip()
               else np.nan,
           )
           for ligne in eden_data_parsed.NOTE.DECAISS_LIGNES_MLT
       ],
       sign_lignes=[
           LignesSolliciteesDemandeSchema(
               ligne=ligne.SIGN_LIGNE,
               ref_arr=ligne.SIGN_LIGNE_ARR,
               autorisations_sollicitees=convert_to_float(ligne.SIGN_LIGNE_AUT),
               conditions_proporesses=convert_to_float(ligne.SIGN_LIGNE_COND)
               if ligne.SIGN_LIGNE_COND.strip()
               else np.nan,
           )
           for ligne in eden_data_parsed.NOTE.SIGN_LIGNES
       ],
       decaiss_lignes_tot_aut=convert_to_float(eden_data_parsed.NOTE.DECAISS_LIGNES_TOTAL_AUT),
       sign_lignes_tot_aut=convert_to_float(eden_data_parsed.NOTE.SIGN_LIGNES_TOTAL_AUT),
       lignes_tot_aut=convert_to_float(eden_data_parsed.NOTE.LIGNES_TOTAL_AUT),
       commentaire=None,
   )

   output_data = IntermediateOutputSchema(
       proposition=proposition,
       identification_societe=identification_societe,
       presentation_societe=presentation_societe,
       analyse_financiere=analyse_financiere,
       etat_relation_garanties=etat_relation_garanties,
       etat_autorisations_utilisations=etat_autorisations_utilisations,
       objet_demande_lignes_sollicitees=objet_demande_lignes_sollicitees,
       # objet_demande=eden_data_parsed.ADDITIONAL_FIELDS.DEMANDE_CREDIT,
       objet_demande = "",
       avis_centre_affaires=None,
       executive_summary=None,
   )

   # Return the structured data as a dictionary
   return output_data.dict()


