import { useFetch } from "./fetch";

export function useBook() {
  const { response: userBook, request_auth: fetchBook } =
    useFetch("/api/user/book");

  const getTestFromBook = async (testId) => {
    const { response: test, request_auth: fetchTest } = useFetch(
      `/api/user/book/${testId}`
    );

    await fetchTest(); // Асинхронный вызов!

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

  return { userBook, fetchBook, getTestFromBook, addToBook, deleteFromBook };
}
