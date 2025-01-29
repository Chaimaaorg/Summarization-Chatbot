# -*- coding: utf-8 -*-
from app.models.intermediate_output_schema import IntermediateOutputSchema
from app.models.tool_model import ToolInputSchema


def get_eden_data(tool_input: ToolInputSchema) -> IntermediateOutputSchema:
    eden_data = IntermediateOutputSchema(**tool_input.intermediate_steps["load_inputs_tool"]["output"])
    return eden_data

def get_sector_ratios(tool_input: ToolInputSchema) -> IntermediateOutputSchema:
    sector_ratios = tool_input.intermediate_steps["load_inputs_tool"]["sector_ratios"]
    return sector_ratios
