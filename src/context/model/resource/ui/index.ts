export interface ResourceUi {
    confirm: {
        title: string,
        message: string
    },
    contactInfo: {
        businessId: string,
        taxId: string,
        vatRegNo: string
    }
}

export interface UiResourceState {
    resource?: ResourceUi
}
