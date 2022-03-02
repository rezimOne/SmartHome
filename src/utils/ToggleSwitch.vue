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
  top: 50%;
  left: 77%;
}
.toggle-button input[type="checkbox"] {
  opacity: 0;
  position: relative;
  width: 1px;
  height: 1px;
}
.toggle-button .toggle-switch {
  display: inline-block;
  height: 30px;
  border-radius: 15px;
  width: 60px;
  background: #7cb5ea;
  box-shadow: inset 0 0 1px #BFCBD9;
  position: relative;
}
.toggle-button .toggle-switch::after,
.toggle-button .toggle-switch::before {
  content: "";
  position: absolute;
  display: block;
  height: 24px;
  width: 24px;
  border-radius: 12px;
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
  background: #404979;
}
.active .toggle-switch::after {
  left: 33px;
  background: #60ec83;
}
</style>