export interface ResourceCustomer {
    orderCriteria: {
        createdFromLabel: string,
        createdToLabel: string
    },
    orders: {
        comments: {
            title: string
        },
        deleteOrder: {
            title: string,
            message: string
        },
        deleteOrderItem: {
            title: string,
            message: string
        }
    }
}

export interface CustomerResourceState {
    resource?: ResourceCustomer
}
