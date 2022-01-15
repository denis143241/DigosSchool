import { computed, reactive } from "vue";
import { useField } from "./field";

export function useForm(init = {}) {
  const form = reactive({});

  for (let [key, value] of Object.entries(init)) {
    form[key] = useField(value);
  }
  form.valid = computed(() => {
    const fieldValids = Object.keys(form)
      .filter((key) => key !== "valid")
      .map((k) => form[k].valid);
    return !fieldValids.includes(false);
  });

  return form;
}
