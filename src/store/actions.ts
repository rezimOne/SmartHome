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
  saveCurrentDeviceMode({ commit }, payload: any): any {
    commit('setCurrentDeviceMode', payload);
  },
}
export default actions;