import { State } from './types'

const mutations = {
  setStoreSmartDevices: (state: State, data) => state.smartDevices = data,
}
export default mutations;