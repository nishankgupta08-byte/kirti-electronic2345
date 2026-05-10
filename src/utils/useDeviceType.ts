import { useState, useEffect } from 'react'

type DeviceType = 'mobile' | 'desktop'

export const useDeviceType = (): DeviceType => {
  const [device, setDevice] = useState<DeviceType>('desktop')

  useEffect(() => {
    const check = () => {
      setDevice(window.innerWidth < 768 ? 'mobile' : 'desktop')
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return device
}
