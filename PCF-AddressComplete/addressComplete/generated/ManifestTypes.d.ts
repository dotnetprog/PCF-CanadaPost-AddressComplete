/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    api_key: ComponentFramework.PropertyTypes.StringProperty;
    useProvinceCode: ComponentFramework.PropertyTypes.EnumProperty<"Yes" | "No">;
    country_code: ComponentFramework.PropertyTypes.StringProperty;
    option_allowcountry: ComponentFramework.PropertyTypes.StringProperty;
    option_showlogo: ComponentFramework.PropertyTypes.StringProperty;
    address_line_1: ComponentFramework.PropertyTypes.StringProperty;
    address_line_2: ComponentFramework.PropertyTypes.StringProperty;
    province_or_state: ComponentFramework.PropertyTypes.StringProperty;
    city: ComponentFramework.PropertyTypes.StringProperty;
    postcode: ComponentFramework.PropertyTypes.StringProperty;
    country: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    address_line_1?: string;
    address_line_2?: string;
    province_or_state?: string;
    city?: string;
    postcode?: string;
    country?: string;
}
