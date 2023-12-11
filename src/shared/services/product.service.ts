import { IProductoCreate, IProductoUpdate } from "@/modules/stores/productos/interfaces/productos.interfaces";
import { httpRequest } from "../lib/build-request";

export async function productsList() {
  return await httpRequest({
    url: "products",
  });
}


export async function productsCreate(data: IProductoCreate){
  return await httpRequest({
    url: "products",
    body: data,
    method: 'POST'
  })
}

export async function productsUpate(data: IProductoUpdate){
  return await httpRequest({
    url: "products",
    body: data,
    method: 'PUT'
  })
}

export async function productsDelete(id: number) {
  return await httpRequest({
    url: `products/${id}`,
    method: "DELETE",
  });
}

export async function productsFindById(id: number) {
  return await httpRequest({
    url: `products/by-id/${id}`,
    method: "GET",
  });
}