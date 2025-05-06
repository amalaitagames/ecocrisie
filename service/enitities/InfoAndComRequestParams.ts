import {ClimatiqRequestParameters} from "@/service/ClimatiqRequestParameters";
import {WeightUnitEnum} from "@/service/WeightUnitEnum";
import {TimeUnitEnum} from "@/service/TimeUnitEnum";

export interface InfoAndComRequestParams extends ClimatiqRequestParameters {

    data: number,
    dataUnit: WeightUnitEnum,
    time: number,
    timeUnit: TimeUnitEnum

}