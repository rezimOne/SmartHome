<template>
  <div class="device-box">
    <section class="device-details">
      <ul class="device-data">
        <li v-for="([deviceProp, deviceValue], index) in deviceProps" :key="index">
          <div class="wrapper">
            <p class="device-prop">{{ deviceProp }}:</p>
            <p class="device-prop-value">{{ deviceValue }}</p>
          </div>
        </li>
      </ul>
    </section>
    <ToggleSwitch v-on:change="changeCurrentDeviceMode" />
  </div>
</template>
<script lang="ts">
import ToggleSwitch from '../utils/ToggleSwitch.vue'
export default {
  name: 'DeviceWrapper',
  components: { ToggleSwitch },
  props: ['deviceDetails', 'smartDevices'],
  data(){
    return {
      myPropsArr: []
    }
  },
  methods: {
    changeCurrentDeviceMode(){
      this.$store.dispatch('saveCurrentDeviceMode', 1)
    },
  },
  computed: {
    deviceProps: function() {
      const propsByDevice = Object.entries(this.deviceDetails);
      return propsByDevice;
    },
  }
}
</script>
<style lang="scss">
.device-box {
  background-color: #faebd7;
  height: 240px;
  padding-top: 1px;
  padding-left: 10px;
  width: 360px;
  position: relative;
  left: 200px;
  top: 235px;
  margin: 5px;
  font-size: .9rem;
  border-radius: 15px;
}
.device-data {
  font-size: .9rem;
  list-style: none;
  padding: 0;
}
.wrapper {
  background-color: rgb(215, 219, 227);
  width: 260px;
  margin-bottom: 6px;
  padding: 4px;
  border-radius: 10px;
  p {
    display: inline-block;
    margin: 0;
    padding-left: 5px;
  }
  .device-prop {
    width: 120px;
  }
}
</style>