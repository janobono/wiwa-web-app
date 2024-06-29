export interface ResourceCustomer {
    orderCriteria: {
        createdFromLabel: string,
        createdToLabel: string
    },
    orderCommentDialog: {
        title: string,
        valueLabel: string,
        valuePlaceholder: string,
        valueRequired: string
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
