export interface HealthState {
    up: boolean,
    maintenance: boolean,
    setMaintenance: (maintenance: boolean, token?: string) => Promise<void>
}
