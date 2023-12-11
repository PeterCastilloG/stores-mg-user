export type TAlmacenState = "EDIT" | "CREATE" | "LIST";

export interface IAlmacen {
  warehouseId: number
  name: string;
  description: string;
}

export interface IAlmacenCreate {
  name: string;
  description: string;
}

export interface IAlmacenUpdate {
  warehouseId: number
  name: string;
  description: string;
}
