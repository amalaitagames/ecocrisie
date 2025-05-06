import {DataUnitEnum} from "@/enitities/enums/DataUnitEnum";
import {TimeUnitEnum} from "@/enitities/enums/TimeUnitEnum";

export interface InfoAndComRequestParams {

    data: number,
    dataUnit: DataUnitEnum,
    time: number,
    timeUnit: TimeUnitEnum

}