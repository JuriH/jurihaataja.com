import * as React from "react"
import ContactItem from "../sub-components/ContactItem"
import { IoMailOutline, IoCall } from "react-icons/io5"
import ProfilePicture from "../sub-components/ProfilePicture"

import { useStyleContext } from "../contexts/StyleProvider"

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

const Contact = React.forwardRef((props, ref) => {
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
                backgroundColor: "#f8f9fa",
                // paddingTop: 10, // To compensate with added padding in section title for highlighting effect                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 10,
                display: "flex",
                width: props.windowDimensions.width > 500 ? 500 : "75vw",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <p
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
                Contact
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
