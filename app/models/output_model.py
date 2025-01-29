# -*- coding: utf-8 -*-
from typing import  Optional

import numpy as np
from pydantic import BaseModel

class PresentationSocieteSchema(BaseModel):
    faits_marquants_societe: Optional[str] = None
    caracteristiques_secteur_activite: Optional[str] = None
    principaux_clients: Optional[str] = None
    principaux_fournisseurs: Optional[str] = None
    principaux_concurrents: Optional[str] = None
    description_moyens_exploitation: Optional[str] = None


class OutputSchema(BaseModel):
    presentation_societe: Optional[PresentationSocieteSchema] = None
    analyse_financiere: Optional[str]  = None
    structure_financiere: Optional[str]  = None
    actif_passif_n: Optional[str]  = None
    mouvements_confies_net: Optional[str]  = None
    mouvements_internationaux: Optional[str]  = None
    garanties : Optional[str] = None
    etat_autorisations_utilisations: Optional[str] = None
    objet_demande_des_lignes_sollicitees: Optional[str] = None
    executive_summary: Optional[str] = None
    objet_demande: Optional[str] = None