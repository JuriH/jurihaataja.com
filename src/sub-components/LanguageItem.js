import * as React from "react"
import calculateAspectRatioFit from "../utils/calculateAspectRatio"
import "./languageItem.css"

import { useLanguageContext } from "../contexts/LanguageProvider"

const text = {
    language: {
        finnish: {
            en: "Finnish",
            fi: "Suomi",
        },
        english: {
            en: "English",
            fi: "Englanti",
        },
        swedish: {
            en: "Swedish",
            fi: "Ruotsi",
        },
    },
    rating: {
        native: {
            en: "Native",
            fi: "Äidinkieli",
        },
        excellent: {
            en: "Excellent",
            fi: "Erinomainen",
        },
        good: {
            en: "Good",
            fi: "Hyvä",
        },
        basics: {
            en: "Basics",
            fi: "Perusteet",
        },
    },
}

export default function LanguageItem(props) {
    const languageContext = useLanguageContext()
    const keepAspectRatioSize = calculateAspectRatioFit(1191, 793.92, 50, 50)
    return (
        <div
            style={{
                display: "flex",
                flex: 1,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <img
                    src={props.flag}
                    alt={props.text}
                    style={{
                        width: keepAspectRatioSize.width,
                        height: keepAspectRatioSize.height,
                        marginRight: 15,
                        borderRadius: 5,
                        overflow: "hidden",
                        border: "1px solid #e9ecef",
                    }}
                />
                <p
                    className={languageContext.className}
                    style={{ marginRight: 15 }}
                >
                    {
                        text.language[props.text.toLowerCase()][
                            languageContext.language
                        ]
                    }
                </p>
            </div>
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {Object.keys(props.rating).map((item, index) => (
                    <p
                        className={languageContext.className}
                        key={"languageItem" + index}
                        style={{ flex: 1, textAlign: "center" }}
                    >
                        {
                            text.rating[props.rating[item].toLowerCase()][
                                languageContext.language
                            ]
                        }
                    </p>
                ))}
            </div>
        </div>
    )
}
