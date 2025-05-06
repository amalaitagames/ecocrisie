import {ClimatiqRequestParameters} from "@/service/enitities/ClimatiqRequestParameters";
import {WeightUnitEnum} from "@/service/enitities/enums/WeightUnitEnum";

export interface WasteRequestParams extends ClimatiqRequestParameters {

    weight: number,
    weightUnit: WeightUnitEnum

}