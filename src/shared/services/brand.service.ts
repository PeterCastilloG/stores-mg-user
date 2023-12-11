import { httpRequest } from "../lib/build-request";
import { IMarcaCreate, IMarcaUpdate } from "@/modules/stores/marcas/interfaces/marcas.interfaces";

export async function brandsList() {
  return await httpRequest({
    url: "brands",
  });
}

export async function brandsCreate(data: IMarcaCreate) {
  return await httpRequest({
    url: "brands",
    body: data,
    method: "POST",
  });
}

export async function brandsUpate(data: IMarcaUpdate) {
  return await httpRequest({
    url: "brands",
    body: data,
    method: "PUT",
  });
}

export async function brandsDelete(id: number) {
  return await httpRequest({
    url: `brands/${id}`,
    method: "DELETE",
  });
}
