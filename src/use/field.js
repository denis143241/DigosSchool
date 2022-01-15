import { reactive, ref, watch } from "vue";

export function useField(filed) {
  const value = ref(filed.value);
  const valid = ref(true);
  const errors = reactive({});

  const reasign = (val) => {
    Object.keys(filed.validators ?? {}).forEach((validator) => {
      const isError = filed.validators[validator](val);
      errors[validator] = isError;
    });
    valid.value = !Object.entries(errors)
      .map((_, val) => val)
      .some((bool) => bool === false);
  };

  watch(value, (newValue) => {
    reasign(newValue);
  });

  reasign(filed.value);

  return { valid, value, errors };
}
