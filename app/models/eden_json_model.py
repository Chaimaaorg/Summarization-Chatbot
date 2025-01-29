# -*- coding: utf-8 -*-
from typing import List, Optional, Union

from pydantic import BaseModel


class PropertyItem(BaseModel):
    Value: Optional[Union[str, int, float]] = None
    SymbolicName: Optional[str] = None


class Societe(BaseModel):
    SOCIETE: Optional[str] = None
    RATING: Optional[str] = None
    AUT: Optional[str] = None
    UTI: Optional[str] = None


class MovCompte(BaseModel):
    MOV_COMPTE: Optional[str] = None
    MOV_SOLDE_ACTUEL: Optional[str] = None
    MOV_SOLDE_N2: Optional[str] = None
    MOV_CRD_N2: Optional[str] = None
    MOV_SOLDE_N1: Optional[str] = None
    MOV_CRD_N1: Optional[str] = None
    MOV_SOLDE_N: Optional[str] = None
    MOV_CRD_N: Optional[str] = None


class IntCompteImp(BaseModel):
    INT_COMPTE: Optional[str] = None
    INT_MOV_IMP_N2: Optional[str] = None
    INT_MOV_IMP_N1: Optional[str] = None
    INT_MOV_IMP_N: Optional[str] = None
    INT_MOV_IMP_VAR: Optional[str] = None


class IntCompteExp(BaseModel):
    INT_COMPTE: Optional[str] = None
    INT_MOV_EXP_N2: Optional[str] = None
    INT_MOV_EXP_N1: Optional[str] = None
    INT_MOV_EXP_N: Optional[str] = None
    INT_MOV_EXP_VAR: Optional[str] = None


class Ligne(BaseModel):
    LIGNE: Optional[str] = None
    LIGNE_ECH: Optional[str] = None
    LIGNE_COND: Optional[str] = None
    LIGNE_REF_ARR: Optional[str] = None
    LIGNE_AUT_NATURE: Optional[str] = None
    LIGNE_AUT: Optional[str] = None
    LIGNE_UTI: Optional[str] = None


class Garantie(BaseModel):
    GARANTIE: Optional[str] = None
    GAR_ETAT: Optional[str] = None
    GAR_MOTIF: Optional[str] = None


class DecaissLigneCT(BaseModel):
    DECAISS_LIGNE_CT: Optional[str] = None
    DECAISS_LIGNE_CT_ARR: Optional[str] = None
    DECAISS_LIGNE_CT_AUT: Optional[str] = None
    DECAISS_LIGNE_CT_COND: Optional[str] = None


class DecaissLigneMLT(BaseModel):
    DECAISS_LIGNE_MLT: Optional[str] = None
    DECAISS_LIGNE_MLT_ARR: Optional[str] = None
    DECAISS_LIGNE_MLT_AUT: Optional[str] = None
    DECAISS_LIGNE_MLT_COND: Optional[str] = None


class SignLigne(BaseModel):
    SIGN_LIGNE: Optional[str] = None
    SIGN_LIGNE_ARR: Optional[str] = None
    SIGN_LIGNE_AUT: Optional[str] = None
    SIGN_LIGNE_COND: Optional[str] = None


