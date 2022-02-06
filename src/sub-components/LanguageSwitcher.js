import * as React from "react"
import Dropdown from "react-dropdown"
import { useLanguageContext } from "../contexts/LanguageProvider"
import "./languageSwitcher.css"

const options = ["fi", "en"]

export default function LanguageSwitcher() {
    const languageContext = useLanguageContext()

    React.useEffect(() => {
        languageContext.language === "fi" && options.reverse()
    }, [])

    const defaultOption = options[0]

    return (
        <div style={{ position: "absolute", right: 0, paddingRight: "5vw" }}>
            <Dropdown
                options={options}
                onChange={(lang) => {
                    languageContext.setLanguage(lang)
                }}
                value={defaultOption}
                placeholder="Select an option"
            />
        </div>
    )
}
