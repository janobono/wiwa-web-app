export interface AppState {
    cookiesEnabled?: boolean,
    locale?: string,
    enableCookies: () => void,
    switchLocale: () => void,
    setDefaultLocale: (locale: string) => void
}
