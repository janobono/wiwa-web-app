import { Dimensions } from '../../';

export enum PartCornerType {
    ROUNDED = 'ROUNDED',
    STRAIGHT = 'STRAIGHT'
}

export interface PartCorner {
    type: PartCornerType,
    edgeId?: number,
}

export interface PartCornerRounded extends PartCorner {
    type: PartCornerType.ROUNDED,
    radius: number
}

export interface PartCornerStraight extends PartCorner {
    type: PartCornerType.STRAIGHT,
    dimensions: Dimensions
}

export enum PartType {
    BASIC = 'BASIC',
    DUPLICATED_BASIC = 'DUPLICATED_BASIC',
    DUPLICATED_FRAME = 'DUPLICATED_FRAME',
    FRAME = 'FRAME'
}

export enum FrameType {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
    HORIZONTAL_LONG = 'HORIZONTAL_LONG',
    HORIZONTAL_SHORT = 'HORIZONTAL_SHORT'
}

export interface Part {
    type: PartType
}

export interface PartBasic extends Part {
    type: PartType.BASIC,
    rotate: boolean,
    boardId: number,
    edgeIdA1?: number,
    edgeIdA2?: number,
    edgeIdB1?: number,
    edgeIdB2?: number,
    dimensionsTOP: Dimensions,
    cornerA1B1?: PartCorner,
    cornerA1B2?: PartCorner,
    cornerA2B1?: PartCorner,
    cornerA2B2?: PartCorner
}

export interface PartDuplicatedBasic extends Part {
    type: PartType.DUPLICATED_BASIC,
    rotate: boolean,
    boardId: number,
    boardIdBottom: number,
    edgeIdA1?: number,
    edgeIdA2?: number,
    edgeIdB1?: number,
    edgeIdB2?: number,
    dimensionsTOP: Dimensions,
    cornerA1B1?: PartCorner,
    cornerA1B2?: PartCorner,
    cornerA2B1?: PartCorner,
    cornerA2B2?: PartCorner
}

export interface PartDuplicatedFrame extends Part {
    type: PartType.DUPLICATED_FRAME,
    frameType: FrameType,
    rotate: boolean,
    boardId: number,
    boardIdA1?: number,
    boardIdA2?: number,
    boardIdB1?: number,
    boardIdB2?: number,
    edgeIdA1?: number,
    edgeIdA1I?: number,
    edgeIdA2?: number,
    edgeIdA2I?: number,
    edgeIdB1?: number,
    edgeIdB1I?: number,
    edgeIdB2?: number,
    edgeIdB2I?: number,
    dimensionsTOP: Dimensions,
    dimensionsA1?: Dimensions,
    dimensionsA2?: Dimensions,
    dimensionsB1?: Dimensions,
    dimensionsB2?: Dimensions,
    cornerA1B1?: Dimensions,
    cornerA1B2?: PartCorner,
    cornerA2B1?: PartCorner,
    cornerA2B2?: PartCorner
}

export interface PartFrame extends Part {
    type: PartType.FRAME,
    frameType: FrameType,
    boardIdA1: number,
    boardIdA2: number,
    boardIdB1: number,
    boardIdB2: number,
    edgeIdA1?: number,
    edgeIdA1I?: number,
    edgeIdA2?: number,
    edgeIdA2I?: number,
    edgeIdB1?: number,
    edgeIdB1I?: number,
    edgeIdB2?: number,
    edgeIdB2I?: number,
    dimensionsTOP: Dimensions,
    dimensionsA1: Dimensions,
    dimensionsA2: Dimensions,
    dimensionsB1: Dimensions,
    dimensionsB2: Dimensions
}
