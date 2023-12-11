import { ITienda } from "../../tiendas/interfaces/tiendas.interfaces";

export type TMarcaState = "EDIT" | "CREATE" | "LIST";

export interface ICliente {
  customerId: number;
  name: string;
  email: string;
  password: string;
  storeId: number;
  store: ITienda
}

export interface IClienteCreate {
  name: string;
  email: string;
  password: string;
  storeId: number;
}

export interface IClienteUpdate {
  customerId: number;
  name: string;
  email: string;
  password: string;
  storeId: number;
}
