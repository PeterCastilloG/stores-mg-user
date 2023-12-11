export type TCategoriaState = "EDIT" | "CREATE" | "LIST";

export interface ICategoria {
  categoryId: number
  name: string;
  description: string;
}

export interface ICategoriaCreate {
  name: string;
  description: string;
}

export interface ICategoriaUpdate {
  categoryId: number
  name: string;
  description: string;
}
