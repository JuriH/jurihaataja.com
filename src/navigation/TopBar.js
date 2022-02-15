import * as React from "react"
import "../App.css"
import "./topBar.css"
import { useLanguageContext } from "../contexts/LanguageProvider"

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

export default function TopBar(props) {
    const languageContext = useLanguageContext()
    // console.log(languageContext.language)

    const [topBarOffsetY, setTopBarOffsetY] = React.useState(null)
    React.useEffect(() => {
        topBarOffsetY !== null &&
            props.callbackHeight(topBarRef.current.clientHeight)
    }, [topBarOffsetY])

    const [targetSection, setTargetSection] = React.useState(null)
    React.useEffect(() => {
        // console.log("Target section: " + targetSection)
        if (props.activeSections.includes(targetSection)) setTargetSection(null)
    }, [targetSection])

    const [selectedTab, setSelectedTab] = React.useState({
        name: null,
        ref: null,
        millis: null,
    })

    React.useEffect(() => {
        console.log("Selected tab: " + selectedTab.name)
    }, [selectedTab])

    React.useEffect(() => {
        if (
            (selectedTab.name !== null,
            selectedTab.ref !== null,
            selectedTab.millis !== null)
        ) {
            scroll.top(
                page,
                tabItems[0].name.en === selectedTab.name
                    ? 0
                    : props.refs[selectedTab.ref].current.offsetTop -
                          topBarOffsetY,
                (err, scrollTop) => {}
            )
            props.callbackTab(selectedTab.name)
        }
    }, [selectedTab])

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

    React.useEffect(() => {
        if (props.activeSections.includes(targetSection)) {
            // console.log("Selected tab included in Active Sections")
            setTargetSection(null)
        }
        if (
            targetSection === null &&
            !props.activeSections.includes(selectedTab.name)
        ) {
            console.log("Selected tab not included in Active Sections")
            setSelectedTab({
                ...selectedTab,
                name: null,
                ref: null,
                millis: null,
            })
        }
    }, [props.activeSections])

    return (
        <div
            ref={topBarRef}
            style={{
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
                backgroundColor: "#ffffff",
                boxShadow: "0px 1px 10px 0px #dee2e6",
                // paddingLeft: 10,
                paddingTop: 5,
                // paddingBottom: 5,
                WebkitTapHighlightColor: "rgba(0,0,0,0)", // Fixes flickering on tap on Safari iOS
            }}
        >
            {tabItems.map((tab, index) => {
                return (
                    <div
                        className="tab"
                        key={"topBarItem" + index}
                        onClick={() => {
                            // console.log("Clicked tab: " + tab.name)
                            setTargetSection(tab.name.en)
                            setSelectedTab({
                                ...selectedTab,
                                name: tab.name.en,
                                ref: tab.ref,
                                millis: new Date(),
                            })
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
                            className={"animate-language"}
                            style={{
                                fontSize: 14,
                                backgroundColor:
                                    selectedTab.name === tab.name.en
                                        ? "#ccdbfd"
                                        : props.activeSections.includes(
                                              tab.name.en
                                          )
                                        ? "#e2eafcBF"
                                        : "transparent",
                                padding: 10,
                                borderRadius: 15,
                                transition: "all .5s ease",
                                WebkitTransition: "all .5s ease",
                                MozTransition: "all .5s ease",
                                margin: 0,
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
