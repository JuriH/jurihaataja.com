import * as React from "react"
import "../App.css"
import "./topBar.css"
import { useLanguageContext } from "../contexts/LanguageProvider"
import { useStyleContext } from "../contexts/StyleProvider"
import { useDarkmodeContext } from "../contexts/DarkmodeProvider"
import { useCookiesContext } from "../contexts/CookiesProvider"

// Support animated scrolling on Safari as well
const scroll = require("scroll")
const page = require("scroll-doc")()

const tabItems = [
    {
        name: {
            en: "Contact",
            fi: "Yhteystiedot",
        },
        ref: "contactRef",
    },
    {
        name: {
            en: "Bio",
            fi: "Bio",
        },
        ref: "bioRef",
    },
    {
        name: {
            en: "Education",
            fi: "Koulutus",
        },
        ref: "educationRef",
    },
    {
        name: {
            en: "Skills",
            fi: "Taidot",
        },
        ref: "skillRef",
    },
    {
        name: {
            en: "Socials",
            fi: "Sosiaaliset",
        },
        ref: "socialRef",
    },
    {
        name: {
            en: "Languages",
            fi: "Kielet",
        },
        ref: "languageRef",
    },
]
const highlightDurationMs = 450

const highlightSection = (tabName, _darkmode) => {
    console.log("darkmode: " + _darkmode)
    console.log(tabName)
    // Set highlight for section header
    document
        .querySelector(`[class*="${tabName}-container"] p`)
        .classList.add("selected-section")

    try {
        console.log("Removing highlight from previous selected tab")
        // Remove higlight from previous selected tab
        document
            .querySelector('[class*="selected-tab-' + _darkmode + '"]')
            .classList.remove(`selected-tab-${_darkmode}`)
    } catch (err) {}

    // Add highlight to current selected tab
    document
        .querySelector(`.${tabName}-tab`)
        .classList.add(`selected-tab-${_darkmode}`)

    setTimeout(() => {
        // Remove highlight for section header with delay
        document
            .querySelector(`[class*="${tabName}-container"] p`)
            .classList.remove("selected-section")
    }, highlightDurationMs)
}

const scrollToSection = (tabName, callbackTab, topBarOffsetY) => {
    scroll.top(
        page,
        tabItems[0].name.en === tabName
            ? 0
            : document.querySelector('[class*="' + tabName + '-container"]')
                  .offsetTop - topBarOffsetY,
        (err, scrollTop) => {}
    )
    callbackTab(tabName)
}

export default function TopBar(props) {
    const cookiesContext = useCookiesContext()
    const cookies = cookiesContext.cookies

    const languageContext = useLanguageContext()
    const styleContext = useStyleContext()

    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

    // Top bar's height in pixels
    const [topBarOffsetY, setTopBarOffsetY] = React.useState(null)
    React.useEffect(() => {
        topBarOffsetY !== null &&
            props.callbackHeight(topBarRef.current.clientHeight)
    }, [topBarOffsetY])

    // Automatically scroll to Contact-tab on component mount
    React.useEffect(() => {
        if (props.refs.contact !== null) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.refs.contact])

    React.useEffect(() => {
        // // console.log("topBarOffsetY: " + topBarOffsetY)
        props.callbackHeight(topBarOffsetY)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topBarOffsetY])

    const topBarRef = React.useRef(null)

    React.useEffect(() => {
        topBarRef !== null && setTopBarOffsetY(topBarRef.current.clientHeight)
    }, [topBarRef])

    // Fixes bug where on switching between dark- and lightmodes, active tabs classnames got sometimes removed from the elements
    const [initialDarkmodeState, setInitialDarkmodeState] = React.useState(
        cookies.get("darkmode") === "true" ? "dark" : "light"
    )

    return (
        <div
            ref={topBarRef}
            className={`navigation-top-bar-${darkmode ? "dark" : "light"}`}
            style={{
                ...styleContext.animations,
                userSelect: "none",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
                width: "100vw",
                backgroundColor: darkmode ? "#000814" : "#ffffff",
                boxShadow: `0px 1px ${darkmode ? "8" : "10"}px 0px ${
                    darkmode ? "#6c757dBF" : "#dee2e6"
                }`,
                paddingTop: 5,
                WebkitTapHighlightColor: "transparent", // Fixes flickering on tap on Safari iOS
            }}
        >
            {tabItems.map((tab, index) => {
                return (
                    <div
                        key={"topBarItem" + index}
                        onClick={() => {
                            highlightSection(
                                tab.name.en,
                                darkmode ? "dark" : "light"
                            )
                            scrollToSection(
                                tab.name.en,
                                props.callbackTab,
                                topBarOffsetY
                            )
                        }}
                        style={{
                            justifyContent: "flex-start",
                            cursor: "pointer",
                            display: "inline-block",
                            marginLeft: 10,
                            marginRight: 10,
                            marginBottom: 5,
                        }}
                    >
                        <p
                            /** Load initial darkmode status from cookies, default to light  */
                            className={`mode-${initialDarkmodeState} animate ${tab.name.en}-tab`}
                            style={{
                                fontSize: 14,
                                padding: 10,
                                borderRadius: 15,
                                border: "2px solid transparent",
                                transition: "all .5s ease",
                                WebkitTransition: "all .5s ease",
                                MozTransition: "all .5s ease",
                                margin: 0,
                                color: darkmode ? "#ffffff" : "#000000",
                            }}
                        >
                            {tab.name[languageContext.language]}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
