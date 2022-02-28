export type State = {
  smartDevices: {}
}
export interface SmartBulb {
  type: 'bulb',
  id: string,
  name: string,
  connectionState: string,
  isTurnedOn: boolean,
  brightness: number,
  color: string
}
export interface SmartOutlet {
  type: 'outlet',
  id: string,
  name: string,
  connectionState: string,
  isTurnedOn: boolean,
  powerConsumption: number
}
export interface SmartTemperatureSensor {
  type: 'temperatureSensor',
  id: string,
  name: string,
  connectionState: string,
  temperature: number
}