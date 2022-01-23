import { computed } from "vue";
import { useFetch } from "./fetch";

export function useAdmin() {
  const { response: roles, request_auth: getRoles } = useFetch("/api/roles");

  if (!roles) {
    getRoles();
  }

  const isAdmin = computed(() => {
    if (roles.value === undefined) {
      return !!roles.value;
    }

    return roles.value.roles.includes("ADMIN");
  });

  const createLesson = async (lesson) => {
    const options = {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ...lesson }),
    };
    const { response, request_auth } = useFetch(
      "/api/create-admin-lesson",
      options
    );

    await request_auth();
    return { response };
  };

  const getAdminMode = () => {
    return localStorage.getItem("adminMode") ?? false;
  };

  return { isAdmin, getAdminMode, createLesson };
}