class NoteData(BaseModel):
    DATE_CREATION: Optional[str] = None
    DATE_EXTRACTION: Optional[str] = None
    ACTIONNAIRES: Optional[List[str]] = []
    ACTIONNAIRES_PART: Optional[List[str]] = []
    GROUPE: Optional[str] = None
    SECTEUR_ACTIVITE: Optional[str] = None
    ADRESSE: Optional[str] = None
    CAPITALE: Optional[str] = None
    ANNEE_N: Optional[str] = None
    ANNEE_N1: Optional[str] = None
    ANNEE_N2: Optional[str] = None
    ANNEE_RATING: Optional[str] = None
    RATING_SYSTEME: Optional[str] = None
    RATING_AGREE: Optional[str] = None
    EXONERATION_AT_AF: Optional[str] = None
    CONDITIONS_DATE_VALEUR: Optional[str] = None
    AGENCE: Optional[str] = None
    REGION: Optional[str] = None
    TOTAL_AUTORISATION: Optional[str] = None
    TOTAL_UTILISATION: Optional[str] = None
    CHQ_REGULARISE: Optional[str] = None
    CHQ_NREGULARISE: Optional[str] = None
    LCN_REGULARISE: Optional[str] = None
    LCN_NREGULARISE: Optional[str] = None
    NOMBRE_EFFET: Optional[str] = None
    MONTANT_EFFET: Optional[str] = None
    SOCIETES: Optional[List[Societe]] =  []
    SOCIETES_UTI_TOTAL: Optional[str] = None
    SOCIETES_AUT_TOTAL: Optional[str] = None
    CA_N2: Optional[str] = None
    CA_N1: Optional[str] = None
    VARIATION_CA: Optional[str] = None
    BILAN_CA: Optional[str] = None
    VARIATION_CA_N: Optional[str] = None
    FF_CA_N2: Optional[str] = None
    FF_CA_N1: Optional[str] = None
    VARIATION_FF: Optional[str] = None
    BILAN_FF: Optional[str] = None
    VARIATION_FF_N: Optional[str] = None
    RE_N2: Optional[str] = None
    RE_N1: Optional[str] = None
    VARIATION_RE: Optional[str] = None
    BILAN_RE: Optional[str] = None
    VARIATION_RE_N: Optional[str] = None
    RN_N2: Optional[str] = None
    RN_N1: Optional[str] = None
    VARIATION_RN: Optional[str] = None
    BILAN_RN: Optional[str] = None
    VARIATION_RN_N: Optional[str] = None
    CAF_N2: Optional[str] = None
    CAF_N1: Optional[str] = None
    VARIATION_CAF: Optional[str] = None
    BILAN_CAF: Optional[str] = None
    VARIATION_CAF_N: Optional[str] = None
    CAPITAL_N2: Optional[str] = None
    CAPITAL_N1: Optional[str] = None
    VARIATION_CAPITAL: Optional[str] = None
    BILAN_CAPITAL: Optional[str] = None
    VARIATION_CAPITAL_N: Optional[str] = None
    FDR_N2: Optional[str] = None
    FDR_N1: Optional[str] = None
    VARIATION_FDR: Optional[str] = None
    BILAN_FDR: Optional[str] = None
    VARIATION_FDR_N: Optional[str] = None
    BFDR_N2: Optional[str] = None
    BFDR_N1: Optional[str] = None
    VARIATION_BFDR: Optional[str] = None
    BILAN_BFDR: Optional[str] = None
    VARIATION_BFDR_N: Optional[str] = None
    TRS_N2: Optional[str] = None
    TRS_N1: Optional[str] = None
    VARIATION_TRS: Optional[str] = None
    BILAN_TRS: Optional[str] = None
    VARIATION_TRS_N: Optional[str] = None
    FP_N2: Optional[str] = None
    FP_N1: Optional[str] = None
    VARIATION_FP: Optional[str] = None
    BILAN_FP: Optional[str] = None
    VARIATION_FP_N: Optional[str] = None
    ENDET_N2: Optional[str] = None
    ENDET_N1: Optional[str] = None
    VARIATION_ENDET: Optional[str] = None
    BILAN_ENDET: Optional[str] = None
    VARIATION_ENDET_N: Optional[str] = None
    ENDET_MLT_N2: Optional[str] = None
    ENDET_MLT_N1: Optional[str] = None
    VARIATION_ENDET_MLT: Optional[str] = None
    BILAN_ENDET_MLT: Optional[str] = None
    VARIATION_ENDET_MLT_N: Optional[str] = None
    ENDET_CT_N2: Optional[str] = None
    ENDET_CT_N1: Optional[str] = None
    VARIATION_ENDET_CT: Optional[str] = None
    BILAN_ENDET_CT: Optional[str] = None
    VARIATION_ENDET_CT_N: Optional[str] = None
    TOTAL_N2: Optional[str] = None
    TOTAL_N1: Optional[str] = None
    VARIATION_TOTAL: Optional[str] = None
    BILAN_TOTAL: Optional[str] = None
    FPNTB_N2: Optional[str] = None
    FPNTB_N1: Optional[str] = None
    BILAN_FPNTB: Optional[str] = None
    EBTB_N2: Optional[str] = None
    EBTB_N1: Optional[str] = None
    BILAN_EBTB: Optional[str] = None
    DLMTKP_N2: Optional[str] = None
    DLMTKP_N1: Optional[str] = None
    BILAN_DLMTKP: Optional[str] = None
    CCANB_N2: Optional[str] = None
    CCANB_N1: Optional[str] = None
    BILAN_CCANB: Optional[str] = None
    CLIENTSCA_N2: Optional[str] = None
    CLIENTSCA_N1: Optional[str] = None
    BILAN_CLIENTSCA: Optional[str] = None
    FACHATS_N2: Optional[str] = None
    FACHATS_N1: Optional[str] = None
    BILAN_FACHATS: Optional[str] = None
    IMM_NET: Optional[str] = None
    AMORTISSEMENTS: Optional[str] = None
    STOCKS: Optional[str] = None
    TRES_ACTIF: Optional[str] = None
    TOTAL_ACTIF: Optional[str] = None
    FP_NET: Optional[str] = None
    DETTES_BANCAIRES_MLT: Optional[str] = None
    CAP_PERM: Optional[str] = None
    ADTETES_CT: Optional[str] = None
    DETTES_BANCAIRES_CT: Optional[str] = None
    TOTAL_PASSIF: Optional[str] = None
    MOV_COMPTES: Optional[List[MovCompte]] = []
    MOV_TOT_N2: Optional[str] = None
    MOV_TOT_N1: Optional[str] = None
    MOV_TOT_N: Optional[str] = None
    INT_COMPTES_IMP: Optional[List[IntCompteImp]] = []
    INT_COMPTES_EXP: Optional[List[IntCompteExp]] = []
    ANNEE_N2_MVT: Optional[str] = None
    ANNEE_N1_MVT: Optional[str] = None
    ANNEE_N_MVT: Optional[str] = None
    MOV_CA_N2: Optional[str] = None
    MOV_CA_N1: Optional[str] = None
    MOV_CA_N: Optional[str] = None
    LIGNES: Optional[List[Ligne]] =  []
    LIGNES_AUT_TOTAL: Optional[str] = None
    LIGNES_UTI_TOTAL: Optional[str] = None
    DATE_UTI: Optional[str] = None
    DATE_AUT: Optional[str] = None
    GARANTIES: Optional[List[Garantie]] = []
    DECAISS_LIGNES_CT: Optional[List[DecaissLigneCT]] = []
    DECAISS_LIGNES_MLT: Optional[List[DecaissLigneMLT]] = []
    SIGN_LIGNES: Optional[List[SignLigne]] = []
    DECAISS_LIGNES_TOTAL_AUT: Optional[str] = None
    SIGN_LIGNES_TOTAL_AUT: Optional[str] = None
    LIGNES_TOTAL_AUT: Optional[str] = None


