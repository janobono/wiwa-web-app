export interface ResourceManager {
    title: string,
    codeListsTab: string,
    productConfigTab: string,
    productsTab: string,
    fetchDataError: string,
    codeLists: {
        id: string,
        code: string,
        name: string,
        fetchDataError: string,
        searchCodeList: {
            title: string,
            placeholder: string
        },
        addCodeList: {
            title: string,
            error: string
        },
        editCodeList: {
            title: string,
            error: string
        },
        deleteCodeList: {
            title: string,
            message: string,
            error: string
        },
        codeListDialog: {
            title: string,
            codeLabel: string,
            codePlaceholder: string,
            codeRequired: string,
            nameLabel: string,
            namePlaceholder: string,
            nameRequired: string
        },
        codeListItems: {
            title: string,
            id: string,
            code: string,
            value: string,
            fetchDataError: string,
            addCodeListItem: {
                title: string,
                error: string
            },
            editCodeListItem: {
                title: string,
                error: string
            },
            moveUpCodeListItem: {
                title: string,
                error: string
            },
            moveDownCodeListItem: {
                title: string,
                error: string
            },
            deleteCodeListItem: {
                title: string,
                message: string,
                error: string
            },
            codeListItemDialog: {
                title: string,
                codeLabel: string,
                codePlaceholder: string,
                codeRequired: string,
                valueLabel: string,
                valuePlaceholder: string,
                valueRequired: string
            }
        },
    },
    productConfig: {
        vatRate: {
            title: string,
            required: string,
            error: string
        },
        productCategories: {
            title: string
        },
        boardCategory: {
            title: string
        },
        edgeCategory: {
            title: string
        },
        serviceCategory: {
            title: string
        },
        searchCategories: {
            title: string
        }
    },
    products: {
        id: string,
        code: string,
        name: string,
        stockStatus: string,
        fetchDataError: string,
        addProduct: string,
        editProduct: string,
        searchProduct: {
            title: string,
            placeholder: string
        },
        deleteProduct: {
            title: string,
            message: string,
            error: string
        },
        product: {
            title: string,
            codeLabel: string,
            codePlaceholder: string,
            codeRequired: string,
            nameLabel: string,
            namePlaceholder: string,
            nameRequired: string,
            stockStatusLabel: string,
            stockStatusPlaceholder: string,
            stockStatusRequired: string,
            descriptionLabel: string,
            descriptionPlaceholder: string,
            confirm: string,
            back: string,
            attributes: {
                title: string
            },
            quantities: {
                title: string,
                salePlaceholder: string,
                weightPlaceholder: string,
                netWeightPlaceholder: string,
                lengthPlaceholder: string,
                widthPlaceholder: string,
                thicknessPlaceholder: string
            },
            unitPrices: {
                title: string,
                validFrom: string,
                price: string,
                confirm: string,
                confirmDataError: string,
                addPrice: {
                    title: string,
                    validFrom: string,
                    validFromRequired: string,
                    value: string,
                    valueRequired: string,
                    unit: string,
                    unitPlaceholder: string
                }
                deletePrice: {
                    title: string,
                    message: string
                }
            },
            images: {
                title: string,
                addImage: {
                    title: string,
                    fileLabel: string,
                    filePlaceholder: string,
                    fileRequired: string,
                    fileFormat: string,
                    error: string
                },
                deleteImage: {
                    title: string,
                    message: string,
                    error: string
                }
            },
            categoryItems: {
                title: string
            },
            fetchDataError: string
        }
    }
}
