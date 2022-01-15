import { useFetch } from "./fetch";
import { useGeneralBook } from "./generalBook";
import { useOwnBook } from "./ownBook";

export function useBook() {
  const {
    response: data,
    isLoad,
    request_auth: fetchBook,
  } = useFetch("/api/book");

  if (!data.value) {
    fetchBook();
  }

  const delFromBook = async (title) => {
    const { del } = useGeneralBook();
    await del(title);
    removeDataFromClient_general(title);
  };

  const delFromOwnBook = async (title) => {
    const { del } = useOwnBook();
    await del(title);
    removeDataFromClient_user(title);
  };

  const removeDataFromClient_user = (title) => {
    data.value.fromUser = data.value.fromUser.filter(
      (obj) => obj.title !== title
    );
  };

  const removeDataFromClient_general = (title) => {
    data.value.fromGeneral = data.value.fromGeneral.filter(
      (obj) => obj.title !== title
    );
  };

  return { data, isLoad, delFromBook, delFromOwnBook };
}
