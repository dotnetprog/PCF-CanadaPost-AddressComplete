import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class addressComplete implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	/**
	 * Empty constructor.
	 */
	constructor()
	{
		this.lib = require("./canadapost");
	}
	private default_culture:string = "fr-CA";
	private _notifyOutputChanged: () => void;
	// input element that is used to create the range slider
	private _inputElement: HTMLInputElement;
	private input_id:string;
	// Reference to the component container HTMLDivElement
	// This element contains all elements of our code component example
	private _container: HTMLDivElement;
	// Reference to PowerApps component framework Context object
	private _context: ComponentFramework.Context<IInputs>;

	// Canada post params
	private _country_code: string | null;
	private _options:any;

	//private _options: object;

	// Canada post fields
	private _address_line_1: string;
	private _address_line_2: string;
	private _provincestate: string; 
	private _city: string; 
	private _postcode: string;
	private _country: string;


	// Canadapost widget
	private lib: any;
	private Widget: any;
	private ConfigWidget:any;



	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		if(!!(<any>context.userSettings)._formattingData && !!(<any>context.userSettings)._formattingData.formatInfoCultureName )
			this.default_culture = (<any>context.userSettings)._formattingData.formatInfoCultureName;
		else{
			this.default_culture = context.userSettings.languageId == 1036 ? "fr-CA":"en-US";
		}
		this.input_id = "addresscomplete_search_"+this.Guid();
		this._context = context;
		this._notifyOutputChanged = notifyOutputChanged;
		this._container = container;
		this._address_line_1 = this._context.parameters.address_line_1.raw != null ? this._context.parameters.address_line_1.raw : "";
		this._options = {
			show_country : context.parameters.option_allowcountry.raw,
			show_logo: context.parameters.option_showlogo.raw
		};
		
		
		// Initialize the container
		this.initContainter();
		container = this._container;

		// Country code
		if (this._context.parameters.country_code.raw != null && this._context.parameters.country_code.raw != "")
			this._country_code = this._context.parameters.country_code.raw;
		else
			this._country_code = "CA"

		
		this.initAddressComplete();

	}
	private initAddressComplete():void{
		let pca:any = (<any>window).pca;
		let addressComplete = (<any>window).addressComplete;
		let fields = [   
			{ element: this.input_id, field: "", mode: pca.fieldMode.SEARCH }, 
	 
			{ element: this.input_id, field: "Line1", mode: pca.fieldMode.POPULATE },   
			
		],  
		options = {   
			key: this._context.parameters.api_key.raw,
			culture: this.default_culture,
			bar:{
				showCountry:this._options.show_country == "true",
				showLogo:this._options.show_logo == "true",
			} 
		};  
		 
		this.Widget = new pca.Address(fields, options);
		let countrycode = this._country_code;
		//this.ConfigWidget = new pca.AddressComplete();
		let w = this.Widget;
		this.Widget.setCountry(countrycode);
		this.Widget.listen('populate',(address:any) => {
			console.log(address);
			this._address_line_1 = address.Line1;
			this._address_line_2 = address.Line2;
			this._city = address.City;
			this._provincestate = address.ProvinceName;
			this._postcode = address.PostalCode;
			this._country = address.CountryName;
			this._notifyOutputChanged();
		});
		/*this.Widget.listen('ready', () => {          
			w.setCountry(countrycode);      
		});
		this.Widget.listen('load',(control:any) => {
			
			w.listen('populate',(address:any) => {
				console.log(address);
			});
		});*/
		//this.Widget.reload();
		w = this.Widget;
		console.log(w);
		
	}
	private initContainter(): void {
		this._inputElement = document.createElement("input");
		this._inputElement.setAttribute("id", this.input_id);
		this._inputElement.setAttribute("type", "text");
		this._inputElement.value = this._address_line_1;
		this._container.appendChild(this._inputElement);
	}
	private Guid(){
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		var output: { [k: string]: any } = {};

		if (this._context.parameters.address_line_1.type != null)
			output.address_line_1 = this._address_line_1;

		if (this._context.parameters.address_line_2.type != null)
			output.address_line_2 = this._address_line_2;

		if (this._context.parameters.province_or_state.type != null)
			output.province_or_state = this._provincestate;

		if (this._context.parameters.city.type != null)
			output.city = this._city;

	

		

		if (this._context.parameters.postcode.type != null)
			output.postcode = this._postcode;

		if (this._context.parameters.country.type != null)
			output.country = this._country;



		return output;
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}
