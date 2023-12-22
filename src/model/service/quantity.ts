export interface QuantityUnit {
    id: string,
    type: QuantityType,
    unit: string
}

export enum QuantityType {
    MONETARY = 'MONETARY',
    DISTANCE = 'DISTANCE',
    AREA = 'AREA',
    VOLUME = 'VOLUME',
    TEMPORAL = 'TEMPORAL',
    MASS = 'MASS',
    PACK = 'PACK'
}
