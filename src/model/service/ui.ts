export interface ApplicationProperties {
    defaultLocale: string,
    appTitle: string,
    appDescription: string,
    tokenExpiresIn: number
}

export interface ApplicationImage {
    fileName: string,
    thumbnail: string
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
