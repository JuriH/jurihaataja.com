import * as React from "react"

import "./App.css"

import TopBar from "./navigation/TopBar"
import Contact from "./components/Contact"
import Bio from "./components/Bio"
import Skills from "./components/Skills"
import Socials from "./components/Socials"
import Languages from "./components/Languages"

import ArrowUp from "./components/ArrowUp"

import Footer from "./components/Footer"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useWindowDimensionsContext } from "./contexts/WindowDimensionsProvider"

import InView from "react-intersection-observer"

function App() {
    const [selectedTab, setSelectedTab] = React.useState({
        name: null,
        millis: new Date(),
    })

    function updateSelectedTab(tabName) {
        setSelectedTab({
            ...selectedTab,
            name: tabName,
            millis: new Date(),
        })
    }

    const windowDimensions = useWindowDimensionsContext()

    // Window's offset from the top of the document
    const [offsetTop, setOffsetTop] = React.useState(0)
    React.useEffect(() => {
        // console.log(offsetTop)
    }, [offsetTop])

    // Top navigation bar's height
    const [topBarBottomMargin, setTopBarBottomMargin] = React.useState(0)

    const contactRef = React.useRef(null)
    const bioRef = React.useRef(null)
    const skillRef = React.useRef(null)
    const socialRef = React.useRef(null)
    const languageRef = React.useRef(null)

    const [activeSections, setActiveSections] = React.useState([])
    React.useEffect(() => {
        console.log("Active sections: " + JSON.stringify(activeSections))
    }, [activeSections])

    function addToActiveSectionArr(toAdd) {
        if (activeSections.includes(toAdd)) return
        setActiveSections([...activeSections, toAdd])
    }

    function removeFromActiveSectionArr(toRemove) {
        if (!activeSections.includes(toRemove)) return
        let arrCopy = Array.from(activeSections)
        const removeIndex = arrCopy.indexOf(toRemove)
        arrCopy.splice(removeIndex, 1)
        setActiveSections(arrCopy)
    }

    function TopBarBottomMargin(height) {
        // console.log("TopBarBottomMargin: " + height)
        setTopBarBottomMargin(height)
    }

    function handleScroll() {
        const scrollTop = window.pageYOffset
        setOffsetTop(scrollTop)
    }

    function handleRightClick(e) {
        // console.log(e.target.nodeName)
        e.preventDefault()
    }

    // Scrolling listener
    React.useEffect(() => {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload()
            }
        }
        window.addEventListener("scroll", handleScroll)
        document.addEventListener("contextmenu", (e) => {
            handleRightClick(e)
        })
        return () => {
            window.removeEventListener("scroll", handleScroll)
            document.removeEventListener("contextmenu", (e) => {
                handleRightClick(e)
            })
        }
    }, [])

    // // On page refresh start from top of the document
    // window.onbeforeunload = function () {
    //     window.scrollTo(0, 0)
    // }

    // window.onpageshow = function (event) {
    //     if (event.persisted) {
    //         // window.location.reload()
    //         window.scrollTo(0, 0)
    //     }
    // }

    return (
        <div
            className="App"
            style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                overflow: "hidden",
            }}
        >
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
            />
            <TopBar
                refs={{
                    contactRef: contactRef,
                    bioRef: bioRef,
                    skillRef: skillRef,
                    socialRef: socialRef,
                    languageRef: languageRef,
                }}
                activeSections={activeSections}
                offsetTop={offsetTop}
                windowDimensions={windowDimensions}
                callbackHeight={(height) => {
                    TopBarBottomMargin(height)
                }}
                callbackTab={(tabName) => {
                    updateSelectedTab(tabName)
                }}
            />
            <div
                style={{
                    height: topBarBottomMargin + 25,
                }}
            />
            <InView
                as="div"
                initialInView={true}
                threshold={1}
                onChange={(inView) => {
                    if (inView) {
                        // console.log("Contact visible")
                        addToActiveSectionArr("Contact")
                    } else {
                        removeFromActiveSectionArr("Contact")
                    }
                }}
            >
                <Contact
                    ref={contactRef}
                    windowDimensions={windowDimensions}
                    selectedTab={selectedTab}
                />
            </InView>
            <InView
                as="div"
                threshold={[0.75, 1]}
                onChange={(inView) => {
                    if (inView) {
                        // console.log("Bio visible")
                        addToActiveSectionArr("Bio")
                    } else {
                        removeFromActiveSectionArr("Bio")
                    }
                }}
            >
                <Bio
                    ref={bioRef}
                    windowDimensions={windowDimensions}
                    selectedTab={selectedTab}
                />
            </InView>
            <InView
                as="div"
                threshold={0.75}
                onChange={(inView) => {
                    if (inView) {
                        // console.log("Skills visible")
                        addToActiveSectionArr("Skills")
                    } else {
                        removeFromActiveSectionArr("Skills")
                    }
                }}
            >
                <Skills
                    ref={skillRef}
                    windowDimensions={windowDimensions}
                    selectedTab={selectedTab}
                />
            </InView>
            <InView
                as="div"
                threshold={1}
                onChange={(inView) => {
                    if (inView) {
                        // console.log("Socials visible")
                        addToActiveSectionArr("Socials")
                    } else {
                        removeFromActiveSectionArr("Socials")
                    }
                }}
            >
                <Socials
                    ref={socialRef}
                    windowDimensions={windowDimensions}
                    selectedTab={selectedTab}
                />
            </InView>
            <InView
                as="div"
                threshold={1}
                onChange={(inView) => {
                    if (inView) {
                        // console.log("Languages visible")
                        addToActiveSectionArr("Languages")
                    } else {
                        removeFromActiveSectionArr("Languages")
                    }
                }}
            >
                <Languages
                    ref={languageRef}
                    windowDimensions={windowDimensions}
                    selectedTab={selectedTab}
                />
            </InView>
            <Footer />
            <ArrowUp offsetTop={offsetTop} triggerOffset={100} />
        </div>
    )
}

export default App
