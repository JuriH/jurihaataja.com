import * as React from "react"
import ContactItem from "./ContactItem"
import { IoMailOutline, IoCall } from "react-icons/io5"
import ProfilePicture from "./ProfilePicture"

import { useStyleContext } from "../../contexts/StyleProvider"
import { useLanguageContext } from "../../contexts/LanguageProvider"
import "../../App.css"
import "./contact.css"

const contactItems = [
    {
        type: "email",
        text: "juri.haataja@hotmail.com",
        icon: IoMailOutline,
    },
    {
        type: "phone",
        text: "+358 400 600 643",
        icon: IoCall,
    },
]

const text = {
    header: {
        en: "Contact",
        fi: "Yhteystiedot",
    },
}

const Contact = React.forwardRef((props, ref) => {
    const languageContext = useLanguageContext()
    const styleContext = useStyleContext()
    const [enableHighlight, setEnableHighlight] = React.useState(false)

    React.useEffect(() => {
        if (
            props.selectedTab.name === "Contact" &&
            props.selectedTab.millis !== 0 &&
            !enableHighlight
        ) {
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
                marginBottom: 25,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 10,
                width: props.windowDimensions.width > 500 ? 500 : "75vw",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f8f9fa",
            }}
        >
            <p
                className={languageContext.className}
                style={{
                    backgroundColor: enableHighlight
                        ? styleContext.content.title.highlighted.backgroundColor
                        : "transparent",
                    transition: "all .25s ease",
                    WebkitTransition: "all .25s ease",
                    MozTransition: "all .25s ease",
                    WebkitAnimationDuration: ".25s",
                    display: "inline-block",
                    padding: 10,
                    borderRadius: 10,
                    color: styleContext.content.header.color,
                }}
            >
                {text.header[languageContext.language]}
            </p>
            <div
                style={{
                    display: "flex",
                    width: props.windowDimensions.width > 500 ? 500 : "75vw",
                    flexDirection:
                        props.windowDimensions.width > 500 ? "row" : "column",
                    justifyContent: "space-between",
                }}
            >
                <ProfilePicture />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignSelf: "center",
                    }}
                >
                    {contactItems.map((item, index) => (
                        <ContactItem
                            key={"contactItem" + index}
                            type={item.type}
                            text={item.text}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
})

export default Contact
