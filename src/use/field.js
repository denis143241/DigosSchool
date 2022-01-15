import { reactive, ref, watch } from "vue";

const not = (val) => !val;

export function useField(filed) {
  const value = ref(filed.value);
  const valid = ref(true);
  const errors = reactive({});
  const touched = ref(false);

  const reasign = (val) => {
    Object.keys(filed.validators ?? {}).forEach((validator) => {
      const isError = filed.validators[validator](val);
      errors[validator] = not(isError);
    });
    valid.value = not(
      Object.entries(errors)
        .map(([, bool]) => bool)
        .some((bool) => bool === true)
    );
  };

  watch(value, (newValue) => {
    reasign(newValue);
  });

  reasign(filed.value);

  return { valid, value, errors, touched, blur: () => (touched.value = true) };
}
