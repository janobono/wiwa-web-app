export interface ResourceManager {
    title: string,
    codeListsTab: string,
    quantityUnitsTab: string,
    productsTab: string,
    quantityUnits: {
        id: string,
        type: string,
        unit: string,
        addQuantityUnit: string,
        editQuantityUnit: string,
        deleteQuantityUnit: string,
        loadQuantitiesError: string,
        addQuantityUnitError: string,
        editQuantityUnitError: string,
        deleteQuantityUnitTitle: string,
        deleteQuantityUnitMessage: string,
        quantityUnit: {
            title: string,
            idLabel: string,
            idPlaceholder: string,
            idRequired: string,
            typeLabel: string,
            typePlaceholder: string,
            typeRequired: string,
            unitLabel: string,
            unitPlaceholder: string,
            unitRequired: string
        }
    }
}
