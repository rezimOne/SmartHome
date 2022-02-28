<template>
  <div class="device-box">
    <span>{{ smartDevices }}</span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DeviceWrapper',
  props: ['smartDevices'],
  data(){
    return{
    }
  }
}
</script>
<style lang="scss">
.device-box {
  background-color: #faebd7;
  height: 200px;
  width: 200px;
}
</style>