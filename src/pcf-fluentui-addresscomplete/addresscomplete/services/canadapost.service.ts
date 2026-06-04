import { addressDetailData } from '../model/addressDetailData'
import { addressSuggestionData } from '../model/addressSuggestionData'

export class CanadaResponse<TItem> {
    Items: TItem[]
}
export interface ICanadaPostService {
    retrieve: (
        query: string,
        countryCode?: string
    ) => Promise<addressSuggestionData[]>
    retrieveSubaddresses: (
        suggestion: addressSuggestionData,
        countryCode?: string
    ) => Promise<addressSuggestionData[]>
    retrieveAddressDetail: (addressId: string) => Promise<addressDetailData>
}
export class CanadaPostService implements ICanadaPostService {
    private host = 'https://ws1.postescanada-canadapost.ca'
    constructor(
        private apiKey: string,
        private _lang = 'en'
    ) {}
    public async retrieve(query: string, countryCode = 'CA') {
        const params = new URLSearchParams({
            Key: this.apiKey,
            SearchTerm: query,
            Country: countryCode,
            MaxSuggestions: '10',
            MaxResults: '10',
            LanguagePreference: this._lang,
        })
        const response = await fetch(
            `${this.host}/AddressComplete/Interactive/Find/v2.10/json3.ws?${params.toString()}`,
            { method: 'POST' }
        )
        const results =
            (await response.json()) as CanadaResponse<addressSuggestionData>
        return results.Items
    }
    public async retrieveSubaddresses(
        suggestion: addressSuggestionData,
        countryCode = 'CA'
    ) {
        const params = new URLSearchParams({
            Key: this.apiKey,
            SearchTerm: suggestion.Text,
            LastId: suggestion.Id,
            Country: countryCode,
            MaxSuggestions: '10',
            MaxResults: '10',
            LanguagePreference: this._lang,
        })
        const response = await fetch(
            `${this.host}/AddressComplete/Interactive/Find/v2.10/json3.ws?${params.toString()}`,
            { method: 'POST' }
        )
        const results =
            (await response.json()) as CanadaResponse<addressSuggestionData>
        return results.Items
    }
    public async retrieveAddressDetail(addressId: string) {
        const params = new URLSearchParams({
            Key: this.apiKey,
            Id: addressId,
        })
        const response = await fetch(
            `${this.host}/AddressComplete/Interactive/Retrieve/v2.11/json3.ws?${params.toString()}`,
            { method: 'POST' }
        )
        const result =
            (await response.json()) as CanadaResponse<addressDetailData>
        return result.Items[0]
    }
}
