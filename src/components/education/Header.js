import * as React from "react"
import { useLanguageContext } from "../../contexts/LanguageProvider"

export default function Header(props) {
    const languageContext = useLanguageContext()
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: props.fontSize.mainHeader * 1.5 * 3,
            }}
        >
            <p
                className={languageContext.className}
                style={{
                    fontSize: props.fontSize.mainHeader,
                    color: props.style.content.header.color,
                    margin: 0,
                    textOverflow: "ellipsis",
                }}
            >
                {props.period[languageContext.language]}
            </p>
        </div>
    )
}
