# PCF-CanadaPost-AddressComplete - Description
A PCF that implements an address suggestion from canada post.

This custom control is basically an address auto complete that fills all the bound address fields. 

The addresses are retrieved from canada post api ,therefore you would need an api key by registering to their [website](https://www.canadapost.ca/pca/support/guides/).

here is an example:
![Alt text](/Screenshots/demo.png?raw=true "demo")
### Important!
Now, you can bind address composite fields such as address1_country or address1_stateorprovinve 


In the demo above, it has been used on custom text fields.

# Installation

Simply download the managed solution and import it into your CDS environment.

# Customization & setup guide
### Configuration options

*   **API Key** - api key from your canada post account. 
*   **useProvinceCode** - fills the province or state field with code instead of name. 
*   **Country code** - Default country code to use to retrieve address suggestions as user types
    
*   **Allow user to change country** - type "true" to enable this feature otherwise user cannot change the country.
*   **Enables canadapost logo** if set to "true" , It displays the address complete logo on the suggestion dropdown.
![Alt text](/Screenshots/config_sample.png?raw=true "config")
![Alt text](/Screenshots/config_sample2.png?raw=true "config 2")




