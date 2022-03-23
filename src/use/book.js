import { useFetch } from "./fetch";
import { computed } from "vue";

export function useBook() {
  // response = {value: {book: {...}}}
  const {
    response: userBook,
    request_auth: fetchBook,
    isLoad: isBookLoad,
  } = useFetch("/api/user/book");

  if (!userBook.value) {
    fetchBook();
  }

  const getTestFromBook = async (testId) => {
    const { response: test, request_auth: fetchTest } = useFetch(
      `/api/user/book/${testId}`
    );

    await fetchTest();

    return test;
  };

  /**
   *
   * @param {String} testId
   * @returns response, isLoad
   */
  const addToBook = async (testId) => {
    // Обновление данных на клиенте
    console.log(userBook.value.book);
    userBook.value.book.push({ _id: testId });

    const {
      response,
      request_auth: add,
      isLoad,
    } = useFetch(`/api/user/book/add/${testId}`, { method: "POST" });

    // Обновление данных на сервере
    await add();

    return { response, isLoad };
  };

  const deleteFromBook = (testId) => {
    // Проверка существует ли Book (добавить)

    // Обновление данных на клиенте
    userBook.value.book = userBook.value.book.filter(
      (obj) => obj._id !== testId
    );
    const {
      response,
      request_auth: del,
      isLoad,
    } = useFetch(`/api/user/book/delete/${testId}`, { method: "POST" });

    // Обновление данных на сервере
    del();

    return { response, isLoad };
  };

  const onlyIdInBook = computed(() => {
    if (!userBook.value) {
      return [];
    }
    return userBook.value.book.map((test) => test._id);
  });

  return {
    userBook,
    fetchBook,
    onlyIdInBook,
    isBookLoad,
    getTestFromBook,
    addToBook,
    deleteFromBook,
  };
}
