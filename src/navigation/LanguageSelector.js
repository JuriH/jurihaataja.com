import * as React from "react"
import Dropdown from "react-dropdown"
import { useLanguageContext } from "../contexts/LanguageProvider"
import "./languageSelector.css"

const options = ["fi", "en"]

function getLanguage() {
    let lang = navigator.language || navigator.userLanguage

    // Language may be in format 'en-EN', currently only need the first part
    lang = lang.includes("-") ? lang.substring(0, lang.indexOf("-")) : lang

    return lang
}

export default function LanguageSwitcher() {
    const languageContext = useLanguageContext()

    const [defaultOption, setDefaultOption] = React.useState(
        languageContext.language
    )

    // React.useEffect(() => {
    //     setDefaultOption(languageContext.language)
    // }, [languageContext.language])

    return (
        <Dropdown
            options={options}
            onChange={(lang) => {
                if (lang === defaultOption) return
                languageContext.setLanguage(lang.value)
            }}
            value={defaultOption}
            placeholder="Select an option"
        />
    )
}
