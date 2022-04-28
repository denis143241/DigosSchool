import { ref } from "vue";

export function usePopupTools() {
  const listCursor = ref(-1);
  const contentList = ref([]);

  const cursorDown = () => {
    listCursor.value !== contentList.value.length - 1
      ? (listCursor.value += 1)
      : (listCursor.value = 0);
  };

  const cursorUp = () => {
    listCursor.value > 0
      ? (listCursor.value -= 1)
      : (listCursor.value = contentList.value.length - 1);
  };

  const chooseElement = () => {
    return contentList.value[listCursor];
  };

  return { listCursor, contentList, cursorDown, cursorUp, chooseElement };
}
