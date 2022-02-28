<template>
  <div class="smart-home-box">
    <ToggleSwitch v-on:change="launchSmartHome" />
    <MyClock />
    <ul class="device-categories">
      <li
        v-for="(categoryTitle, index) in deviceCategories"
        :key="index"
        @click="devicesByCategoryTitle(categoryTitle)">
        <div class="category-item">
          <img :src="setSmartDeviceImg(categoryTitle)" class="device-img">
          <!-- <div class="status">Connected</div> -->
          <p>{{ categoryTitle }}</p>
        </div>
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
import ToggleSwitch from '../utils/ToggleSwitch.vue'
import MyClock from '../utils/MyClock.vue'
export default {
  name: 'SmartDevice',
  components: { DeviceWrapper, ToggleSwitch, MyClock },
  data() {
    return {
      deviceCategories:[],
      smartDevices: {},
      showDeviceBox: false,
      deviceImages: {
        bulbImg: require('../assets/img/smartBulb.svg'),
        temperatureSensorImg: require('../assets/img/temperatureSensor.svg'),
        outletImg: require('../assets/img/smartOutlet.svg')
      }
    }
  },
  methods: {
    devicesByCategoryTitle(categoryTitle: string) {
      this.smartDevices = this.$store.state.smartDevices[categoryTitle];
    },
    launchSmartHome() {
      this.deviceCategories = this.$store.getters.getDeviceCategoryTitles;
    },
    toggleDeviceBox() {
      this.showDeviceBox = !this.showDeviceBox;
    },
    setSmartDeviceImg(categoryTitle: string) {
      if(this.deviceCategories) {
        if(categoryTitle === this.deviceCategories[0]) {
          return this.deviceImages.bulbImg;
        }
        if(categoryTitle === this.deviceCategories[1]) {
          return this.deviceImages.outletImg;
        }
        if(categoryTitle === this.deviceCategories[2]) {
          return this.deviceImages.temperatureSensorImg;
        }
        return this;
      }
    }
  },
  created() {
    this.$store.dispatch('saveStoreSmartDevices')
  }
}
</script>
<style lang="scss">
.smart-home-box {
  height: 95vh;
  width: 600px;
  background-color: #e3cd86;
  border-radius: 25px;
  position: relative;
  padding: 0;
  margin: 0 auto;
  margin-top: 15px;
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
  background-color: #ededd7;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    background-color: #c5e3ec;
  }
  .device-img {
    height: 40px;
    margin: 5px;
  }
  // .status {
  //   position: relative;
  //   text-align: center;
  //   background-color: #5ee769;
  // }
  p {
    text-align: center;
    position: relative;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 5px;
    word-wrap: break-word;

    height: 35px;
  }
}
.smart-devices {
  position: absolute;
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  top: 50px;
  font-size: .9rem;
}
.smart-device {
  background-color: #90a6ec;
  width: 150px;
  height: 50px;
  margin-bottom: 5px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 10px;
}

</style>