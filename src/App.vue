<template>
  <div id="app">
    <SmartDevice />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import SmartDevice from './components/SmartHome.vue';
export default Vue.extend({
  name: 'App',
  components: {
    SmartDevice
  },
   created() {
    this.$store.dispatch('saveStoreSmartDevices')
  }
});
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
}
</style>
