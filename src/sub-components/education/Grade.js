import * as React from "react"
import { useLanguageContext } from "../../contexts/LanguageProvider"
import getColoredGradeBackground from "../../utils/education/getColoredGradeBackground"

const text = {
    header: {
        en: "Grade",
        fi: "Arvosana",
    },
}

export default function Grade(props) {
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
                className={languageContext.className}
                style={{
                    margin: 0,
                    fontSize: props.fontSize.text,
                    color: props.style.content.header.color,
                    alignSelf: "center",
                }}
            >
                {text.header[languageContext.language]}
            </p>
            <p
                style={{
                    margin: 0,
                    fontSize: props.fontSize.text,
                    color: "#f8f9fa", // Same color as the div's background-color
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
