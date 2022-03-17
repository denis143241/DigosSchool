import { ref } from "vue";

export function useAlert(success, message) {
  let isShow = ref(false);
  let alertSuccess = ref(success);
  let alertMessage = ref(message);

  const showAlert = () => {
    isShow.value = true;
  };

  return { isShow, alertSuccess, alertMessage, showAlert };
}
