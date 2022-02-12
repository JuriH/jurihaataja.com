import * as React from "react"
import "./topBar.css"
import { useStyleContext } from "../contexts/StyleProvider"

// import LanguageSwitcher from "../sub-components/LanguageSwitcher"

// Support animated scrolling on Safari as well
const scroll = require("scroll")
const page = require("scroll-doc")()

const tabItems = [
    {
        name: "Contact",
        ref: "contactRef",
    },
    {
        name: "Bio",
        ref: "bioRef",
    },
    {
        name: "Education",
        ref: "educationRef",
    },
    {
        name: "Skills",
        ref: "skillRef",
    },
    {
        name: "Socials",
        ref: "socialRef",
    },
    {
        name: "Languages",
        ref: "languageRef",
    },
]

export default function TopBar(props) {
    const [topBarOffsetY, setTopBarOffsetY] = React.useState(null)
    React.useEffect(() => {
        topBarOffsetY !== null &&
            props.callbackHeight(topBarRef.current.clientHeight)
    }, [topBarOffsetY])

    // const [scrollingInProgress, setScrollingInProgress] = React.useState(false)

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
        // console.log("Selected tab: " + selectedTab.name)
    }, [selectedTab])

    React.useEffect(() => {
        if (
            (selectedTab.name !== null,
            selectedTab.ref !== null,
            selectedTab.millis !== null)
        ) {
            scroll.top(
                page,
                tabItems[0].name === selectedTab.name
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

    // React.useEffect(() => {
    //     // console.log("Scrolling in progress: " + scrollingInProgress)
    // }, [scrollingInProgress])

    // const [mouseEnterTab, setMouseEnterTab] = React.useState(null)
    // React.useEffect(() => {
    //     // console.log("Mouse enter tab: " + mouseEnterTab)
    // }, [mouseEnterTab])
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
        // if (props.activeSections.includes(targetSection)) {
        //     // console.log("Target section reached")
        //     setTargetSection(null)
        // }
        if (props.activeSections.includes(targetSection)) {
            // console.log("Selected tab included in Active Sections")
            setTargetSection(null)
        }
        if (
            targetSection === null &&
            !props.activeSections.includes(selectedTab.name)
        ) {
            // console.log("Selected tab not included in Active Sections")
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
                paddingTop: 10,
                paddingBottom: 5,
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
                            setTargetSection(tab.name)
                            setSelectedTab({
                                ...selectedTab,
                                name: tab.name,
                                ref: tab.ref,
                                millis: new Date(),
                            })
                        }}
                        style={{
                            cursor: "pointer",
                            display: "inline-block",
                            marginLeft: 10,
                            marginRight: 10,
                            marginBottom: 5,
                        }}
                    >
                        <p
                            style={{
                                fontSize: 14,
                                backgroundColor:
                                    selectedTab.name === tab.name
                                        ? "#ccdbfd"
                                        : props.activeSections.includes(
                                              tab.name
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
                            // onMouseEnter={() => {
                            //     mouseEnterTab !== tab.name &&
                            //         setMouseEnterTab(tab.name)
                            // }}
                            // onMouseLeave={() => {
                            //     mouseEnterTab === tab.name &&
                            //         setMouseEnterTab(null)
                            // }}
                            // onTouchStart={() => {
                            //     mouseEnterTab !== tab.name &&
                            //         setMouseEnterTab(tab.name)
                            // }}
                            // onTouchEnd={() => {
                            //     mouseEnterTab === tab.name &&
                            //         setMouseEnterTab(null)
                            // }}
                        >
                            {tab.name}
                        </p>
                    </div>
                )
            })}
            {/* <div
                style={{
                    position: "fixed",
                    top: window.innerHeight / 2,
                    backgroundColor: "red",
                    height: 1,
                    width: "100vw",
                }}
            ></div> */}
            {/* <LanguageSwitcher /> */}
        </div>
    )
}
