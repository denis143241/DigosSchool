<template>
  <p class="checkbox-row">
    <label>
      <input
        :value="id"
        @input="$emit('update:id', $event)"
        type="checkbox"
        :checked="isChecked"
      />
      <span style="width: 100%">
        <div class="checkbox-info row">
          <div class="col m4">{{ title }}</div>
          <div class="col m4">{{ category }}</div>
          <div class="col m4">{{ language }}</div>
        </div>
      </span>
    </label>
  </p>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    language: {
      type: String,
    },
    id: {
      type: String,
    },
    isChecked: {
      type: Boolean,
    },
  },
  emits: ["update:id"],
};
</script>

<style lang="less" scoped>
@keyframes widespreading {
  0% {
    width: 0;
    left: 50%;
  }
  100% {
    left: -10%;
    width: 120%;
  }
}
.checkbox {
  &-row {
    margin: 0;
    padding: 14px 0;
    position: relative;
    width: 70%;
    & span {
      &:hover {
        color: #373737;
      }
    }
    &:hover {
      cursor: pointer;
      &::after,
      &::before {
        display: block;
        animation: widespreading 0.2s linear;
      }
    }
    &::after,
    &::before {
      content: "";
      position: absolute;
      left: -10%;
      width: 120%;
      height: 0.5px;
      background-color: #26a69928;
      display: none;
    }
    &::before {
      top: calc(100% + 5px);
    }
    &::after {
      top: -10px;
    }
  }
}

@media only screen and (max-width: 800px) {
  .checkbox {
    &-row {
      width: 90%;
    }
  }
}
</style>
