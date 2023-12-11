import { ICategoriaCreate, ICategoriaUpdate } from "@/modules/stores/categorias/interfaces/categorias.interfaces";
import { httpRequest } from "../lib/build-request";

export async function categoriesList() {
  return await httpRequest({
    url: "categories",
  });
}

export async function categoriesCreate(data: ICategoriaCreate) {
  return await httpRequest({
    url: "categories",
    body: data,
    method: "POST",
  });
}

export async function categoriesUpate(data: ICategoriaUpdate) {
  return await httpRequest({
    url: "categories",
    body: data,
    method: "PUT",
  });
}

export async function categoriesDelete(id: number) {
  return await httpRequest({
    url: `categories/${id}`,
    method: "DELETE",
  });
}
