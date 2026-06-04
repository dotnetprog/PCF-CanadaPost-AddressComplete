import { Theme, webLightTheme } from '@fluentui/react-components'
import { IInputs } from '../generated/ManifestTypes'
import { addressDetailData } from '../model/addressDetailData'
import { ICanadaPostService } from './canadapost.service'
import { IEnvironmentVariableService } from './environmentvariable.service'
import { CountryManager } from './CountryManager'
export type IPowerAppsContextServiceProps = {
    context: ComponentFramework.Context<IInputs>
    addressServiceFactory: (apiKey: string) => ICanadaPostService
    envVariableService: IEnvironmentVariableService
    onChange: (selectedAddress?: addressDetailData) => void
}
export class PowerAppsService {
    isReadOnly: boolean
    isMasked: boolean
    searchLabel: string
    placeholderTerm: string
    theme: Theme
    onChange: (selectedAddress?: addressDetailData) => void
    addressServiceFactory: (apiKey: string) => ICanadaPostService
    countryManager: CountryManager
    envVariableService: IEnvironmentVariableService
    apiKeyVarName: string
    constructor(private props: IPowerAppsContextServiceProps) {
        this.isReadOnly =
            props.context.mode.isControlDisabled ||
            !props.context.parameters.boundField.security?.editable
        this.isMasked = !props.context.parameters.boundField.security?.readable
        this.apiKeyVarName = props.context.parameters.apikeyEnvVarName.raw ?? ''
        this.onChange = props.onChange
        this.addressServiceFactory = props.addressServiceFactory
        this.envVariableService = props.envVariableService
        this.placeholderTerm =
            props.context.parameters.searchHint.raw ?? 'Enter an address'
        this.theme =
            props.context.fluentDesignLanguage?.tokenTheme ?? webLightTheme
        const defaultCountry =
            this.props.context.parameters.defaultcountry?.raw ?? undefined
        const displayCountryCodes = this.getStringArrayFromRawValue(
            this.props.context.parameters.displaycountries?.raw?.toUpperCase(),
            ','
        )
        const topCountryCodes = this.getStringArrayFromRawValue(
            this.props.context.parameters.topcountries?.raw?.toUpperCase(),
            ','
        )
        this.countryManager = new CountryManager(
            this.props.context.resources,
            defaultCountry,
            displayCountryCodes,
            topCountryCodes
        )
    }
    private getStringArrayFromRawValue(
        val: string | undefined,
        separator: string
    ) {
        if (!val || val === '' || val === 'VAL') {
            return undefined
        }
        return val.split(separator)
    }
}
