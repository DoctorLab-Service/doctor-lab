export type Device = 'desktop' | 'tablet' | 'mobile'
export type Devices = string[]
export type DevicesObject = Record<string, () => boolean | undefined>
export type Orientation = 'portrait' | 'landscape'

export interface UseDevice {
    device: Device
    devices: Devices
    orientation: Orientation
} 
export interface DeviceResponse {
    devices: DevicesObject
    currentDevices: Devices
    currentOrientation: Orientation
} 
