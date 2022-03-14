import { ref } from "vue";

export function useAlert(success, message) {
  let isShow = ref(false);
  let alertSuccess = ref(success);
  let alertMessage = ref(message);

  const showAlert = () => {
    isShow.value = true;
    // console.log(1);
    // setTimeout(() => {
    //   isShow.value = false;
    // }, 1000);
  };

  return { isShow, alertSuccess, alertMessage, showAlert };
}
