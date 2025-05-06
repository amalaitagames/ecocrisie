import {ClimatiqRequestParameters} from "@/enitities/ClimatiqRequestParameters";
import {MoneyUnitEnum} from "@/enitities/enums/MoneyUnitEnum";

export interface GoodAndServicesRequestParams extends ClimatiqRequestParameters {
    money: number,
    moneyUnit : MoneyUnitEnum;
}