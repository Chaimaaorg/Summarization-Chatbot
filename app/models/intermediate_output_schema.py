# -*- coding: utf-8 -*-
from typing import List, Optional, Union

import numpy as np
from pydantic import BaseModel


class OutputSociete(BaseModel):
    detail_du_groupe: Optional[str] = None
    rating: Optional[str] = None
    total_autorisation: Optional[str] = None
    total_utilisation: Optional[str] = None


class SoldeCompte(BaseModel):
    nom_compte: Optional[str] = None
    numero_compte: Optional[str] = None
    cumul_debit: Optional[str] = None
    cumul_credit: Optional[str] = None
    solde_debit: Optional[str] = None
    solde_credit: Optional[str] = None
    date: Optional[str] = None
    total_cumul_debit: Optional[str] = None
    total_cumul_credit: Optional[str] = None
    total_solde_credit: Optional[str] = None
    total_solde_debit: Optional[str] = None


class IdentificationSocieteSchema(BaseModel):
    forme_juridique: Optional[str] = None
    raison_sociale: Optional[str] = None
    date_creation: Optional[str] = None
    adresse: Optional[str] = None
    capital: Optional[str] = None
    actionnaires: Optional[List[str]] = []
    actionnaires_part: Optional[List[str]] = []
    groupe_appartenance: Optional[str] = None
    secteur_activite: Optional[str] = None
    rating_annee_n: Optional[str] = None
    rating_systeme: Optional[str] = None
    rating_agree: Optional[str] = None
    num_dossier: Optional[str] = None
    id_client: Optional[str] = None
    code_agence: Optional[str] = None
    agence: Optional[str] = None
    region: Optional[str] = None
    total_autorisation: Optional[str] = None
    total_utilisation: Optional[str] = None
    societe_total_autorisation: Optional[str] = None
    societe_total_utilisation: Optional[str] = None
    exoneration_at_af: Optional[str] = None
    conditions_date_valeur: Optional[str] = None
    chq_regularise: Optional[str] = None
    chq_nregularise: Optional[str] = None
    lcn_regularise: Optional[str] = None
    lcn_nregularise: Optional[str] = None
    nombre_effet: Optional[str] = None
    montant_effet: Optional[str] = None
    societes_du_groupe: Optional[List[OutputSociete]] = []

    
class PresentationSocieteSchema(BaseModel):
    date_entree_relation: Optional[str] = None
    faits_marquants_societe: Optional[str] = None
    caracteristiques_secteur_activite: Optional[str] = None
    principaux_clients: Optional[str] = None
    principaux_fournisseurs: Optional[str] = None
    principaux_concurrents: Optional[str] = None
    description_moyens_exploitation: Optional[str] = None


class FinancialItemSchema(BaseModel):
    year_n: Optional[Union[str, float]] = np.nan
    year_n_1: Optional[Union[str, float]] = np.nan
    year_n_2: Optional[Union[str, float]] = np.nan
    variation_n_n_1: Optional[str] = None
    variation_n_1_n_2: Optional[str] = None


class ActiviteRentabiliteSchema(BaseModel):
    chiffres_affaires: FinancialItemSchema
    frais_financiers_ca: FinancialItemSchema
    resultat_exploitation: FinancialItemSchema
    resultat_net: FinancialItemSchema
    caf: FinancialItemSchema
    commentaire: Optional[str]


class StructureFinanciereSchema(BaseModel):
    capital: FinancialItemSchema
    fdr: FinancialItemSchema
    bfdr: FinancialItemSchema
    tresorerie_nette: FinancialItemSchema
    fonds_propres_nets: FinancialItemSchema
    endettement: FinancialItemSchema
    mlt: FinancialItemSchema
    ct: FinancialItemSchema
    total_bilan: FinancialItemSchema
    fpn_tb: FinancialItemSchema
    eb_tb: FinancialItemSchema
    dlmt_kp: FinancialItemSchema
    cca_nb: FinancialItemSchema
    clients_ca: FinancialItemSchema
    fournisseurs_achats: FinancialItemSchema
    endettement_ebe: FinancialItemSchema
    commentaire: Optional[str]


class ActifNSchema(BaseModel):
    immobilisations_nettes: Optional[float] = np.nan
    amortissements: Optional[float] = np.nan
    stocks: Optional[float] = np.nan
    tresorerie_actif: Optional[float] = np.nan
    total_actif: Optional[float] = np.nan


class PassifNSchema(BaseModel):
    fonds_propres_nets: Optional[float] = np.nan
    dettes_bancaires_mlt: Optional[float] = np.nan
    capitaux_permanents: Optional[float] = np.nan
    autres_dettes_ct: Optional[float] = np.nan
    dettes_bancaires_ct: Optional[float] = np.nan
    total_passif: Optional[float] = np.nan


class ActifPassifNSchema(BaseModel):
    actif_n: ActifNSchema
    passif_n: PassifNSchema
    commentaire: Optional[str] = None


class AnalyseFinanciereSchema(BaseModel):
    activite_et_rentabilite: ActiviteRentabiliteSchema
    structure_financiere: StructureFinanciereSchema
    actif_passif_n: ActifPassifNSchema


