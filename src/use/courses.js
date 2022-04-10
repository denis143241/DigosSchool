import { useFetch } from "./fetch";

export function useCourses() {
  const { response, request_auth: getCourses } = useFetch("/api/user/courses");

  if (!response.value) {
    getCourses();
  }

  return { response };
}
