import { useFetch } from "./fetch";
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

  return { data, isLoad, delFromOwnBook };
}
