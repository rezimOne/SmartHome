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
    <button class="close-button" @click="closeDeviceDetailsCard"><p>+</p></button>
    <ToggleSwitch v-on:change="changeCurrentDeviceMode" />
  </div>
</template>
<script lang="ts">
import ToggleSwitch from '../utils/ToggleSwitch.vue'
export default {
  name: 'DeviceDetailsCard',
  components: { ToggleSwitch },
  props: ['deviceDetails', 'smartDevices', 'closeDeviceDetailsCard'],
  data(){
    return {
    }
  },
  methods: {
    changeCurrentDeviceMode() {
      if(this.smartDevices) {
        this.smartDevices.filter((item: {}) => {
          if(item['id'] === this.deviceDetails.id) {
          this.deviceDetails.isTurnedOn = !this.deviceDetails.isTurnedOn;
          }
        });
      }
    }
  },
  computed: {
    deviceProps: function() {
      const propsByDevice = Object.entries(this.deviceDetails)
      return propsByDevice;
    },
  }
}
</script>
<style lang="scss" scoped>
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
  background-color: #d7dbe3;
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
.close-button {
  position: absolute;
  right: 5px;
  top: 5px;
  text-align: center;
  line-height: 50%;
  cursor: pointer;
  height: 30px;
  width: 30px;
  border: none;
  border-radius: 15px;
  background-color: #faebd7;
  color: #7cb5ea;
  p {
    transform: rotate(45deg);
    font-size: 1.95rem;
    margin: auto;
  }
}
</style>