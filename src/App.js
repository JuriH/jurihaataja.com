import * as React from "react"

import "./App.css"

import TopBar from "./navigation/TopBar"
import Contact from "./components/contact/Contact"
import Bio from "./components/bio/Bio"
import Education from "./components/education/Education"
import Skills from "./components/skill/Skills"
import Socials from "./components/social/Socials"
import Languages from "./components/language/Languages"

// Floating elements
import ArrowUp from "./navigation/ArrowUp"
import LanguageSwitcher from "./components/LanguageSwitcher"

import Footer from "./components/Footer"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useWindowDimensionsContext } from "./contexts/WindowDimensionsProvider"

import InView from "react-intersection-observer"

import CookieConsentPopup from "./components/cookieConsentPopup/CookieConsentPopup"

const floatingButtonsContainerZIndex = 900

function App({ route, navigation }) {
    const [selectedTab, setSelectedTab] = React.useState({
        name: null,
        millis: new Date(),
    })

    const windowDimensions = useWindowDimensionsContext()

    // Window's offset from the top of the document
    const [offsetTop, setOffsetTop] = React.useState(0)
    React.useEffect(() => {
        // console.log(offsetTop)
    }, [offsetTop])

    // Top navigation bar's height
    const [topBarBottomMargin, setTopBarBottomMargin] = React.useState(null)
    React.useEffect(() => {
        // console.log("Top bar bottom margin: " + topBarBottomMargin)
    }, [topBarBottomMargin])

    const contactRef = React.useRef(null)
    const bioRef = React.useRef(null)
    const educationRef = React.useRef(null)
    const skillRef = React.useRef(null)
    const socialRef = React.useRef(null)
    const languageRef = React.useRef(null)

    const [activeSections, setActiveSections] = React.useState([])
    // React.useEffect(() => {
    //     console.log("Active sections: " + JSON.stringify(activeSections))
    // }, [activeSections])

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
                    educationRef: educationRef,
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
                    setSelectedTab({
                        ...selectedTab,
                        name: tabName,
                        millis: new Date(),
                    })
                }}
            />
            <div
                style={{
                    height: topBarBottomMargin + 25,
                }}
            />
            <InView
                rootMargin={`-${
                    topBarBottomMargin !== null ? topBarBottomMargin : 0
                }px 0px 0px 0px`}
                as="div"
                initialInView={true}
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
                rootMargin={`-${
                    topBarBottomMargin !== null ? topBarBottomMargin : 0
                }px 0px 0px 0px`}
                as="div"
                // threshold={[0.75, 1]}
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
                rootMargin={`-${
                    topBarBottomMargin !== null ? topBarBottomMargin : 0
                }px 0px 0px 0px`}
                as="div"
                // threshold={[0.75, 1]}
                onChange={(inView) => {
                    if (inView) {
                        // console.log("Bio visible")
                        addToActiveSectionArr("Education")
                    } else {
                        removeFromActiveSectionArr("Education")
                    }
                }}
            >
                <Education
                    activeSections={activeSections}
                    ref={educationRef}
                    windowDimensions={windowDimensions}
                    selectedTab={selectedTab}
                    topBarBottomMargin={topBarBottomMargin}
                />
            </InView>
            <InView>
                {({ inView, ref, entry }) => (
                    <Skills
                        inViewRef={ref}
                        inView={inView}
                        entry={entry}
                        offsetTop={offsetTop}
                        ref={skillRef}
                        windowDimensions={windowDimensions}
                        selectedTab={selectedTab}
                        addToActiveSectionArr={() => {
                            addToActiveSectionArr("Skills")
                        }}
                        removeFromActiveSectionArr={() => {
                            removeFromActiveSectionArr("Skills")
                        }}
                    />
                )}
            </InView>
            <InView
                rootMargin={`-${
                    topBarBottomMargin !== null ? topBarBottomMargin : 0
                }px 0px 0px 0px`}
                as="div"
                // threshold={1}
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
                rootMargin={`-${
                    topBarBottomMargin !== null ? topBarBottomMargin : 0
                }px 0px 0px 0px`}
                as="div"
                // threshold={1}
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
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    zIndex: floatingButtonsContainerZIndex,
                    position: "fixed",
                    right: 0,
                    bottom: 0,
                    paddingBottom: "5vw",
                    padding: "3.5vw",
                }}
            >
                <ArrowUp offsetTop={offsetTop} triggerOffset={100} />
                <LanguageSwitcher zIndex={floatingButtonsContainerZIndex + 1} />
            </div>
            <CookieConsentPopup />
        </div>
    )
}

export default App
