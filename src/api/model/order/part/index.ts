import { Dimensions } from '../../';

export enum FrameType {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
    HORIZONTAL_LONG = 'HORIZONTAL_LONG',
    HORIZONTAL_SHORT = 'HORIZONTAL_SHORT'
}

export interface PartBasic extends Part {
    type: 'BASIC',
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

export interface PartCornerRounded extends PartCorner {
    type: 'ROUNDED',
    radius: number
}

export interface PartCornerStraight extends PartCorner {
    type: 'STRAIGHT',
    dimensions: Dimensions
}

export interface PartCorner {
    type: string,
    edgeId?: number,
}

export interface PartDuplicatedBasic extends Part {
    type: 'DUPLICATED_BASIC',
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
    type: 'DUPLICATED_FRAME',
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
    type: 'FRAME',
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

export interface Part {
    type: string
}
