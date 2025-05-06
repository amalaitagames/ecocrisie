import {DataUnitEnum} from "@/enitities/enums/DataUnitEnum";
import {TimeUnitEnum} from "@/enitities/enums/TimeUnitEnum";
import {ActivityType} from "@/enitities/ActivityType";

export interface InfoAndComRequestParams extends ActivityType {

    data: number,
    dataUnit: DataUnitEnum,
    time: number,
    timeUnit: TimeUnitEnum

}