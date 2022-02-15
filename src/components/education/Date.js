import * as React from "react"
import monthNumberToString from "../../utils/monthNumberToString"
import { useLanguageContext } from "../../contexts/LanguageProvider"

const text = {
    header: {
        en: "Date",
        fi: "Päivämäärä",
    },
}

export default function Date(props) {
    const languageContext = useLanguageContext()

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
                paddingLeft: props.padding.left,
                paddingRight: props.padding.right,
                marginTop: 5,
                marginBottom: 5,
            }}
        >
            <p
                className={languageContext.className}
                style={{
                    margin: 0,
                    fontSize: props.fontSize.text,
                    color: props.style.content.header.color,
                    alignSelf: "flex-start",
                }}
            >
                {text.header[languageContext.language]}
            </p>
            <p
                className={languageContext.className}
                style={{
                    margin: 0,
                    fontSize: props.fontSize.text,
                    color: props.style.content.text.color,
                }}
            >
                {monthNumberToString(
                    props.date.getMonth(),
                    languageContext.language
                ) +
                    " - " +
                    props.date.getFullYear()}
            </p>
        </div>
    )
}
