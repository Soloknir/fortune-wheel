import { PrizesIds } from "./enums";

export interface IPrize {
  item: PrizesIds;
  qty: number;
}

export interface IPosition {
  x: number,
  y: number
}