class SoldeCompte(BaseModel):
    NOM_COMPTE: Optional[str] = None
    NUMERO_COMPTE: Optional[str] = None
    CUMUL_DEBIT: Optional[str] = None
    CUMUL_CREDIT: Optional[str] = None
    SOLDE_DEBIT: Optional[str] = None
    SOLDE_CREDIT: Optional[str] = None
    DATE: Optional[str] = None
    TOTAL_CUMUL_DEBIT: Optional[str] = None
    TOTAL_CUMUL_CREDIT: Optional[str] = None
    TOTAL_SOLDE_DEBIT: Optional[str] = None
    TOTAL_SOLDE_CREDIT: Optional[str] = None


class InforiskInformation(BaseModel):
    DATE_BUSINESS_REPORT_INFORISK: Optional[str] = None
    ACTIVITE_INFORISK: Optional[str] = None
    SECTEUR_ACTIVITE_INFORISK: Optional[str] = None
    NOM_DIRIGEANTS_INFORISK: Optional[List[str]] = []
    POSTES_DIRIGEANTS_INFORISK: Optional[List[str]] = []
    DATE_PRISE_FONCTION_DIRIGEANTS_INFORISK: Optional[List[str]] = []
    NOM_ASSOCIES_INFORISK: Optional[List[str]] = []
    PARTS_ASSOCIES_INFORISK: Optional[List[str]] = []
    NOM_TIERS_INFORISK: Optional[List[str]] = []


class EdenJsonData(BaseModel):
    TargetObjectStore: Optional[str] = None
    Properties: Optional[List[PropertyItem]] =  []
    NOTE: Optional[NoteData] = None
    CaseType: Optional[str] = None
