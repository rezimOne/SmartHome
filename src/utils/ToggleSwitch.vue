<template>
  <label :class="{'active': isActive}" class="toggle-button">
    <input type="checkbox" :disabled="disabled" v-model="checkedValue">
    <span class="toggle-switch"></span>
  </label>
</template>
<script lang="ts">
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    labelEnableText: {
    type: String,
    default: 'On'
    },
    labelDisableText: {
      type: String,
      default: 'Off'
    },
    defaultState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentState: this.defaultState
    }
  },
  watch: {
    defaultState: function defaultState() {
      this.currentState = Boolean(this.defaultState)
    }
  },
  computed: {
    isActive() {
      return this.currentState;
    },
    enableText() {
      return this.labelEnableText;
    },
    disabledText() {
      return this.labelDisableText;
    },
    checkedValue: {
      get() {
        return this.currentState;
      },
      set(newValue) {
        this.currentState = newValue;
        this.$emit('change', newValue);
      }
    }
  }
}
</script>
<style scoped>
.toggle-button {
  user-select: none;
  cursor: pointer;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translate(-50%, -50%);
}
.toggle-button input[type="checkbox"] {
  opacity: 0;
  position: relative;
  width: 1px;
  height: 1px;
}
.toggle-button .toggle-switch {
  display: inline-block;
  height: 40px;
  border-radius: 20px;
  width: 80px;
  background: #7cb5ea;
  box-shadow: inset 0 0 1px #BFCBD9;
  position: relative;
}
.toggle-button .toggle-switch::after,
.toggle-button .toggle-switch::before {
  content: "";
  position: absolute;
  display: block;
  height: 34px;
  width: 34px;
  border-radius: 17px;
  top: 3px;
  left: 3px;
  transform: translateX(0);
  transition: all .25s cubic-bezier(.5, -.6, .5, .6);
}
.toggle-button .toggle-switch::after {
  background:  #ededd7;
  box-shadow: 0 0 1px #666;
}
.toggle-button .toggle-switch::before {
  background: #4D4D4D;
  box-shadow: 0 0 0 3px rgba(61, 219, 68, 0.1);
  opacity:0;
}
.active .toggle-switch {
  background: #ededd7;
}
.active .toggle-switch::after {
  left: 42px;
  background: #7cb5ea;
}
</style>