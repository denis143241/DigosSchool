import { useFetch } from "./fetch";

export function useUser() {
  const { response, request_auth: getUserData } = useFetch("/api/user");

  if (!response.value) {
    getUserData();
  }

  return { response };
}
