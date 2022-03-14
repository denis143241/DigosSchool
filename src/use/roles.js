import { useFetch } from "./fetch";

export function useRoles() {
  const { response, request_auth: getRoles } = useFetch("/api/user/roles");

  if (localStorage.getItem("token")) {
    getRoles();
  }

  return { response };
}
