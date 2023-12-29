import { ResourceCommon } from '../resource';

export enum UnitId {
    EUR = 'EUR',
    MILLIMETER = 'MILLIMETER',
    CENTIMETER = 'CENTIMETER',
    METER = 'METER',
    KILOMETER = 'KILOMETER',
    SQUARE_METER = 'SQUARE_METER',
    MILLILITER = 'MILLILITER',
    LITER = 'LITER',
    CUBIC_METER = 'CUBIC_METER',
    SECOND = 'SECOND',
    MINUTE = 'MINUTE',
    HOUR = 'HOUR',
    DAY = 'DAY',
    GRAM = 'GRAM',
    KILOGRAM = 'KILOGRAM',
    PIECE = 'PIECE',
    PACKAGE = 'PACKAGE'
}

export interface Unit {
    id: UnitId,
    value: string
}

export const getUnitIdName = (unitId: UnitId, common?: ResourceCommon) => {
    switch (unitId) {
        case UnitId.EUR:
            return common?.unitId.eur;
        case UnitId.MILLIMETER:
            return common?.unitId.millimeter;
        case UnitId.CENTIMETER:
            return common?.unitId.centimeter;
        case UnitId.METER:
            return common?.unitId.meter;
        case UnitId.KILOMETER:
            return common?.unitId.kilometer;
        case UnitId.SQUARE_METER:
            return common?.unitId.squareMeter;
        case UnitId.MILLILITER:
            return common?.unitId.milliliter;
        case UnitId.LITER:
            return common?.unitId.liter;
        case UnitId.CUBIC_METER:
            return common?.unitId.cubicMeter;
        case UnitId.SECOND:
            return common?.unitId.second;
        case UnitId.MINUTE:
            return common?.unitId.minute;
        case UnitId.HOUR:
            return common?.unitId.hour;
        case UnitId.DAY:
            return common?.unitId.day;
        case UnitId.GRAM:
            return common?.unitId.gram;
        case UnitId.KILOGRAM:
            return common?.unitId.kilogram;
        case UnitId.PIECE:
            return common?.unitId.piece;
        case UnitId.PACKAGE:
            return common?.unitId.package;
    }
}
