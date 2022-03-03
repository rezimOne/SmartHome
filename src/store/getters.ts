import { State } from './types';

const getters = {
  getDevices: (state: State): {} => {
    return state.mySmartDevices;
  },
  getDeviceDetailsById: (state: State) => (device: {}) => {
    return Object.values(state.mySmartDevices).filter((item: {}) => item['id'] === device['id'])[0]
  }
}
export default getters;
