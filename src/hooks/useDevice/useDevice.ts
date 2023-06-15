import { useEffect, useState } from "react"
import { device as checkDevice } from "./devices"
import { UseDevice, Devices, Device, Orientation } from "./types"

export const useDevice = (): UseDevice => {
    const [devices, setDevices] = useState<Devices>([])
    const [device, setDevice] = useState<Device>('desktop')
    const [orientation, setOrientation] = useState<Orientation>('landscape')
    

    useEffect(() => {
        const { currentDevices, currentOrientation } = checkDevice(window.navigator.userAgent.toLowerCase())
    
        setDevices(currentDevices)
        setOrientation(currentOrientation)
        
        const desktop = currentDevices.indexOf('desktop') !== -1 ? 'desktop' : undefined
        const tablet = currentDevices.indexOf('tablet') !== -1 ? 'tablet' : undefined
        const mobile = currentDevices.indexOf('mobile') !== -1 ? 'mobile' : undefined
    
        setDevice(desktop || tablet || mobile)

    }, [])

    return { device, devices, orientation }
}