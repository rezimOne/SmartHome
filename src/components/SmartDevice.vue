<template>
  <div class="smart-device-box">
    <ToggleSwitch v-on:change="launchSmartHome" />
    <MyClock />
    <ul class="device-categories">
      <li
        v-for="(categoryTitle, index) in deviceCategories"
        :key="index"
        @click="devicesByCategoryTitle(categoryTitle)">
        <div class="category-item"><p>{{ categoryTitle }}</p></div>
      </li>
    </ul>
    <ul class="smart-devices">
      <li
        class="smart-device"
        v-for="device in smartDevices"
        :key="device.id"
        @click="toggleDeviceBox">
        <div>TYPE: {{device.type}}</div>
        <div>NAME: {{device.name}}</div>
        <div>STATUS: {{device.connectionState[0]}}</div>
      </li>
    </ul>
    <DeviceWrapper
      :smartDevices="smartDevices"
      v-show="showDeviceBox"
    />
  </div>
</template>
<script lang="ts">
import DeviceWrapper from './DeviceWrapper.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import MyClock from './MyClock.vue'
export default {
  name: 'SmartDevice',
  components: { DeviceWrapper, ToggleSwitch, MyClock },
  data() {
    return {
      deviceCategories:[],
      smartDevices: {},
      showDeviceBox: false,
    }
  },
  methods: {
    devicesByCategoryTitle(categoryTitle){
      this.smartDevices = this.$store.state.smartDevices[categoryTitle];
    },
    launchSmartHome(){
      this.deviceCategories = this.$store.getters.getDeviceCategoryTitles;
    },
    toggleDeviceBox(){
      this.showDeviceBox = !this.showDeviceBox;
    }
  },
  created(){
    this.$store.dispatch('saveStoreSmartDevices')
  }
}
</script>
<style lang="scss">
.smart-device-box {
  height: 95vh;
  width: 600px;
  background-color: #e3cd86;
  border-radius: 25px;
  position: relative;
  padding: 0;
  margin: 0 auto;
}
.device-categories {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  bottom: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
}
.category-item {
  width: 100px;
  height: 100px;
  border: 2px solid #7cb5ea;
  border-radius: 15px;
  p {
    text-align: center;
    position: relative;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    margin: 0;
    padding: 5px;
    word-wrap: break-word;
    background-color: aliceblue;
    height: 30px;
  }
}
.smart-devices {
  list-style: none;
  display: flex;
  flex-direction: row;
}
.smart-device {
  background-color: #ffc0cb;
  width: 400px;
  height: 70px;
  margin: 5px;
  display: flex;
  flex-direction: column;
}
</style>