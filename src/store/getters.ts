import { State } from './types';

const getters = {
  getDevices: (state: State): {} => state.mySmartDevices,
  // getCurrentDeviceModeByid: (state: State) => (id) => Object.values(state.mySmartDevices).filter(item => item['id'] === id)
}
export default getters;
