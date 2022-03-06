<template>
  <div class="smart-home-box">
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
          <div>
            <div>STATUS: <p>{{ device.isTurnedOn ? 'ON' : 'OFF' }}</p></div>
          </div>
        </header>
        <section>
          <div><p>{{ device.name | formatProp }}</p></div>
          <div><p>{{ device.connectionState | formatProp }}</p></div>
          <!-- <span>ROOM: </span> -->
        </section>
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
import DeviceDetailsCard from './DeviceDetailsCard.vue'
import MyClock from '../utils/MyClock.vue'
export default {
  name: 'SmartDevice',
  components: { DeviceDetailsCard, MyClock },
  data() {
    return {
      smartDevices: [],
      isActiveDeviceDetailsCard: false,
      deviceImages: {
        bulbImg: require('../assets/img/smartBulb.svg'),
        temperatureSensorImg: require('../assets/img/temperatureSensor.svg'),
        outletImg: require('../assets/img/smartOutlet.svg')
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
  },
}
</script>
<style lang="scss" scoped>
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
  margin: 0;
  top: 50px;
  flex-wrap: wrap;
}
.smart-device {
  background-color: #7cb5ea;
  width: 155px;
  min-height: 155px;
  margin-bottom: 10px;
  margin-left: 20px;
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
    line-height: 20px;
    font-size: 0.8rem;
    p {
      margin: 0;
      display: block;
    }
  }
  section {
    display: block;
    line-height: 8px;
    padding: 5px;
  }
  img {
    width: 22px;
    margin: 0 6px;
  }
  &:hover {
    background-color:#c6eca2;
  }
}
</style>

