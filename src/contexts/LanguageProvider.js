import * as React from "react"

const LanguageContext = React.createContext()

export function useLanguageContext() {
    return React.useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = React.useState("en")
    React.useEffect(() => {
        console.log("LanguageSwitcher", "Language: " + language)
    }, [language])

    React.useEffect(() => {
        const lang = navigator.language || navigator.userLanguage
        setLanguage(lang)
    }, [])

    function updateLanguage(lang) {
        setLanguage(lang)
    }

    return (
        <LanguageContext.Provider
            value={{
                language: language,
                setLanguage: (lang) => {
                    updateLanguage(lang)
                },
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}
