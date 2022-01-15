import { useFetch } from "./fetch";

export function useOwnTests() {
  const { response: data, request_auth: fetchTests } =
    useFetch("/api/own-tests");

  if (!data.value) {
    fetchTests();
  }

  return { data };
}
