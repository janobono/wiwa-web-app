export interface ApplicationImage {
    fileName: string,
    thumbnail: string
}

export interface ApplicationInfo {
    items: ApplicationInfoItem[]
}

export interface ApplicationInfoItem {
    title: string,
    text: string,
    imageFileName: string
}

export interface CompanyInfo {
    name: string,
    street: string,
    city: string,
    zipCode: string,
    state: string,
    phone: string,
    mail: string,
    businessId: string,
    taxId: string,
    vatRegNo: string,
    commercialRegisterInfo: string,
    mapUrl: string
}
