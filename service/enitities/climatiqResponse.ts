import {WeightUnitEnum} from "@/service/WeightUnitEnum";

export interface ClimatiqResponse {

    co2e: number,
    co2eUnit: WeightUnitEnum,
    activityData: {activityValue: number, activityUnit: string}

}