export const required = (val) => !!val;
export const minLength = (num) => (val) => val.length >= num;
export const maxLength = (num) => (val) => val.length <= num;
