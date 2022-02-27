import * as React from "react"

import "./App.css"

import TopBar from "./navigation/TopBar"
import Contact from "./components/contact/Contact"
import Bio from "./components/bio/Bio"

import Education from "./components/education/Education"
import { educations } from "./resources/educations"

import Skills from "./components/skill/Skills"
import Socials from "./components/social/Socials"
import Languages from "./components/language/Languages"

// Floating elements
import ArrowUp from "./navigation/ArrowUp"
import LanguageSwitcher from "./components/LanguageSwitcher"
import DarkmodeSwitcher from "./components/darkmode/DarkmodeSwitcher"

import Footer from "./components/Footer"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useWindowDimensionsContext } from "./contexts/WindowDimensionsProvider"

import InView from "react-intersection-observer"

import CookieConsentPopup from "./components/cookieConsentPopup/CookieConsentPopup"

import { useStyleContext } from "./contexts/StyleProvider"
import { useDarkmodeContext } from "./contexts/DarkmodeProvider"

const floatingButtonsContainerZIndex = 900

export default function App({ route, navigation }) {
    const styleContext = useStyleContext()
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

    const [selectedTab, setSelectedTab] = React.useState({
        name: null,
        millis: new Date(),
    })

    const windowDimensions = useWindowDimensionsContext()

    // Window's offset from the top of the document
    const [offsetTop, setOffsetTop] = React.useState(0)

    // Top navigation bar's height
    const [topBarBottomMargin, setTopBarBottomMargin] = React.useState(null)
    React.useEffect(() => {
        // console.log("Top bar bottom margin: " + topBarBottomMargin)
    }, [topBarBottomMargin])

    /**
     * References for sections
     */
    const contactRef = React.useRef(null)
    const bioRef = React.useRef(null)
    const educationRef = React.useRef(null)
    const skillRef = React.useRef(null)
    const socialRef = React.useRef(null)
    const languageRef = React.useRef(null)

    function TopBarBottomMargin(height) {
        setTopBarBottomMargin(height)
    }

    function handleScroll() {
        const scrollTop = window.pageYOffset
        setOffsetTop(scrollTop)
    }

    function handleRightClick(e) {
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

    /**
     * Handle Top Bar's tabs' styles when navigating the website *STARTS HERE*
     */

    function addActiveTabClass(element, mode) {
        if (!element.classList.contains(`active-tab-${mode}`)) {
            element.classList.add(`active-tab-${mode}`)
        }
    }

    function removeActiveTabClass(element, mode) {
        if (element.classList.contains(`selected-tab-${mode}`)) {
            element.classList.remove(`selected-tab-${mode}`)
        }
        element.classList.remove(`active-tab-${mode}`)
    }

    function handleSectionInView(inView, sectionName) {
        const mode = darkmode ? "dark" : "light"
        const element = document.querySelector(`.${sectionName}-tab`)
        if (inView) {
            addActiveTabClass(element, mode)
        } else {
            removeActiveTabClass(element, mode)
        }
    }

    /**
     * Handle Top Bar's tabs' styles when navigating the website *ENDS HERE*
     */

    return (
        <div
            className="App"
            style={{
                ...styleContext.animations,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                overflow: "hidden",
                backgroundColor: darkmode ? "#000814" : "#ffffff",
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
            <InView>
                {({ inView, ref, entry }) => (
                    <Contact
                        inViewRef={ref}
                        inView={inView}
                        entry={entry}
                        inViewCallback={() => {
                            handleSectionInView(inView, "Contact")
                        }}
                        ref={contactRef}
                        windowDimensions={windowDimensions}
                        selectedTab={selectedTab}
                    />
                )}
            </InView>
            <InView>
                {({ inView, ref, entry }) => (
                    <Bio
                        inViewRef={ref}
                        inView={inView}
                        entry={entry}
                        inViewCallback={() => {
                            handleSectionInView(inView, "Bio")
                        }}
                        ref={bioRef}
                        windowDimensions={windowDimensions}
                        selectedTab={selectedTab}
                    />
                )}
            </InView>
            <InView>
                {({ inView, ref, entry }) => (
                    <Education
                        source={educations[0]}
                        inViewRef={ref}
                        inView={inView}
                        entry={entry}
                        inViewCallback={() => {
                            handleSectionInView(inView, "Education")
                        }}
                        ref={educationRef}
                        windowDimensions={windowDimensions}
                        selectedTab={selectedTab}
                        topBarBottomMargin={topBarBottomMargin}
                    />
                )}
            </InView>
            <InView>
                {({ inView, ref, entry }) => (
                    <Skills
                        inViewRef={ref}
                        inView={inView}
                        entry={entry}
                        inViewCallback={() => {
                            handleSectionInView(inView, "Skills")
                        }}
                        offsetTop={offsetTop}
                        ref={skillRef}
                        windowDimensions={windowDimensions}
                        selectedTab={selectedTab}
                    />
                )}
            </InView>
            <InView>
                {({ inView, ref, entry }) => (
                    <Socials
                        inViewRef={ref}
                        inView={inView}
                        entry={entry}
                        inViewCallback={() => {
                            handleSectionInView(inView, "Socials")
                        }}
                        ref={socialRef}
                        windowDimensions={windowDimensions}
                        selectedTab={selectedTab}
                    />
                )}
            </InView>
            <InView>
                {({ inView, ref, entry }) => (
                    <Languages
                        inViewRef={ref}
                        inView={inView}
                        entry={entry}
                        inViewCallback={() => {
                            handleSectionInView(inView, "Languages")
                        }}
                        ref={languageRef}
                        windowDimensions={windowDimensions}
                        selectedTab={selectedTab}
                    />
                )}
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
                    marginBottom: "5vw",
                    margin: "3.5vw",
                    pointerEvents: "none",
                    touchAction: "none",
                }}
            >
                <ArrowUp offsetTop={offsetTop} triggerOffset={100} />
                <LanguageSwitcher zIndex={floatingButtonsContainerZIndex + 1} />
                <DarkmodeSwitcher />
            </div>
            <CookieConsentPopup />
        </div>
    )
}
