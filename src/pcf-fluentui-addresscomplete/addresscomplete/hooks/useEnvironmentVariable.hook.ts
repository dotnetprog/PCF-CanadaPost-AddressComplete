import { useQuery } from '@tanstack/react-query'
import { usePowerAppsServiceContext } from '../components'

export const useEnvironmentVariable = (variableName: string) => {
    const powerAppsService = usePowerAppsServiceContext()
    return useQuery({
        queryKey: ['envVariable', variableName],
        queryFn: async () => {
            return await powerAppsService.envVariableService.getEnvironmentVariable(
                variableName
            )
        },
        staleTime:0,
        cacheTime:0
    })
}
