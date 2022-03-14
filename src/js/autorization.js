import { api_get_auth } from "./api_functions";

export const onAuthorization = async (token) => {
  localStorage.setItem("token", token);
  const user = await getUser(token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getUser = async (token) => {
  return await api_get_auth("/api/user", token);
};
