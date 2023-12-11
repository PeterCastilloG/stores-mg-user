import { IClienteCreate, IClienteUpdate } from "@/modules/stores/clientes/interfaces/cliente.interfaces";
import { httpRequest } from "../lib/build-request";

export async function customersList() {
  return await httpRequest({
    url: "customers",
  });
}


export async function customersCreate(data: IClienteCreate){
  return await httpRequest({
    url: "customers",
    body: data,
    method: 'POST'
  })
}

export async function customersUpate(data: IClienteUpdate){
  return await httpRequest({
    url: "customers",
    body: data,
    method: 'PUT'
  })
}

export async function customersDelete(id: number) {
  return await httpRequest({
    url: `customers/${id}`,
    method: "DELETE",
  });
}