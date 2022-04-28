<template>
  <div class="input-field" :style="styles">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="inputType"
      :autocomplete="autocomplete"
      id="name"
    />
    <label for="name"><slot> </slot> </label>
  </div>
</template>

<script>
export default {
  props: {
    inputType: {
      type: String,
      default: "text",
    },
    inputId: {
      type: String,
    },
    styles: {
      type: Object,
    },
    modelValue: {
      type: String,
    },
    autocomplete: {
      type: String,
      default: "on",
    },
  },
  emits: ["update:modelValue"],
};
</script>
