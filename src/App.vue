<template>
  <div id="app">
    <SmartDevice />
  </div>
</template>
<script lang="ts">
import SmartDevice from './components/SmartDevice.vue';
export default {
  name: 'App',
  components: {
    SmartDevice
  },
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
}
</style>