class LigneMouvementsConfiesNetSchema(BaseModel):
    compte: Optional[str] = None
    solde_actuel: Optional[float] = np.nan
    solde_moyen_year_n: Optional[float] = np.nan
    mouvement_net_credit_year_n: Optional[float] = np.nan
    solde_moyen_year_n_1: Optional[float] = np.nan
    mouvement_net_credit_year_n_1: Optional[float] = np.nan
    solde_moyen_year_n_2: Optional[float] = np.nan
    mouvement_net_credit_year_n_2: Optional[float] = np.nan


class MouvementsConfiesNetSchema(BaseModel):
    lignes: List[LigneMouvementsConfiesNetSchema]
    mouvement_total_year_n: Optional[float] = np.nan
    mouvement_total_year_n_1: Optional[float] = np.nan
    mouvement_total_year_n_2: Optional[float] = np.nan
    pourcentage_ca_mouvement_net_credit_year_n: Optional[str] = ""
    pourcentage_ca_mouvement_net_credit_year_n_1: Optional[str] = ""
    pourcentage_ca_mouvement_net_credit_year_n_2: Optional[str] = ""
    commentaire: Optional[str] = None


class LigneMouvementsInternationauxSchema(BaseModel):
    compte: Optional[str] = None
    mouvement_import_year_n: Optional[float] = np.nan
    mouvement_export_year_n: Optional[float] = np.nan
    mouvement_import_year_n_1: Optional[float] = np.nan
    mouvement_export_year_n_1: Optional[float] = np.nan
    mouvement_import_year_n_2: Optional[float] = np.nan
    mouvement_export_year_n_2: Optional[float] = np.nan
    variation_mouvement_import_n_n_1: Optional[float] = np.nan
    variation_mouvement_export_n_n_1: Optional[float] = np.nan


class MouvementsInternationaux(BaseModel):
    lignes: List[LigneMouvementsInternationauxSchema]
    commentaire: Optional[str] = None


class LigneGarantiesActuellesSchema(BaseModel):
    garantie: Optional[str] = None
    etat: Optional[str] = None
    motif: Optional[str] = None


class EtatRelationGarantiesSchema(BaseModel):
    year_n: Optional[str] = None
    year_n1: Optional[str] = None
    year_n2: Optional[str] = None
    mouvements_confies_net: MouvementsConfiesNetSchema
    mouvements_internationaux: MouvementsInternationaux
    garanties_actuelles: List[LigneGarantiesActuellesSchema]


class LignesAutorisationsUtilisationsSchema(BaseModel):
    ligne: Optional[str] = None
    ref_arr: Optional[str] = None
    aut_nature: Optional[str] = None
    aut: Optional[float] = np.nan
    uti: Optional[float] = np.nan
    depassement: Optional[bool] = False
    condition_appliquee: Optional[float] = np.nan
    echeance: Optional[str] = None


class LignesSolliciteesDemandeSchema(BaseModel):
    ligne: Optional[str] = None
    ref_arr: Optional[str] = None
    autorisations_sollicitees: Optional[float] = np.nan
    conditions_proporesses: Optional[float] = np.nan


class ObjetDemandeCentreLignesSollicitees(BaseModel):
    lignes_ct: List[LignesSolliciteesDemandeSchema]
    lignes_mlt: List[LignesSolliciteesDemandeSchema]
    sign_lignes: List[LignesSolliciteesDemandeSchema]
    decaiss_lignes_tot_aut: Optional[float] = np.nan
    sign_lignes_tot_aut: Optional[float] = np.nan
    lignes_tot_aut: Optional[float] = np.nan
    commentaire: Optional[str] = None


class PropositionSchema(BaseModel):
    date_extraction: Optional[str] = None
    num_proposition: Optional[str] = None
    annee_n: Optional[str] = None
    annee_n_1: Optional[str] = None
    annee_n_2: Optional[str] = None
    market: Optional[str] = None


class EtatAutorisationsUtilisationsSchema(BaseModel):
    lignes_autorisations_utilisations: List[LignesAutorisationsUtilisationsSchema] = []
    total_autorisations: Optional[float] = np.nan
    total_utilisations: Optional[float] = np.nan
    taux_moyen_utilisation: Optional[float] = np.nan
    date_autorisations: Optional[str] = None
    date_utilisations: Optional[str] = None
    commentaire: Optional[str] = None


class IntermediateOutputSchema(BaseModel):
    proposition: Optional[PropositionSchema] = None
    identification_societe: IdentificationSocieteSchema
    presentation_societe: Optional[PresentationSocieteSchema] = None
    analyse_financiere: AnalyseFinanciereSchema
    etat_relation_garanties: Optional[EtatRelationGarantiesSchema] = None
    etat_autorisations_utilisations: Optional[EtatAutorisationsUtilisationsSchema] = None
    objet_demande_lignes_sollicitees: Optional[ObjetDemandeCentreLignesSollicitees] = None
    executive_summary: Optional[str] = None
    objet_demande: Optional[str] = None
    avis_centre_affaires: Optional[str] = None
