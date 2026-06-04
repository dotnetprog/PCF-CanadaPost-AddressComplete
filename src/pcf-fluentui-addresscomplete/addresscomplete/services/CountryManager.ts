export class Country {
    Name: string
    ISOCode: string
}

export class CountryManager {
    CountriesList: Country[]
    defaultCountry?: Country
    constructor(
        private _res: ComponentFramework.Resources,
        defaultCountryCode?: string,
        allowedCountryCodes?: string[],
        promotedCodes?: string[]
    ) {
        this.CountriesList = [
            { Name: 'Afghanistan', ISOCode: 'AF' },
            { Name: 'Åland Islands', ISOCode: 'AX' },
            { Name: 'Albania', ISOCode: 'AL' },
            { Name: 'Algeria', ISOCode: 'DZ' },
            { Name: 'American Samoa', ISOCode: 'AS' },
            { Name: 'Andorra', ISOCode: 'AD' },
            { Name: 'Angola', ISOCode: 'AO' },
            { Name: 'Anguilla', ISOCode: 'AI' },
            { Name: 'Antarctica', ISOCode: 'AQ' },
            { Name: 'Antigua and Barbuda', ISOCode: 'AG' },
            { Name: 'Argentina', ISOCode: 'AR' },
            { Name: 'Armenia', ISOCode: 'AM' },
            { Name: 'Aruba', ISOCode: 'AW' },
            { Name: 'Australia', ISOCode: 'AU' },
            { Name: 'Austria', ISOCode: 'AT' },
            { Name: 'Azerbaijan', ISOCode: 'AZ' },
            { Name: 'Bahamas', ISOCode: 'BS' },
            { Name: 'Bahrain', ISOCode: 'BH' },
            { Name: 'Bangladesh', ISOCode: 'BD' },
            { Name: 'Barbados', ISOCode: 'BB' },
            { Name: 'Belarus', ISOCode: 'BY' },
            { Name: 'Belgium', ISOCode: 'BE' },
            { Name: 'Belize', ISOCode: 'BZ' },
            { Name: 'Benin', ISOCode: 'BJ' },
            { Name: 'Bermuda', ISOCode: 'BM' },
            { Name: 'Bhutan', ISOCode: 'BT' },
            { Name: 'Bolivia', ISOCode: 'BO' },
            { Name: 'Bosnia and Herzegovina', ISOCode: 'BA' },
            { Name: 'Botswana', ISOCode: 'BW' },
            { Name: 'Bouvet Island', ISOCode: 'BV' },
            { Name: 'Brazil', ISOCode: 'BR' },
            { Name: 'British Indian Ocean Territory', ISOCode: 'IO' },
            { Name: 'Virgin Islands, British', ISOCode: 'VG' },
            { Name: 'Brunei Darussalam', ISOCode: 'BN' },
            { Name: 'Bulgaria', ISOCode: 'BG' },
            { Name: 'Burkina Faso', ISOCode: 'BF' },
            { Name: 'Burundi', ISOCode: 'BI' },
            { Name: 'Cambodia', ISOCode: 'KH' },
            { Name: 'Cameroon', ISOCode: 'CM' },
            { Name: 'Canada', ISOCode: 'CA' },
            { Name: 'Cape Verde', ISOCode: 'CV' },
            { Name: 'Cayman Islands', ISOCode: 'KY' },
            { Name: 'Central African Republic', ISOCode: 'CF' },
            { Name: 'Chad', ISOCode: 'TD' },
            { Name: 'Chile', ISOCode: 'CL' },
            { Name: 'China', ISOCode: 'CN' },
            { Name: 'Christmas Island', ISOCode: 'CX' },
            { Name: 'Cocos (Keeling) Islands', ISOCode: 'CC' },
            { Name: 'Colombia', ISOCode: 'CO' },
            { Name: 'Comoros', ISOCode: 'KM' },
            { Name: 'Congo', ISOCode: 'CG' },
            { Name: 'Congo, The Democratic Republic of the', ISOCode: 'CD' },
            { Name: 'Cook Islands', ISOCode: 'CK' },
            { Name: 'Costa Rica', ISOCode: 'CR' },
            { Name: 'Croatia', ISOCode: 'HR' },
            { Name: 'Cuba', ISOCode: 'CU' },
            { Name: 'Cyprus', ISOCode: 'CY' },
            { Name: 'Czech Republic', ISOCode: 'CZ' },
            { Name: "Cote D'Ivoire", ISOCode: 'CI' },
            { Name: 'Denmark', ISOCode: 'DK' },
            { Name: 'Djibouti', ISOCode: 'DJ' },
            { Name: 'Dominica', ISOCode: 'DM' },
            { Name: 'Dominican Republic', ISOCode: 'DO' },
            { Name: 'Ecuador', ISOCode: 'EC' },
            { Name: 'Egypt', ISOCode: 'EG' },
            { Name: 'El Salvador', ISOCode: 'SV' },
            { Name: 'Equatorial Guinea', ISOCode: 'GQ' },
            { Name: 'Eritrea', ISOCode: 'ER' },
            { Name: 'Estonia', ISOCode: 'EE' },
            { Name: 'Swaziland', ISOCode: 'SZ' },
            { Name: 'Ethiopia', ISOCode: 'ET' },
            { Name: 'Falkland Islands (Malvinas)', ISOCode: 'FK' },
            { Name: 'Faroe Islands', ISOCode: 'FO' },
            { Name: 'Fiji', ISOCode: 'FJ' },
            { Name: 'Finland', ISOCode: 'FI' },
            { Name: 'France', ISOCode: 'FR' },
            { Name: 'French Guiana', ISOCode: 'GF' },
            { Name: 'French Polynesia', ISOCode: 'PF' },
            { Name: 'French Southern Territories', ISOCode: 'TF' },
            { Name: 'Gabon', ISOCode: 'GA' },
            { Name: 'Gambia', ISOCode: 'GM' },
            { Name: 'Georgia', ISOCode: 'GE' },
            { Name: 'Germany', ISOCode: 'DE' },
            { Name: 'Ghana', ISOCode: 'GH' },
            { Name: 'Gibraltar', ISOCode: 'GI' },
            { Name: 'Greece', ISOCode: 'GR' },
            { Name: 'Greenland', ISOCode: 'GL' },
            { Name: 'Grenada', ISOCode: 'GD' },
            { Name: 'Guadeloupe', ISOCode: 'GP' },
            { Name: 'Guam', ISOCode: 'GU' },
            { Name: 'Guatemala', ISOCode: 'GT' },
            { Name: 'Guernsey', ISOCode: 'GG' },
            { Name: 'Guinea', ISOCode: 'GN' },
            { Name: 'Guinea-Bissau', ISOCode: 'GW' },
            { Name: 'Guyana', ISOCode: 'GY' },
            { Name: 'Haiti', ISOCode: 'HT' },
            { Name: 'Heard Island and Mcdonald Islands', ISOCode: 'HM' },
            { Name: 'Holy See (Vatican City State)', ISOCode: 'VA' },
            { Name: 'Honduras', ISOCode: 'HN' },
            { Name: 'Hong Kong', ISOCode: 'HK' },
            { Name: 'Hungary', ISOCode: 'HU' },
            { Name: 'Iceland', ISOCode: 'IS' },
            { Name: 'India', ISOCode: 'IN' },
            { Name: 'Indonesia', ISOCode: 'ID' },
            { Name: 'Iran, Islamic Republic Of', ISOCode: 'IR' },
            { Name: 'Iraq', ISOCode: 'IQ' },
            { Name: 'Ireland', ISOCode: 'IE' },
            { Name: 'Isle of Man', ISOCode: 'IM' },
            { Name: 'Israel', ISOCode: 'IL' },
            { Name: 'Italy', ISOCode: 'IT' },
            { Name: 'Jamaica', ISOCode: 'JM' },
            { Name: 'Japan', ISOCode: 'JP' },
            { Name: 'Jersey', ISOCode: 'JE' },
            { Name: 'Jordan', ISOCode: 'JO' },
            { Name: 'Kazakhstan', ISOCode: 'KZ' },
            { Name: 'Kenya', ISOCode: 'KE' },
            { Name: 'Kiribati', ISOCode: 'KI' },
            { Name: 'Korea, Republic of', ISOCode: 'KR' },
            { Name: 'Kuwait', ISOCode: 'KW' },
            { Name: 'Kyrgyzstan', ISOCode: 'KG' },
            { Name: "Lao People's Democratic Republic", ISOCode: 'LA' },
            { Name: 'Latvia', ISOCode: 'LV' },
            { Name: 'Lebanon', ISOCode: 'LB' },
            { Name: 'Lesotho', ISOCode: 'LS' },
            { Name: 'Liberia', ISOCode: 'LR' },
            { Name: 'Libyan Arab Jamahiriya', ISOCode: 'LY' },
            { Name: 'Liechtenstein', ISOCode: 'LI' },
            { Name: 'Lithuania', ISOCode: 'LT' },
            { Name: 'Luxembourg', ISOCode: 'LU' },
            { Name: 'Macao', ISOCode: 'MO' },
            {
                Name: 'Macedonia, The Former Yugoslav Republic of',
                ISOCode: 'MK',
            },
            { Name: 'Madagascar', ISOCode: 'MG' },
            { Name: 'Malawi', ISOCode: 'MW' },
            { Name: 'Malaysia', ISOCode: 'MY' },
            { Name: 'Maldives', ISOCode: 'MV' },
            { Name: 'Mali', ISOCode: 'ML' },
            { Name: 'Malta', ISOCode: 'MT' },
            { Name: 'Marshall Islands', ISOCode: 'MH' },
            { Name: 'Martinique', ISOCode: 'MQ' },
            { Name: 'Mauritania', ISOCode: 'MR' },
            { Name: 'Mauritius', ISOCode: 'MU' },
            { Name: 'Mayotte', ISOCode: 'YT' },
            { Name: 'Mexico', ISOCode: 'MX' },
            { Name: 'Micronesia, Federated States of', ISOCode: 'FM' },
            { Name: 'Moldova, Republic of', ISOCode: 'MD' },
            { Name: 'Monaco', ISOCode: 'MC' },
            { Name: 'Mongolia', ISOCode: 'MN' },
            { Name: 'Montserrat', ISOCode: 'MS' },
            { Name: 'Morocco', ISOCode: 'MA' },
            { Name: 'Mozambique', ISOCode: 'MZ' },
            { Name: 'Myanmar', ISOCode: 'MM' },
            { Name: 'Namibia', ISOCode: 'NA' },
            { Name: 'Nauru', ISOCode: 'NR' },
            { Name: 'Nepal', ISOCode: 'NP' },
            { Name: 'Netherlands', ISOCode: 'NL' },
            { Name: 'Netherlands Antilles', ISOCode: 'AN' },
            { Name: 'New Caledonia', ISOCode: 'NC' },
            { Name: 'New Zealand', ISOCode: 'NZ' },
            { Name: 'Nicaragua', ISOCode: 'NI' },
            { Name: 'Niger', ISOCode: 'NE' },
            { Name: 'Nigeria', ISOCode: 'NG' },
            { Name: 'Niue', ISOCode: 'NU' },
            { Name: 'Norfolk Island', ISOCode: 'NF' },
            { Name: 'Northern Mariana Islands', ISOCode: 'MP' },
            { Name: 'Norway', ISOCode: 'NO' },
            { Name: 'Oman', ISOCode: 'OM' },
            { Name: 'Pakistan', ISOCode: 'PK' },
            { Name: 'Palau', ISOCode: 'PW' },
            { Name: 'Palestinian Territory, Occupied', ISOCode: 'PS' },
            { Name: 'Panama', ISOCode: 'PA' },
            { Name: 'Papua New Guinea', ISOCode: 'PG' },
            { Name: 'Paraguay', ISOCode: 'PY' },
            { Name: 'Peru', ISOCode: 'PE' },
            { Name: 'Philippines', ISOCode: 'PH' },
            { Name: 'Pitcairn', ISOCode: 'PN' },
            { Name: 'Poland', ISOCode: 'PL' },
            { Name: 'Portugal', ISOCode: 'PT' },
            { Name: 'Puerto Rico', ISOCode: 'PR' },
            { Name: 'Qatar', ISOCode: 'QA' },
            { Name: 'Romania', ISOCode: 'RO' },
            { Name: 'Russian Federation', ISOCode: 'RU' },
            { Name: 'RWANDA', ISOCode: 'RW' },
            { Name: 'Reunion', ISOCode: 'RE' },
            { Name: 'Saint Helena', ISOCode: 'SH' },
            { Name: 'Saint Kitts and Nevis', ISOCode: 'KN' },
            { Name: 'Saint Lucia', ISOCode: 'LC' },
            { Name: 'Saint Pierre and Miquelon', ISOCode: 'PM' },
            { Name: 'Saint Vincent and the Grenadines', ISOCode: 'VC' },
            { Name: 'Samoa', ISOCode: 'WS' },
            { Name: 'San Marino', ISOCode: 'SM' },
            { Name: 'Sao Tome and Principe', ISOCode: 'ST' },
            { Name: 'Saudi Arabia', ISOCode: 'SA' },
            { Name: 'Senegal', ISOCode: 'SN' },
            { Name: 'Serbia and Montenegro', ISOCode: 'RS' },
            { Name: 'Seychelles', ISOCode: 'SC' },
            { Name: 'Sierra Leone', ISOCode: 'SL' },
            { Name: 'Singapore', ISOCode: 'SG' },
            { Name: 'Slovakia', ISOCode: 'SK' },
            { Name: 'Slovenia', ISOCode: 'SI' },
            { Name: 'Solomon Islands', ISOCode: 'SB' },
            { Name: 'Somalia', ISOCode: 'SO' },
            { Name: 'South Africa', ISOCode: 'ZA' },
            {
                Name: 'South Georgia and the South Sandwich Islands',
                ISOCode: 'GS',
            },
            { Name: 'Spain', ISOCode: 'ES' },
            { Name: 'Sri Lanka', ISOCode: 'LK' },
            { Name: 'Sudan', ISOCode: 'SD' },
            { Name: 'Suriname', ISOCode: 'SR' },
            { Name: 'Svalbard and Jan Mayen', ISOCode: 'SJ' },
            { Name: 'Sweden', ISOCode: 'SE' },
            { Name: 'Switzerland', ISOCode: 'CH' },
            { Name: 'Syrian Arab Republic', ISOCode: 'SY' },
            { Name: 'Taiwan, Province of China', ISOCode: 'TW' },
            { Name: 'Tajikistan', ISOCode: 'TJ' },
            { Name: 'Tanzania, United Republic of', ISOCode: 'TZ' },
            { Name: 'Thailand', ISOCode: 'TH' },
            { Name: 'Timor-Leste', ISOCode: 'TL' },
            { Name: 'Togo', ISOCode: 'TG' },
            { Name: 'Tokelau', ISOCode: 'TK' },
            { Name: 'Tonga', ISOCode: 'TO' },
            { Name: 'Trinidad and Tobago', ISOCode: 'TT' },
            { Name: 'Tunisia', ISOCode: 'TN' },
            { Name: 'Turkey', ISOCode: 'TR' },
            { Name: 'Turkmenistan', ISOCode: 'TM' },
            { Name: 'Turks and Caicos Islands', ISOCode: 'TC' },
            { Name: 'Tuvalu', ISOCode: 'TV' },
            { Name: 'Uganda', ISOCode: 'UG' },
            { Name: 'Ukraine', ISOCode: 'UA' },
            { Name: 'United Arab Emirates', ISOCode: 'AE' },
            { Name: 'United Kingdom', ISOCode: 'GB' },
            { Name: 'United States Minor Outlying Islands', ISOCode: 'UM' },
            { Name: 'United States of America', ISOCode: 'US' },
            { Name: 'Virgin Islands, U.S', ISOCode: 'VI' },
            { Name: 'Uruguay', ISOCode: 'UY' },
            { Name: 'Uzbekistan', ISOCode: 'UZ' },
            { Name: 'Vanuatu', ISOCode: 'VU' },
            { Name: 'Venezuela', ISOCode: 'VE' },
            { Name: 'Viet Nam', ISOCode: 'VN' },
            { Name: 'Wallis and Futuna', ISOCode: 'WF' },
            { Name: 'Western Sahara', ISOCode: 'EH' },
            { Name: 'Yemen', ISOCode: 'YE' },
            { Name: 'Zambia', ISOCode: 'ZM' },
            { Name: 'Zimbabwe', ISOCode: 'ZW' },
        ]
            .map((c) => {
                const key = `country_${c.ISOCode}`
                const resourceVal = this._res.getString(key)
                return {
                    Name:
                        !resourceVal || resourceVal === key
                            ? c.Name
                            : resourceVal,
                    ISOCode: c.ISOCode,
                }
            })
            .filter((c) =>
                allowedCountryCodes
                    ? allowedCountryCodes.includes(c.ISOCode)
                    : true
            )
            .sort(this.sortByPromoted(promotedCodes))
        if (defaultCountryCode)
            this.defaultCountry = this.getCountryByCode(defaultCountryCode)
    }

    getCountryByName = (name: string): Country | undefined => {
        const countries: Country[] = this.CountriesList.filter(
            (c) => c.Name === name
        )
        return countries.length === 0 ? undefined : countries[0]
    }

    getCountryByCode = (code: string): Country | undefined => {
        const countries: Country[] = this.CountriesList.filter(
            (c) => c.ISOCode === code.toUpperCase()
        )
        return countries.length === 0 ? undefined : countries[0]
    }

    // Bubble up 'promoted' keys list to be on top.
    private sortByPromoted = (promoted: string[] | undefined) => {
        return function (a: Country, b: Country): number {
            const last = promoted?.length ?? 0
            const keya = a.ISOCode.toString()
            const keyb = b.ISOCode.toString()

            const ranka = promoted?.includes(keya)
                ? promoted.indexOf(keya)
                : last
            const rankb = promoted?.includes(keyb)
                ? promoted.indexOf(keyb)
                : last

            if (ranka > rankb) return 1
            if (rankb > ranka) return -1

            return 0
        }
    }
}
