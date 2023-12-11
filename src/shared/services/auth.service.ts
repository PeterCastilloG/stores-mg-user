import { httpRequest } from "../lib/build-request";

export async function loginUser(data: { email: string; password: string }) {
  return await httpRequest({
    url: "users/login",
    body: data,
    method: "POST",
  });
}

export async function registerUser(data: { name: string, email: string; password: string }) {
  return await httpRequest({
    url: "users/register",
    body: data,
    method: "POST",
  });
}

