import { State } from './types'

const mutations = {
  setStoreSmartDevices: (state: State, data: {}) => state.mySmartDevices = data,
  setCurrentDeviceMode: (state: State, payload: any) => state.mySmartDevices[payload].isTurnedOn = !state.mySmartDevices[payload].isTurnedOn
}
export default mutations;