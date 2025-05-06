import {MoneyUnitEnum} from "@/enitities/enums/MoneyUnitEnum";
import {ActivityType} from "@/enitities/ActivityType";

export interface GoodAndServicesRequestParams extends ActivityType {
    money: number,
    moneyUnit : MoneyUnitEnum;
}