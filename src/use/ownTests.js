import { useFetch } from "./fetch";

export function useOwnTests() {
  const {
    response: data,
    request_auth: fetchTests,
    isLoad,
  } = useFetch("/api/user/tests");

  if (!data.value) {
    fetchTests();
  }

  return { data, isLoad };
}
