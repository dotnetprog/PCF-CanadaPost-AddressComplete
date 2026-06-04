# 🆕 PCF-CanadaPost-AddressComplete V2 🆕 - Description
A PCF that implements an address suggestion from canada post.

This custom control is basically an address auto complete that fills all the bound address fields. 

The addresses are retrieved from canada post api ,therefore you would need an api key by registering to their [website](https://www.canadapost.ca/pca/support/guides/).

> [!IMPORTANT]  
> The old documentation of the control can be found [here](addresscomplete_v1.md) 
> the old control is found in this solution location: `Solution/CanadaPostAddressComplete.zip`

here is an example:
![Alt text](/Screenshots/control_fluentui.png?raw=true "demo")

> [!NOTE]  
> Now, you can bind address composite fields such as address1_country or address1_stateorprovinve 


In the demo above, it has been used on custom text fields.

# Installation

The newest versions of the control can be found at the latest [release](https://github.com/dotnetprog/PCF-CanadaPost-AddressComplete/releases/latest)



# Customization & setup guide
### Configuration options

#### Input / Behavior

| Property | Display Name | Description | Required |
|---|---|---|---|
| `boundField` | Field to bound the control with | The field to bind the control with. | ✅ Yes |
| `apikeyEnvVarName` | API Key Environment Variable Name | The name of the environment variable that contains the Canada Post API key. | ✅ Yes |
| `searchHint` | Search Hint | The hint text to display in the search box. | No |
| `defaultcountry` | Default Country | Default country code (ISO 2 char). Ex: `CA` | No |
| `displaycountries` | Display Countries | Comma-separated list of country codes (ISO 2) to display. Ex: `CA,US,MX`. Leave empty to display all countries. | No |
| `topcountries` | Top Countries | Comma-separated list of country codes (ISO 2) to pin at the top of the country list. Ex: `CA,US,MX` | No |

#### Bound Output Fields

These fields are optional bound properties that will be populated when an address is selected.

| Property | Display Name | Description |
|---|---|---|
| `address_line_1` | Line 1 | Address line 1 |
| `address_line_2` | Line 2 | Address line 2 |
| `subBuilding` | Sub Building | Sub building (e.g. apartment/unit number) |
| `buildingNumber` | Building Number | Building number |
| `streetName` | Street Name | Street name |
| `POBoxNumber` | PO Box Number | PO Box number |
| `city` | City | City |
| `province_or_state` | Province or State | Province or state name |
| `province_or_state_code` | Province or State Code | Province or state code |
| `postcode` | Post Code | Postal / ZIP code |
| `countryName` | Country Name | Country name |
| `countryCodeIso2` | Country Code (ISO 2) | 2-character ISO country code |
| `countryCodeIso3` | Country Code (ISO 3) | 3-character ISO country code |
| `countryCodeNumeric` | Country Code (Numeric) | Numeric ISO country code |
| `fullAddress` | Full Address | Full formatted address |
| `selectedAddressId` | Selected Address ID | The selected address ID returned from Canada Post |




