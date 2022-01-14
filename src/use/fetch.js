import { ref } from "vue";
import { useToken } from "./token";

export function useFetch(url, options) {
  let response = ref();
  let { token } = useToken();

  const request = async () => {
    const res = await fetch(url, options);
    response.value = await res.json();
  };

  const request_auth = async () => {
    const res = await fetch(url, {
      ...options,
      headers: { ...options?.headers, Authorization: `Bearer ${token.value}` },
    });
    response.value = await res.json();
  };

  return { response, request, request_auth };
}
