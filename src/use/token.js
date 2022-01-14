import { ref } from "vue";

export function useToken() {
  const token = ref(localStorage.getItem("token"));

  return { token };
}
