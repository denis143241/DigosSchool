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

export const api_post_auth = async (url, method = "POST", body, token) => {
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const api_get_auth = async (url, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(url, {
    method: "GET",
    headers,
  });
  return await res.json();
};
