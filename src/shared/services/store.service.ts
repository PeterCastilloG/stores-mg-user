import { ITiendaCreate, ITiendaUpdate } from "@/modules/stores/tiendas/interfaces/tiendas.interfaces";
import { httpRequest } from "../lib/build-request";

export async function storesList() {
  return await httpRequest({
    url: "stores",
  });
}


export async function storesCreate(data: ITiendaCreate){
  return await httpRequest({
    url: "stores",
    body: data,
    method: 'POST'
  })
}

export async function storesUpate(data: ITiendaUpdate){
  return await httpRequest({
    url: "stores",
    body: data,
    method: 'PUT'
  })
}

export async function storesDelete(id: number) {
  return await httpRequest({
    url: `stores/${id}`,
    method: "DELETE",
  });
}