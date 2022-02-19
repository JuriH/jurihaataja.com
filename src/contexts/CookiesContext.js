import * as React from "react"
import Cookies from "universal-cookie"

const CookiesContext = React.createContext()

export function useCookiesContext() {
    return React.useContext(CookiesContext)
}

export function CookiesProvider({ children }) {
    const cookies = new Cookies()
    const cookiesConsentName = "cookies_consent"

    return (
        <CookiesContext.Provider
            value={{
                cookies: cookies,
                cookiesConsentName: cookiesConsentName,
            }}
        >
            {children}
        </CookiesContext.Provider>
    )
}
