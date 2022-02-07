import * as React from "react"
import SocialItem from "../sub-components/SocialItem"
import { IoLogoLinkedin, IoLogoGithub } from "react-icons/io5"
import { useStyleContext } from "../contexts/StyleProvider"

const socialItems = [
    {
        link: "https://www.linkedin.com/in/juri-haataja-618044185/",
        icon: IoLogoLinkedin,
    },
    {
        link: "https://github.com/JuriH",
        icon: IoLogoGithub,
    },
]

const Socials = React.forwardRef((props, ref) => {
    const styleContext = useStyleContext()
    const [enableHighlight, setEnableHighlight] = React.useState(false)

    React.useEffect(() => {
        if (props.selectedTab.name === "Socials" && !enableHighlight) {
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
                // paddingTop: 10, // To compensate with added padding in section title for highlighting effect
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 10,
                width: props.windowDimensions.width > 500 ? 500 : "75vw",
            }}
        >
            <div>
                <p
                    style={{
                        backgroundColor: enableHighlight
                            ? styleContext.content.title.highlighted
                                  .backgroundColor
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
                    Socials
                </p>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {socialItems.map((item) => (
                        <SocialItem
                            key={item.link}
                            link={item.link}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
})

export default Socials
