import { State } from './types';

const getters = {
  getDevices: (state: State): any => {
    return state.smartDevices;
  },
  getDeviceCategoryTitles: (state: State): any => {
    return Object.keys(state.smartDevices);
  },
  getDevicesByCategoryTitle: (state: State): any => (payload) => {
    return state.smartDevices[payload]
  }
}
export default getters;
