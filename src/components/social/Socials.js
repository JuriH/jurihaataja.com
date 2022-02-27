import * as React from "react"
import SocialItem from "./SocialItem"
import { IoLogoLinkedin, IoLogoGithub } from "react-icons/io5"
import { useStyleContext } from "../../contexts/StyleProvider"
import { useLanguageContext } from "../../contexts/LanguageProvider"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"

const text = {
    header: {
        en: "Socials",
        fi: "Sosiaaliset",
    },
}

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
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode
    const languageContext = useLanguageContext()
    const styleContext = useStyleContext()
    const [enableHighlight, setEnableHighlight] = React.useState(false)

    React.useEffect(() => {
        props.inViewCallback(props.inView)
    }, [props.inView])

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
            className="Socials-container"
            ref={ref}
            style={{
                // ...styleContext.animations,
                marginTop: 25,
                marginBottom: 25,
                backgroundColor:
                    styleContext.content.subcontainer.backgroundColor[darkmode],
                // paddingTop: 10, // To compensate with added padding in section title for highlighting effect
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 10,
                width: props.windowDimensions.width > 500 ? 500 : "75vw",
            }}
        >
            <div ref={props.inViewRef}>
                <p
                    className={languageContext.className}
                    style={{
                        transition: "all .5s ease",
                        WebkitTransition: "all .5s ease",
                        MozTransition: "all .5s ease",
                        WebkitAnimationDuration: ".5s",
                        display: "inline-block",
                        padding: 10,
                        borderRadius: 10,
                        color: styleContext.content.subcontainer.title[
                            darkmode
                        ],
                    }}
                >
                    {text.header[languageContext.language]}
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
