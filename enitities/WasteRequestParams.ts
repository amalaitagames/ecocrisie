import {WeightUnitEnum} from "@/enitities/enums/WeightUnitEnum";
import {ActivityType} from "@/enitities/ActivityType";

export interface WasteRequestParams extends ActivityType {

    weight: number,
    weightUnit: WeightUnitEnum

}