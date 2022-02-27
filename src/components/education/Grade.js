import * as React from "react"
import { useLanguageContext } from "../../contexts/LanguageProvider"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"
import getColoredGradeBackground from "../../utils/education/getColoredGradeBackground"

const text = {
    header: {
        en: "Grade",
        fi: "Arvosana",
    },
}

export default function Grade(props) {
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

    const languageContext = useLanguageContext()

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: props.padding.left,
                paddingRight: props.padding.right,
            }}
        >
            <p
                className={`${
                    languageContext.className
                } education-carousel-item-key-${darkmode ? "dark" : "light"}`}
                style={{
                    margin: 0,
                    fontSize: props.fontSize.text,
                    // color: props.style.content.header.color,
                    alignSelf: "center",
                }}
            >
                {text.header[languageContext.language]}
            </p>
            <p
                className={languageContext.className}
                style={{
                    margin: 0,
                    fontSize: props.fontSize.text,
                    color: darkmode ? "#343a40" : "#f8f9fa", // Same color as the div's background-color
                    backgroundColor: getColoredGradeBackground(props.grade),
                    alignSelf: "center",
                    padding: 5,
                    borderRadius: 5,
                }}
            >
                {props.grade === null ? "Completed" : props.grade + " / 5"}
            </p>
        </div>
    )
}
