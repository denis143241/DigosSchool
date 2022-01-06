export const api_post = async (url, method, body) => {
  const headers = { "content-type": "application/json" };
  const res = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const api_get = async (url) => {
  const res = await fetch(url);
  return await res.json();
};
