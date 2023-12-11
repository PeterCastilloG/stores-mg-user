export type TTiendaState = "EDIT" | "CREATE" | "LIST";

export interface ITienda {
  storeId: number;
  name: string;
  contact: string;
  description: string;
}

export interface ITiendaCreate {
  name: string;
  contact: string;
  description: string;
}

export interface ITiendaUpdate {
  storeId: number
  name: string;
  contact: string;
  description: string;
}
