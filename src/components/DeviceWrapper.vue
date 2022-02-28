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
  width: 350px;
  position: relative;
  left: 200px;
  top: 50px;
  margin: 5px;
  padding: 10px;
  font-size: .9rem;
  border-radius: 15px;
}
</style>