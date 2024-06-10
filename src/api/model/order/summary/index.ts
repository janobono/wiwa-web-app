export interface OrderBoardSummary {
    id: number,
    area: number,
    boardsCount: number,
    weight: number,
    price: number,
    vatPrice: number
}

export interface OrderCutSummary {
    thickness: number,
    amount: number,
    price: number,
    vatPrice: number
}

export interface OrderEdgeSummary {
    id: number,
    length: number,
    glueLength: number,
    weight: number,
    edgePrice: number,
    edgeVatPrice: number,
    gluePrice: number,
    glueVatPrice: number
}

export interface OrderGlueSummary {
    area: number,
    price: number,
    vatPrice: number
}

export interface OrderItemBoardSummary {
    id: number,
    area: number
}

export interface OrderItemCutSummary {
    thickness: number,
    amount: number
}

export interface OrderItemEdgeSummary {
    id: number,
    length: number,
    glueLength: number
}

export interface OrderItemPartSummary {
    boardSummary: OrderItemBoardSummary[],
    edgeSummary: OrderItemEdgeSummary[],
    gluedArea: number,
    cutSummary: OrderItemCutSummary[]
}

export interface OrderItemSummary {
    partSummary: OrderItemPartSummary,
    totalSummary: OrderItemPartSummary
}

export interface OrderSummary {
    boardSummary: OrderBoardSummary[],
    edgeSummary: OrderEdgeSummary[],
    glueSummary: OrderGlueSummary,
    cutSummary: OrderCutSummary[],
    weight: number,
    total: number,
    vatTotal: number
}
