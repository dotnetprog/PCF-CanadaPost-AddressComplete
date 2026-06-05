import { useCanadaPostService } from '../components'
import { useQuery } from '@tanstack/react-query'
import { addressSuggestionData } from '../model/addressSuggestionData'
import { SuggestionOption } from '../components/SuggestionOption'

export function useAddressSuggestions(
    query?: string,
    countryCode?: string,
    selectedSuggestion?: addressSuggestionData
) {
    const service = useCanadaPostService()
    if (selectedSuggestion) {
        return useQuery({
            queryKey: ['suggestionsById', selectedSuggestion.Id],
            queryFn: async ({ queryKey }) => {
                if (selectedSuggestion.Next !== 'Find') {
                    return []
                }

                const result =
                    await service.retrieveSubaddresses(selectedSuggestion)
                return result
            },
        })
    }
    return useQuery({
        queryKey: ['suggestions', query, countryCode],
        queryFn: async ({ queryKey }) => {
            const [_key, queryInput, queryCountry] = queryKey
            if (!queryInput) {
                return []
            }
            const result = await service.retrieve(queryInput, queryCountry)
            return result
        },
        staleTime: 0,
        cacheTime: 0,
    })
}
