import * as React from 'react'
import { createContext, ReactNode, useContext } from 'react'
import { PowerAppsService } from '../services'
const PowerAppsContext = createContext<PowerAppsService>(undefined!)
interface PowerAppsServiceContextProviderProps {
    Service: PowerAppsService
    children: ReactNode
}
export const PowerAppsServiceContextProvider: React.FC<
    PowerAppsServiceContextProviderProps
> = ({ Service, children }: PowerAppsServiceContextProviderProps) => {
    return (
        <PowerAppsContext.Provider value={Service}>
            {children}
        </PowerAppsContext.Provider>
    )
}
export const usePowerAppsServiceContext = () => {
    return useContext(PowerAppsContext)
}
