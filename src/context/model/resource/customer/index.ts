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
        }
    }
}
