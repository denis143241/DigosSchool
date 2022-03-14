import { ref } from "vue";
import { useToken } from "./token";

/**
 * 
 * @param {String} url 
 * @param {Object} options {headers, method, body: JSON.stringify()}
 * @returns {any} response, isLoad, request, request_auth
 */
export function useFetch(url, options) {
  let response = ref();
  const isLoad = ref();
  let { token } = useToken();

  /**
   * Отправляет запрос без токена
   */
  const request = async () => {
    isLoad.value = true;
    const res = await fetch(url, options);
    response.value = await res.json();
    isLoad.value = false;
  };

  /**
   * Отправляет запрос с токеном.
   */
  const request_auth = async () => {
    isLoad.value = true;
    const res = await fetch(url, {
      ...options,
      headers: { ...options?.headers, Authorization: `Bearer ${token.value}` },
    });
    response.value = await res.json();
    isLoad.value = false;
  };

  return { response, isLoad, request, request_auth };
}
