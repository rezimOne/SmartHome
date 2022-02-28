import axios from "axios";

const actions = {
  saveStoreSmartDevices({ commit }): void {
    axios.get('./mockData.json')
    .then(response => {
      console.log(response.data.smartDevices);
      commit('setStoreSmartDevices', response.data.smartDevices)
    })
    .catch(err => console.log(err))
  },
}
export default actions;
 // fetch('./mockData.json')
    // .then(async response => {
    //   const jsonObj = await response.json();

    //   console.log(jsonObj)
    //   commit('setStoreSmartDevice', jsonObj)
    // })