import { useFetch } from "./fetch";

export function useOwnBook() {
  const { response: data, request_auth: fetchOwnBook } =
    useFetch("/api/own-book");
  if (!data.value) {
    fetchOwnBook();
  }

  const reload = () => {
    fetchOwnBook();
  };

  const add = async (title) => {
    const options = {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title }),
    };
    const { response, request_auth: addToBook } = useFetch(
      "/api/add-to-own-book",
      options
    );
    await addToBook();
    await reload();
    return response;
  };

  return { data, reload, add };
}
