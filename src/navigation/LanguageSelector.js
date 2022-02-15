import * as React from "react"
import Dropdown from "react-dropdown"
import { useLanguageContext } from "../contexts/LanguageProvider"
import "./languageSelector.css"

let options = ["fi", "en"]

function getLanguage() {
    let lang = navigator.language || navigator.userLanguage

    // Language may be in format 'en-EN', currently only need the first part
    lang = lang.includes("-") ? lang.substring(0, lang.indexOf("-")) : lang

    return lang
}

export default function LanguageSwitcher() {
    const languageContext = useLanguageContext()

    const [defaultOption, setDefaultOption] = React.useState(
        options.find((item) => item.value === languageContext.language).value
    )
    React.useEffect(() => {
        let optionsCopy = Array.from(options)

        // Remove language that's being moved
        const indexRemove = optionsCopy.indexOf(defaultOption)
        optionsCopy.splice(indexRemove, 1)

        // Add selected language to array's beginning
        optionsCopy.unshift(defaultOption)

        options = Array.from(optionsCopy)
    }, [defaultOption])

    React.useEffect(() => {
        setDefaultOption(
            options.find((item) => item === languageContext.language)
        )
    }, [languageContext.language])

    return (
        <div style={{ alignSelf: "flex-start", justifySelf: "flex-start" }}>
            <Dropdown
                options={options}
                onChange={(lang) => {
                    console.log(lang)
                    if (lang.value === defaultOption) return
                    languageContext.setLanguage(lang.value)
                }}
                value={defaultOption}
                placeholder="Select an option"
            />
        </div>
    )
}
