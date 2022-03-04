<template>
  <div class="device-card" ref="myDraggable">
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
import interact from 'interactjs'
export default {
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
            min: { width: 200, height: 200 }
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
  },
  computed: {
    deviceProps: function() {
      const propsByDevice = Object.entries(this.deviceDetails);
      return propsByDevice;
    },
  },
  mounted() {
    this.initInteract('.device-card');
  },
  beforeDestroy() {
    interact('.device-card').unset();
  }
}
</script>
<style lang="scss" scoped>
.device-card {
  background-color: #faebd7;
  height: 240px;
  padding-top: 1px;
  padding-left: 10px;
  width: 360px;
  position: absolute;
  left: 200px;
  top: 235px;
  margin: 5px;
  font-size: .9rem;
  border-radius: 15px;
  touch-action: none;
  user-select: none;
  transform: translate(0px, 0px);
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