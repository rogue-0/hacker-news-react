import { Type } from "./ItemType";

export type Comment = {
  by: string;
  id: number;
  kids: number[] | undefined;
  parent: number;
  text: string;
  time: number;
  type: Type;
};
