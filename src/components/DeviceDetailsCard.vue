<template>
  <div class="device-card">
    <ul class="device-data">
      <li v-for="([devicePropName, devicePropValue], index) in deviceProps" :key="index">
        <div class="wrapper">
          <p class="device-prop-name">{{ formatValue(devicePropName) }}:</p>
          <p class="device-prop-value">{{ formatValue(devicePropValue) }}</p>
        </div>
      </li>
    </ul>
    <button class="close-button" @click="closeDeviceDetailsCard"><p>+</p></button>
    <div class="simulation-area">
      <ToggleSwitch v-on:change="changeCurrentDeviceMode" />
      <div class="state-simulator">
        <select v-model="currentConnectionState">
          <option v-for="(state, index) in connectionStates" :key="index">{{ state }}</option>
        </select>
        <button @click="setState">Set state</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ToggleSwitch from '../utils/ToggleSwitch.vue';
import interact from 'interactjs';
export default Vue.extend({
  name: 'DeviceDetailsCard',
  components: { ToggleSwitch },
  props: {
    deviceDetails: {
      type: Object
    },
    smartDevices: {
      type: Array
    },
    closeDeviceDetailsCard: {
      type: Function
    }
  },
  data(){
    return {
      currentConnectionState: '',
      connectionStates: ['connected', 'disconnected', 'poorConnection']
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
    },
    initInteract(selector: string) {
      interact(selector)
      .resizable({
        inertia: true,
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move(event: any) {
            const target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0);
            let y = (parseFloat(target.getAttribute('data-y')) || 0);
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';
            x += event.deltaRect.left;
            y += event.deltaRect.top;
            target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }
        },
        modifiers: [
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),
          interact.modifiers.restrictSize({
            min: { width: 200, height: 225 }
          })
        ]
      })
      .draggable({
        listeners: {
          move: this.dragMoveListener,
          end: this.dragEndListener
        },
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ]
      });
    },
    dragMoveListener(event: any) {
      const target = event.target;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    },
    // dragEndListener(event: any) {
    //   const target = event.target;
    //   console.log(target);
    // }
    formatValue(item: string | number) {
      if(typeof item == 'string') {
        const result = item.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        return result.charAt(0).toUpperCase() + result.slice(1);
      } else {
      return `${item} ${this.devicePropValueUnits}`;
      }
    },
    setState(){
      this.deviceDetails.connectionState = this.currentConnectionState;
    }
  },
  computed: {
    deviceProps: function() {
      const propsByDevice = Object.entries(this.deviceDetails)
      .filter(item => {
        return !['id', 'type', 'name', 'isTurnedOn'].includes(item[0]);
      });
      // if(propsByDevice[1][0] === 'brightness') {
      //   propsByDevice[1][1] = 'bright slider';
      // }
      // if(propsByDevice[1][0] === 'temperature') {
      //   propsByDevice[1][1] = 'temp slider';
      // }
      return propsByDevice
    },
    devicePropValueUnits: function() {
      if (this.deviceProps[1][0] === 'brightness') {
        return '%';
      }
      if (this.deviceProps[1][0] === 'powerConsumption') {
        return 'W';
      }
      if (this.deviceProps[1][0] === 'temperature') {
        return '\u00B0' + 'C'
      }
      return this;
    }
  },
  mounted() {
    this.initInteract('.device-card');
  },
  beforeDestroy() {
    interact('.device-card').unset();
  }
});
</script>
<style lang="scss" scoped>
.device-card {
  background-color: #faebd7;
  height: 225px;
  width: 360px;
  position: relative;
  top: 240px;
  margin: 0 auto;
  font-size: .9rem;
  border-radius: 15px;
  touch-action: none;
  user-select: none;
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.14);
  overflow: hidden;
}
.device-data {
  font-size: .9rem;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 88%;
  margin: 0 auto;
  padding-top: 30px;
}
.wrapper {
  background-color: #d7dbe3;
  margin-bottom: 7px;
  padding: 4px;
  border-radius: 10px;
  p {
    display: inline-block;
    margin: 0;
    padding-left: 5px;
  }
  .device-prop-name {
    width: 130px;
  }
}
.close-button {
  position: absolute;
  right: 2px;
  top: 2px;
  text-align: center;
  line-height: 50%;
  cursor: pointer;
  height: 28px;
  width: 28px;
  border: none;
  border-radius: 14px;
  background-color: #faebd7;
  color: #7cb5ea;
  p {
    transform: rotate(45deg);
    font-size: 1.8rem;
    margin: auto;
  }
}
.simulation-area {
  background-color: #f5e0c5;
  height: 48px;
  width: 100%;
  position: absolute;
  bottom: 0;
  .state-simulator {
  width: fit-content;
  position: absolute;
  left: 80px;
  top: 13px;
  }
}
</style>