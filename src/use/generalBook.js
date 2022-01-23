import { useFetch } from "./fetch";

export function useGeneralBook() {
  const {
    response: data,
    request_auth: getGeneralBook,
    isLoad,
  } = useFetch("/api/general-book");

  if (!data.value) {
    getGeneralBook();
  }

  const add = async (title) => {
    const options = {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title }),
    };
    const { response, request_auth: addToBook } = useFetch(
      "/api/add-to-book",
      options
    );
    await addToBook();
    await getGeneralBook();
    return response;
  };

  const del = async (title) => {
    const options = {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title }),
    };
    const { response, request_auth: addToBook } = useFetch(
      "/api/delete-from-book",
      options
    );
    await addToBook();
    return response;
  };

  return { data, isLoad, add, del, getGeneralBook };
}
