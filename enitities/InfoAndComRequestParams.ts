import {ClimatiqRequestParameters} from "@/enitities/ClimatiqRequestParameters";
import {DataUnitEnum} from "@/enitities/enums/DataUnitEnum";
import {TimeUnitEnum} from "@/enitities/enums/TimeUnitEnum";

export interface InfoAndComRequestParams extends ClimatiqRequestParameters {

    data: number,
    dataUnit: DataUnitEnum,
    time: number,
    timeUnit: TimeUnitEnum

}