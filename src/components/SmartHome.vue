<template>
  <div class="smart-home-wrapper">
    <MyClock />
    <ul class="device-categories">
      <li
        v-for="(type, id) in deviceTypes"
        :key="id"
        @click="devicesByType(type)">
        <div class="category-item">
          <img :src="setSmartDeviceImg(type)" class="device-img">
          <p>{{ type | formatProp }}</p>
        </div>
      </li>
    </ul>
    <ul class="smart-devices">
      <li
        class="smart-device"
        v-for="device in smartDevices"
        :key="device.id"
        @click="showDeviceDetailsCard(device)">
        <header>
          <img :src="setSmartDeviceImg(device.type)">
          <div class="status-info">
            <div>STATUS: {{ device.isTurnedOn ? 'ON' : 'OFF' }}</div>
            <div class="status-indicator" :style="{ backgroundColor: colorByStatus(device) }"></div>
          </div>
        </header>
        <section>
          <div class="device-name"><p>{{ device.name | formatProp }}</p></div>
          <div class="device-connection-state"><p>{{ device.connectionState | formatProp }}</p></div>
        </section>
        <!-- <button @click="myFun(device)">CLICK</button> -->
      </li>
    </ul>
    <DeviceDetailsCard
      :smartDevices="smartDevices"
      :deviceDetails="deviceDetails"
      :closeDeviceDetailsCard="closeDeviceDetailsCard"
      v-if="isActiveDeviceDetailsCard"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import DeviceDetailsCard from './DeviceDetailsCard.vue';
import MyClock from '../utils/MyClock.vue';
export default Vue.extend({
  name: 'SmartDevice',
  components: { DeviceDetailsCard, MyClock },
  data() {
    return {
      smartDevices: [],
      isActiveDeviceDetailsCard: false,
      deviceImages: {
        bulbImg: require('../assets/img/mySmartBulb.svg'),
        temperatureSensorImg: require('../assets/img/mySmartTemperatureSensor.svg'),
        outletImg: require('../assets/img/mySmartOutlet.svg')
      },
      deviceDetails: {}
    }
  },
  methods: {
    showDeviceDetailsCard(device: {}) {
      this.isActiveDeviceDetailsCard = true;
      this.deviceDetails = this.$store.getters.getDeviceDetailsById(device)
    },
    closeDeviceDetailsCard() {
      this.isActiveDeviceDetailsCard = false;
    },
    setSmartDeviceImg(type: string) {
      if(this.deviceTypes) {
        if(type === 'bulb') {
          return this.deviceImages.bulbImg;
        }
        if(type === 'outlet') {
          return this.deviceImages.outletImg;
        }
        if(type === 'temperatureSensor') {
          return this.deviceImages.temperatureSensorImg;
        }
        return this;
      }
    },
    devicesByType(type: string) {
      this.smartDevices = this.$store.getters.getDevices.filter((item: {}) => item['type'] === type);
      console.log(this.smartDevices)
      this.isActiveDeviceDetailsCard = false;
    },
    colorByStatus: (device: {}) => device['isTurnedOn'] ? '#60EC83' : '#FF0000',
     myFun(device){
      console.log(this.$store.getters.getDeviceDetailsById(device).connectionState);
    }
  },
  computed: {
    deviceTypes: function() {
      const myDeviceTypes = Object.values(this.$store.getters.getDevices).map((item: {}) => item['type']);
      return [...new Set(myDeviceTypes)];
    }
  },
  filters: {
    formatProp(item: string) {
      const result = item.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      return result.charAt(0).toUpperCase() + result.slice(1);
    }
  }
});
</script>
<style lang="scss" scoped>
.smart-home-wrapper {
  height: 95vh;
  width: 600px;
  background-color: #e3cd86;
  border-radius: 25px;
  position: relative;
  padding: 0;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
}
.device-categories {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  bottom: 15px;
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
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.079);
  cursor: pointer;
  &:hover {
    background-color: #c6eca2;
  }
  .device-img {
    height: 40px;
    margin: 5px;
  }
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
  flex-direction: row;
  padding: 0;
  margin: 0 auto;
  top: 50px;
  width: 100%;
  justify-content: space-evenly;
}
.smart-device {
  background-color: #7cb5ea;
  width: 155px;
  min-height: 155px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.14);
  cursor: pointer;
  header {
    background-color: #98c7ec;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border-radius: 10px;
    padding: 3px;
    height: 50px;
    .status-info {
      margin-top: 5px;
      font-size: 0.8rem;
      display: block;
      width: 50px;
      height: fit-content;
      line-height: 140%;
    }
    .status-indicator {
      height: 4px;
      background-color: green;
      border-radius: 2px;
    }
  }
  section {
    display: block;
    line-height: 8px;
    margin-top: 20px;
    text-align: center;
  }
  img {
    height: 70%;
    margin: 6px 0;
  }
  &:hover {
    background-color:#c6eca2;
  }
}
</style>

