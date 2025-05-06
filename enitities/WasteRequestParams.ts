import {ClimatiqRequestParameters} from "@/enitities/ClimatiqRequestParameters";
import {WeightUnitEnum} from "@/enitities/enums/WeightUnitEnum";

export interface WasteRequestParams extends ClimatiqRequestParameters {

    weight: number,
    weightUnit: WeightUnitEnum

}