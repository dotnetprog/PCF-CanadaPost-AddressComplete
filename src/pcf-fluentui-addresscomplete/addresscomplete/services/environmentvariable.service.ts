export interface IEnvironmentVariableService {
    getEnvironmentVariable: (name: string) => Promise<string | undefined>
}
export class EnvironmentVariableService implements IEnvironmentVariableService {
    constructor(private _webApi: ComponentFramework.WebApi) {}
    public async getEnvironmentVariable(
        name: string
    ): Promise<string | undefined> {
        // Implementation to retrieve environment variable
        const options = `?$filter=EnvironmentVariableDefinitionId/schemaname eq '${encodeURIComponent(name)}'&$select=value`
        const response = await this._webApi.retrieveMultipleRecords(
            'environmentvariablevalue',
            options
        )
        if (response.entities.length > 0) {
            return response.entities[0].value
        }
        return undefined
    }
}
export class CachedEnvironmentVariableService implements IEnvironmentVariableService {
    constructor(
        private _innerEnvironmentVariableService: IEnvironmentVariableService,
        private _storage: Storage
    ) {}
    cachePrefix = 'envVarCache_'
    private getCacheKey(name: string): string {
        return `${this.cachePrefix}${name}`
    }
    public async getEnvironmentVariable(
        name: string
    ): Promise<string | undefined> {
        // Implementation to retrieve environment variable
        const cacheKey = this.getCacheKey(name)
        const cachedValue = this._storage.getItem(cacheKey)
        if (cachedValue) {
            return cachedValue
        }
        const value =
            await this._innerEnvironmentVariableService.getEnvironmentVariable(
                name
            )
        if (value) {
            this._storage.setItem(cacheKey, value)
        }
        return value
    }
}
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
export class FakeEnvironmentVariableService implements IEnvironmentVariableService {
    public async getEnvironmentVariable(
        name: string
    ): Promise<string | undefined> {
        // Fake implementation for local development
        await delay(3000)
        return localStorage.getItem(`fakeEnvVar_${name}`) ?? ''
    }
}
