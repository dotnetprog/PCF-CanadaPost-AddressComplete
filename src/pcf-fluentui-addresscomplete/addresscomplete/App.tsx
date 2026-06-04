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

export class App extends React.Component<IAppProps> {
    public render(): React.ReactNode {
        const queryClient = new QueryClient()
        return (
            <QueryClientProvider client={queryClient}>
                <IdPrefixProvider
                    value={`addresscomplete-${this.props.instanceid}`}>
                    <PowerAppsServiceContextProvider
                        Service={this.props.contextService}>
                        <FluentProvider
                            style={{ width: '100%' }}
                            theme={this.props.contextService.theme}>
                            <CanadapostApiServiceProvider
                                environmentVariableName={
                                    this.props.contextService.apiKeyVarName
                                }>
                                <AddressCompleteSearchField
                                    placeholderTerm={
                                        this.props.contextService
                                            .placeholderTerm
                                    }
                                    onSelectedAddress={
                                        this.props.contextService.onChange
                                    }
                                />
                            </CanadapostApiServiceProvider>
                        </FluentProvider>
                    </PowerAppsServiceContextProvider>
                </IdPrefixProvider>
            </QueryClientProvider>
        )
    }
}
