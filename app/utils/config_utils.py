# -*- coding: utf-8 -*-
import logging
import os
from pathlib import Path
from typing import Type

import yaml
from box import Box

logger = logging.getLogger(__name__)


def read_config(
    filename: Path,
    loader: Type[yaml.FullLoader],
) -> Box:
    config = _read_config(
        filename,
        loader=loader,
    )
    return config


def _read_config(
    file_path: Path,
    loader: Type[yaml.FullLoader],
) -> Box:
    """Read any yaml file as a Box object."""

    if file_path.is_file() and os.access(
        file_path,
        os.R_OK,
    ):
        with open(
            file_path,
            "r",
            encoding="utf-8",
        ) as f:
            try:
                config_dict = yaml.load(
                    f,
                    Loader=loader,
                )
            except yaml.YAMLError as exc:
                print(exc)
        return Box(
            config_dict,
            box_dots=True,
        )
    raise FileNotFoundError(file_path)
