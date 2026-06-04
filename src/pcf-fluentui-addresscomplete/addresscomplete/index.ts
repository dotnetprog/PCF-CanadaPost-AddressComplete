import { IInputs, IOutputs } from './generated/ManifestTypes'
import { App, IAppProps } from './App'
import * as React from 'react'
import { PowerAppsService } from './services'
import { addressDetailData } from './model/addressDetailData'
import { GuidGenerator } from './GuidGenerator'
import {
    CanadaPostService,
    ICanadaPostService,
} from './services/canadapost.service'
import {
    CachedEnvironmentVariableService,
    EnvironmentVariableService,
    FakeEnvironmentVariableService,
    IEnvironmentVariableService,
} from './services/environmentvariable.service'

export class addresscomplete implements ComponentFramework.ReactControl<
    IInputs,
    IOutputs
> {
    private notifyOutputChanged: () => void
    private selectedAddress?: addressDetailData
    private _context: ComponentFramework.Context<IInputs>
    private _instanceid: string
    private environmentVariableService: IEnvironmentVariableService
    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this._instanceid = GuidGenerator.short()
        this._context = context
        this.notifyOutputChanged = notifyOutputChanged
        console.log(state)
        const innerEnvService = this.IsLocalDevelopment()
            ? new FakeEnvironmentVariableService()
            : new EnvironmentVariableService(context.webAPI)
        this.environmentVariableService = new CachedEnvironmentVariableService(
            innerEnvService,
            sessionStorage
        )
    }
    private addressServiceFactory(apikey: string): ICanadaPostService {
        return new CanadaPostService(
            apikey,
            this._context.userSettings.languageId === 1036 ? 'fr' : 'en'
        )
    }
    private IsLocalDevelopment(): boolean {
        return window.location.hostname === 'localhost'
    }
    private onSelectedAddress(selectedAddress?: addressDetailData): void {
        console.log(selectedAddress)
        this.selectedAddress = selectedAddress
        this.notifyOutputChanged()
    }
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(
        context: ComponentFramework.Context<IInputs>
    ): React.ReactElement {
        this._context = context
        const props: IAppProps = {
            contextService: new PowerAppsService({
                context,
                onChange: this.onSelectedAddress.bind(this),
                addressServiceFactory: this.addressServiceFactory.bind(this),
                envVariableService: this.environmentVariableService,
            }),
            instanceid: this._instanceid,
        }
        return React.createElement(App, props)
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        const output: Record<string, any> = {}

        if (this._context.parameters.selectedAddressId.type != null)
            output.selectedAddressId = this.selectedAddress?.Id

        if (this._context.parameters.fullAddress.type != null)
            output.fullAddress = this.selectedAddress?.Label

        if (this._context.parameters.buildingNumber.type != null)
            output.buildingNumber = this.selectedAddress?.BuildingNumber

        if (this._context.parameters.streetName.type != null)
            output.streetName = this.selectedAddress?.Street

        if (this._context.parameters.subBuilding.type != null)
            output.subBuilding = this.selectedAddress?.SubBuilding

        if (this._context.parameters.address_line_1.type != null)
            output.address_line_1 = this.selectedAddress?.Line1

        if (this._context.parameters.address_line_2.type != null)
            output.address_line_2 = this.selectedAddress?.Line2

        if (this._context.parameters.province_or_state.type != null)
            output.province_or_state = this.selectedAddress?.ProvinceName

        if (this._context.parameters.province_or_state_code.type != null)
            output.province_or_state_code = this.selectedAddress?.ProvinceCode

        if (this._context.parameters.POBoxNumber.type != null)
            output.POBoxNumber = this.selectedAddress?.POBoxNumber

        if (this._context.parameters.city.type != null)
            output.city = this.selectedAddress?.City

        if (this._context.parameters.postcode.type != null)
            output.postcode = this.selectedAddress?.PostalCode

        if (this._context.parameters.countryName.type != null)
            output.countryName = this.selectedAddress?.CountryName
        if (this._context.parameters.countryCodeIso2.type != null) {
            output.countryCodeIso2 = this.selectedAddress?.CountryIso2
        }

        if (this._context.parameters.countryCodeIso3.type != null)
            output.countryCodeIso3 = this.selectedAddress?.CountryIso3

        if (this._context.parameters.countryCodeNumeric.type != null)
            output.countryCodeNumeric = this.selectedAddress?.CountryIsoNumber

        return output
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
