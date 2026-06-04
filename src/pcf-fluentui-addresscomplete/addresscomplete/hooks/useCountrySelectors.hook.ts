import { usePowerAppsServiceContext } from '../components'

export const useCountrySelectors = () => {
    const powerAppsService = usePowerAppsServiceContext()
    return powerAppsService.countryManager
}
