import {
  IProductoHistoryCreate,
  IProductoHistoryUpdate,
} from "@/modules/stores/productos/interfaces/productos.interfaces";
import { httpRequest } from "../lib/build-request";

export async function productHistoriesCreate(data: IProductoHistoryCreate) {
  return await httpRequest({
    url: "product-history",
    body: data,
    method: "POST",
  });
}

export async function productHistoriesUpate(data: IProductoHistoryUpdate) {
  return await httpRequest({
    url: "product-history",
    body: data,
    method: "PUT",
  });
}

export async function productHistoriesDelete(id: number) {
  return await httpRequest({
    url: `product-history/${id}`,
    method: "DELETE",
  });
}
