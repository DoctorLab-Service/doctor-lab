import { DeviceResponse, Devices, DevicesObject, Orientation } from "./types"

export const device = (userAgent: string): DeviceResponse => {

    const devicesName = {
        iphone: 'iphone',
        ipod: 'ipod',
        ipad: 'ipad',
        android: 'android',
        mobile: 'mobile',
        blackberry: 'blackberry',
        bb10: 'bb10',
        rim: 'rim',
        tablet: 'tablet',
        windows: 'windows',
        phone: 'phone',
        touch: 'touch',
        rv: ' rv:',
        meego: 'meego',
    }

    const devices: DevicesObject  = {}
    
    // Simple UA string search
    const find = (needle: string) => {
        return userAgent && userAgent.indexOf(needle) !== -1
    }
    
    // Main functions
    // --------------
    
    devices.ios = () => {
        return devices.iphone() || devices.ipod() || devices.ipad()
    }
    
    devices.iphone = () => {
        return !devices.windows() && find(devicesName.iphone)
    }
    
    devices.ipod = () => {
        return find(devicesName.ipod)
    }
    
    devices.ipad = () => {
        return find(devicesName.ipad)
    }
    
    devices.android = () => {
        return !devices.windows() && find(devicesName.android)
    }
    
    devices.androidPhone = () => {
        return devices.android() && find(devicesName.mobile)
    }
    
    devices.androidTablet = () => {
        return devices.android() && !find(devicesName.mobile)
    }
    
    devices.blackberry = () => {
        return find(devicesName.blackberry) || find(devicesName.bb10) || find(devicesName.rim)
    }
    
    devices.blackberryPhone = () => {
        return devices.blackberry() && !find(devicesName.tablet)
    }
    
    devices.blackberryTablet = () => {
        return devices.blackberry() && find(devicesName.tablet)
    }
    
    devices.windows = () => {
        return find(devicesName.windows)
    }
    
    devices.windowsPhone = () => {
        return devices.windows() && find(devicesName.phone)
    }
    
    devices.windowsTablet = () => {
        return devices.windows() && (find(devicesName.touch) && !devices.windowsPhone())
    }
    
    devices.fxos = () => {
        return (find(devicesName.mobile) || find(devicesName.tablet)) && find(devicesName.rv)
    }
    
    devices.fxosPhone = () => {
        return devices.fxos() && find(devicesName.mobile)
    }
    
    devices.fxosTablet = () => {
        return devices.fxos() && find(devicesName.tablet)
    }
    
    devices.meego = () => {
        return find(devicesName.meego)
    }
    
    devices.mobile = () => {
        return devices.androidPhone() || devices.iphone() || devices.ipod() || devices.windowsPhone() || devices.blackberryPhone() || devices.fxosPhone() || devices.meego()
    }
    
    devices.tablet = () => {
        return devices.ipad() || devices.androidTablet() || devices.blackberryTablet() || devices.windowsTablet() || devices.fxosTablet()
    }
    
    devices.desktop = () => {
        return !devices.tablet() && !devices.mobile()
    }
    
    devices.television = () => {
        let i, television
        
        television = [
            "googletv",
            "viera",
            "smarttv",
            "internet.tv",
            "netcast",
            "nettv",
            "appletv",
            "boxee",
            "kylo",
            "roku",
            "dlnadoc",
            "roku",
            "pov_tv",
            "hbbtv",
            "ce-html"
        ]
        i = 0
        while (i < television.length) {
            if (find(television[i])) {
                return true
            }
            i++
        }
        return false
    }
    
    //  Orientation
    // --------------
    
    devices.portrait = function () {
        return (window.innerHeight / window.innerWidth) > 1
    }
    
    devices.landscape = function () {
        return (window.innerHeight / window.innerWidth) < 1
    }


    // Set Current devices and orientation
    const currentDevices: Devices = []
    let currentOrientation: Orientation = 'landscape'


    devices.ios() && currentDevices.push('ios')
    devices.iphone() && currentDevices.push('iphone')
    devices.ipod() && currentDevices.push('ipod')
    devices.ipad() && currentDevices.push('ipad')
    devices.android() && currentDevices.push('android')
    devices.androidPhone() && currentDevices.push('androidPhone')
    devices.androidTablet() && currentDevices.push('androidTablet')
    devices.blackberry() && currentDevices.push('blackberry')
    devices.blackberryPhone() && currentDevices.push('blackberryPhone')
    devices.blackberryTablet() && currentDevices.push('blackberryTablet')
    devices.windows() && currentDevices.push('windows')
    devices.windowsPhone() && currentDevices.push('windowsPhone')
    devices.windowsTablet() && currentDevices.push('windowsTablet')
    devices.fxos() && currentDevices.push('fxos')
    devices.fxosPhone() && currentDevices.push('fxosPhone')
    devices.fxosTablet() && currentDevices.push('fxosTablet')
    devices.meego() && currentDevices.push('meego')
    devices.mobile() && currentDevices.push('mobile')
    devices.tablet() && currentDevices.push('tablet')
    devices.desktop() && currentDevices.push('desktop')
    devices.television() && currentDevices.push('television') 

    devices.portrait() && (currentOrientation = 'portrait')
    devices.landscape() && (currentOrientation = 'landscape')


    return { 
        devices,
        currentDevices,
        currentOrientation,
    }
}