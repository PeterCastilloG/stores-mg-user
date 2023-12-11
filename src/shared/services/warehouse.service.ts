import { httpRequest } from "../lib/build-request";
import {
  IAlmacenCreate,
  IAlmacenUpdate,
} from "@/modules/stores/almacenes/interfaces/almacenes.interfaces";

export async function warehousesList() {
  return await httpRequest({
    url: "warehouses",
  });
}

export async function warehousesCreate(data: IAlmacenCreate) {
  return await httpRequest({
    url: "warehouses",
    body: data,
    method: "POST",
  });
}

export async function warehousesUpate(data: IAlmacenUpdate) {
  return await httpRequest({
    url: "warehouses",
    body: data,
    method: "PUT",
  });
}

export async function warehousesDelete(id: number) {
  return await httpRequest({
    url: `warehouses/${id}`,
    method: "DELETE",
  });
}
