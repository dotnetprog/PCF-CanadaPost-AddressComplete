import * as React from 'react'
import { FluentProvider, IdPrefixProvider } from '@fluentui/react-components'
import {
    CanadapostApiServiceProvider,
    PowerAppsServiceContextProvider,
    AddressCompleteSearchField,
} from './components'
import { PowerAppsService } from './services'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export interface IAppProps {
    contextService: PowerAppsService
    instanceid: string
}

export const App: React.FC<IAppProps> = ({ contextService, instanceid }) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <IdPrefixProvider value={`addresscomplete-${instanceid}`}>
                <PowerAppsServiceContextProvider Service={contextService}>
                    <FluentProvider
                        style={{ width: '100%' }}
                        theme={contextService.theme}>
                        <CanadapostApiServiceProvider
                            environmentVariableName={
                                contextService.apiKeyVarName
                            }>
                            <AddressCompleteSearchField
                                placeholderTerm={contextService.placeholderTerm}
                                onSelectedAddress={contextService.onChange}
                            />
                        </CanadapostApiServiceProvider>
                    </FluentProvider>
                </PowerAppsServiceContextProvider>
            </IdPrefixProvider>
        </QueryClientProvider>
    )
}
