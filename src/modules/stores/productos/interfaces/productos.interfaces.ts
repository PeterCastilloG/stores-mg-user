import { IAlmacen } from "../../almacenes/interfaces/almacenes.interfaces";
import { ICategoria } from "../../categorias/interfaces/categorias.interfaces";
import { IMarca } from "../../marcas/interfaces/marcas.interfaces";

export type TProductoState = "EDIT" | "CREATE" | "LIST";

export interface IProducto {
  productId: number;
  name: string;
  medida: string;
  description: string;
  cantidad: number;
  quantity: number;
  brandId: number;
  categoryId: number;
  category: ICategoria;
  brand: IMarca;
  productHistory: Array<IProductHistory>;
}

export interface IProductoCreate {
  name: string;
  medida: string;
  description: string;
  quantity: number;
  brandId: number;
  categoryId: number;
}

export interface IProductoUpdate {
  productId: number;
  name: string;
  medida: string;
  description: string;
  quantity: number;
  brandId: number;
  categoryId: number;
}

export interface IProductHistory {
  productHistoryId: number;
  used: number;
  quantity: number;
  expiryDate: string;
  warehouseId: number;
  warehouse: IAlmacen;
  productId: number;
}

export interface IProductoHistoryCreate {
  used: number;
  quantity: number;
  expiryDate: string;
  warehouseId: number;
  productId: number;
}

export interface IProductoHistoryUpdate {
  productHistoryId: number;
  used: number;
  quantity: number;
  expiryDate: string;
  warehouseId: number;
  productId: number;
}
