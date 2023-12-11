export type TMarcaState = "EDIT" | "CREATE" | "LIST";

export interface IMarca {
  brandId: number;
  name: string;
  description: string;
  contact: string;
}

export interface IMarcaCreate {
  name: string;
  description: string;
  contact: string;
}

export interface IMarcaUpdate {
  brandId: number;
  name: string;
  description: string;
  contact: string;
}
