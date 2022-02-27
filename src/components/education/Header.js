import * as React from "react"
import { useLanguageContext } from "../../contexts/LanguageProvider"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"

export default function Header(props) {
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

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
                className={`${
                    languageContext.className
                } education-carousel-item-key-${darkmode ? "dark" : "light"}`}
                style={{
                    fontSize: props.fontSize.mainHeader,
                    // color: darkmode ? "" : "#000814",
                    margin: 0,
                    textOverflow: "ellipsis",
                }}
            >
                {props.period[languageContext.language]}
            </p>
        </div>
    )
}
