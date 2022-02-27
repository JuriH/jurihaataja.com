import * as React from "react"
import { useCookiesContext } from "./CookiesProvider"

const DarkmodeContext = React.createContext()

export function useDarkmodeContext() {
    return React.useContext(DarkmodeContext)
}

function getInitialDarkmodeState(cookies) {
    if (cookies.get("darkmode") === "true") return true
    return false
}

export function DarkmodeProvider({ children }) {
    const cookiesContext = useCookiesContext()
    const cookies = cookiesContext.cookies

    const [darkmode, setDarkmode] = React.useState(
        getInitialDarkmodeState(cookies)
    )
    React.useEffect(() => {
        // Store darkmode-status (boolean; true/false) in darkmode-cookie only if user has allowed cookies
        if (cookies.get("cookies_consent") === "true") {
            // Store darkmode-status in persistent cookie (30-days lifetime)
            let future = new Date()
            future.setDate(future.getDate() + 30)

            cookies.set("darkmode", darkmode ? true : false, {
                expires: future,
                secure:
                    !process.env.NODE_ENV ||
                    process.env.NODE_ENV === "development"
                        ? false
                        : true,
            })
        }

        if (
            document.querySelectorAll(
                `[class*="${!darkmode ? "dark" : "light"}"]`
            ).length > 0
        ) {
            changeDarkmodeClasses()
        }
    }, [darkmode])

    function changeDarkmodeClasses() {
        // Update all active tabs
        document
            .querySelectorAll(`[class*="${!darkmode ? "dark" : "light"}"]`)
            .forEach((element) => {
                // Update every classnames' mode between dark and light
                element.classList.forEach((className) => {
                    if (className.includes(!darkmode ? "dark" : "light")) {
                        element.classList.replace(
                            className,
                            className.replace(
                                !darkmode ? "dark" : "light",
                                darkmode ? "dark" : "light"
                            )
                        )
                    }
                })
            })
    }

    return (
        <DarkmodeContext.Provider
            value={{
                darkmode: darkmode,
                toggleDarkmode: () => {
                    setDarkmode(!darkmode)
                },
            }}
        >
            {children}
        </DarkmodeContext.Provider>
    )
}
