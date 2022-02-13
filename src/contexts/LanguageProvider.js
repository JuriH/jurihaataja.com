import * as React from "react"

let timeout = null
const supportedLanguages = ["en", "fi"]
const animClassName = "animate-language"
const fadeAnimMs = 250 // Less than 200ms looks buggy

function getLanguage() {
    let lang = navigator.language || navigator.userLanguage

    // Language may be in format 'en-EN', currently only need the first part
    lang = lang.includes("-") ? lang.substring(0, lang.indexOf("-")) : lang

    return lang
}

const LanguageContext = React.createContext()

export function useLanguageContext() {
    return React.useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = React.useState(getLanguage())

    React.useEffect(() => {
        document.body.querySelectorAll(`.${animClassName}`).forEach((item) => {
            item.style.opacity = 1
        })
    }, [language])

    function updateLanguage(lang) {
        document.body.querySelectorAll(`.${animClassName}`).forEach((item) => {
            item.style.opacity = 0
        })
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(() => {
            setLanguage(lang)
        }, fadeAnimMs + 150)
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
