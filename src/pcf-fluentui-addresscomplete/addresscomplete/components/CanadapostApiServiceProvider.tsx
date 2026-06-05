import * as React from 'react'
import { createContext, ReactNode, useContext } from 'react'
import { ICanadaPostService } from '../services/canadapost.service'
import { useEnvironmentVariable } from '../hooks'
import { Spinner } from '@fluentui/react-components'
import { ErrorMessageBar } from './ErrorMessageBar'
import { usePowerAppsServiceContext } from './PowerAppsServiceContextProvider'
const CanadaPostServiceContext = createContext<ICanadaPostService>(undefined!)
interface CanadapostApiServiceProviderProps {
    environmentVariableName: string
    children?: ReactNode
}
export const CanadapostApiServiceProvider: React.FC<
    CanadapostApiServiceProviderProps
> = ({
    children,
    environmentVariableName,
}: CanadapostApiServiceProviderProps) => {
    const service = usePowerAppsServiceContext()
    const { data, isLoading, error, isError } = useEnvironmentVariable(
        environmentVariableName
    )
    if (isLoading) {
        return <Spinner labelPosition="before" label="Setting up..." />
    }
    if (isError || !data) {
        return (
            <ErrorMessageBar
                error={error}
                title={`Issue loading environment variable: ${environmentVariableName}`}
                defaultMessage="Environment variable(s) could not be loaded."
            />
        )
    }

    const addressService = service.addressServiceFactory(data)
    return (
        <CanadaPostServiceContext.Provider value={addressService}>
            {children}
        </CanadaPostServiceContext.Provider>
    )
}
export const useCanadaPostService = () => {
    return useContext(CanadaPostServiceContext)
}
