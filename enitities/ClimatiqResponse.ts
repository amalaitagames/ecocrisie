import {WeightUnitEnum} from "@/enitities/enums/WeightUnitEnum";

export interface ClimatiqResponse {

    co2e: number,
    co2eUnit: WeightUnitEnum,
    activityData: {activityValue: number, activityUnit: string}

}