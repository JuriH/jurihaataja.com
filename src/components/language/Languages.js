import * as React from "react"
import LanguageItem from "./LanguageItem"
import { useStyleContext } from "../../contexts/StyleProvider"

import { FaKeyboard } from "react-icons/fa"
import { IoChatbubbleEllipses } from "react-icons/io5"

import { useLanguageContext } from "../../contexts/LanguageProvider"

const text = {
    header: {
        en: "Languages",
        fi: "Kielet",
    },
}

const languageItems = [
    {
        text: "Finnish",
        flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/FI.svg",
        rating: {
            speak: "Native",
            write: "Native",
        },
    },
    {
        text: "English",
        flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg",
        rating: {
            speak: "Good",
            write: "Excellent",
        },
    },
    {
        text: "Swedish",
        flag: "http://purecatamphetamine.github.io/country-flag-icons/3x2/SE.svg",
        rating: {
            speak: "Basics",
            write: "Basics",
        },
    },
]

const Languages = React.forwardRef((props, ref) => {
    const languageContext = useLanguageContext()
    const styleContext = useStyleContext()
    const [enableHighlight, setEnableHighlight] = React.useState(false)

    React.useEffect(() => {
        if (props.selectedTab.name === "Languages" && !enableHighlight) {
            setEnableHighlight(true)
            setTimeout(() => {
                setEnableHighlight(false)
            }, 450)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedTab.millis])

    return (
        <div
            ref={ref}
            style={{
                marginTop: 25,
                marginBottom: 25,
                backgroundColor: "#f8f9fa",
                paddingTop: 10, // To compensate with added padding in section title for highlighting effect
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 10,
                width: props.windowDimensions.width > 500 ? 500 : "75vw",
            }}
        >
            <p
                className={languageContext.className}
                style={{
                    backgroundColor: enableHighlight
                        ? styleContext.content.title.highlighted.backgroundColor
                        : "transparent",
                    transition: "all .5s ease",
                    WebkitTransition: "all .5s ease",
                    MozTransition: "all .5s ease",
                    WebkitAnimationDuration: ".5s",
                    display: "inline-block",
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                {text.header[languageContext.language]}
            </p>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1 }} />
                <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                    <div style={{ flex: 1 }}>
                        <IoChatbubbleEllipses />
                    </div>
                    <div style={{ flex: 1 }}>
                        <FaKeyboard />
                    </div>
                </div>
            </div>
            {languageItems.map((item) => {
                return (
                    <LanguageItem
                        key={item.text}
                        text={item.text}
                        flag={item.flag}
                        rating={item.rating}
                    />
                )
            })}
        </div>
    )
})

export default Languages
