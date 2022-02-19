import * as React from "react"
import { useCookiesContext } from "../contexts/CookiesContext"

let timeout = null
const animClassName = "animate-language"

function getLanguageFromBrowser() {
    let lang = navigator.language || navigator.userLanguage
    // Language may be in format 'en-EN', currently only need the first part
    return lang.includes("-") ? lang.substring(0, lang.indexOf("-")) : lang
}

function getInitialLanguage(cookies) {
    // Check for language-cookie
    const languageFromCookie = cookies.get("language")
    if (languageFromCookie !== undefined) return languageFromCookie
    // Get language from browser
    const languageFromBrowser = getLanguageFromBrowser()
    if (languageFromBrowser !== undefined && languageFromBrowser !== null)
        return languageFromBrowser
    // Default to English
    return "en"
}

const LanguageContext = React.createContext()

export function useLanguageContext() {
    return React.useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
    const cookiesContext = useCookiesContext()
    const cookies = cookiesContext.cookies
    const [language, setLanguage] = React.useState(getInitialLanguage(cookies))

    React.useEffect(() => {
        document.body.querySelectorAll(`.${animClassName}`).forEach((item) => {
            item.style.opacity = 1
        })
    }, [language])

    function updateLanguage(lang) {
        // Store selected language in language-cookie only if user has allowed cookies
        if (cookies.get("cookies_consent") === true) {
            // Store selected language in persistent cookie (30-days lifetime)
            let future = new Date()
            future.setDate(future.getDate() + 30)

            cookies.set("language", lang, {
                expires: future,
                secure:
                    !process.env.NODE_ENV ||
                    process.env.NODE_ENV === "development"
                        ? false
                        : true,
            })
        }

        // Animate language change in the UI, starting with fade out
        document.body.querySelectorAll(`.${animClassName}`).forEach((item) => {
            item.style.opacity = 0
        })

        // Set delay for animated text fade in
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(() => {
            setLanguage(lang)
        }, 450)
    }

    return (
        <LanguageContext.Provider
            value={{
                language: language,
                className: animClassName,
                setLanguage: (lang) => {
                    updateLanguage(lang)
                },
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}
