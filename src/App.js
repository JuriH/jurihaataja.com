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

function App() {
    const [selectedTab, setSelectedTab] = React.useState({
        name: null,
        millis: new Date()
    })

    const windowDimensions = useWindowDimensionsContext()

    // Window's offset from the top of the document
    const [offsetTop, setOffsetTop] = React.useState(0)

    // Top navigation bar's height
    const [topBarBottomMargin, setTopBarBottomMargin] = React.useState(0)

    const contactRef = React.useRef(null)
    const bioRef = React.useRef(null)
    const skillRef = React.useRef(null)
    const socialRef = React.useRef(null)
    const languageRef = React.useRef(null)

    // const [contactDims, setContactDims] = React.useState({
    //     name: "Contact",
    //     offsetTop: null,
    //     height: null,
    // })

    // const [skillDims, setSkillDims] = React.useState({
    //     name: "Skills",
    //     offsetTop: null,
    //     height: null,
    // })

    // const [socialDims, setSocialDims] = React.useState({
    //     name: "Socials",
    //     offsetTop: null,
    //     height: null,
    // })

    // const [languageDims, setLanguageDims] = React.useState({
    //     name: "Languages",
    //     offsetTop: null,
    //     height: null,
    // })

    // React.useEffect(() => {
    //     if (contactRef)
    //         setContactDims({
    //             ...contactDims,
    //             offsetTop: contactRef.current.offsetTop,
    //             height: contactRef.current.clientHeight,
    //         })
    //     if (skillRef)
    //         console.log(
    //             skillRef.current.offsetTop +
    //                 ", " +
    //                 skillRef.current.clientHeight
    //         )
    //     setSkillDims({
    //         ...skillDims,
    //         offsetTop: skillRef.current.offsetTop,
    //         height: skillRef.current.clientHeight,
    //     })
    //     if (socialRef)
    //         setSocialDims({
    //             ...socialDims,
    //             offsetTop: socialRef.current.offsetTop,
    //             height: socialRef.current.clientHeight,
    //         })
    //     if (languageRef)
    //         setLanguageDims({
    //             ...languageDims,
    //             offsetTop: languageRef.current.offsetTop,
    //             height: languageRef.current.clientHeight,
    //         })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [contactRef, skillRef, socialRef, languageRef])

    function TopBarBottomMargin(height) {
        // console.log("TopBarBottomMargin: " + height)
        setTopBarBottomMargin(height)
    }

    function SetSelectedTab(tabObj) {
        setSelectedTab({
            ...selectedTab,
            name: tabObj.name,
            millis: tabObj.millis
        })
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
    })

    return (
        <div
            className="App"
            style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                overflow: "hidden"
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
                    languageRef: languageRef
                }}
                // dims={{
                //     contactDims: contactDims,
                //     skillDims: skillDims,
                //     socialDims: socialDims,
                //     languageDims: languageDims,
                // }}
                offsetTop={offsetTop}
                windowDimensions={windowDimensions}
                callbackHeight={(height) => {
                    TopBarBottomMargin(height)
                }}
                callbackTab={(tabName) => {
                    SetSelectedTab(tabName)
                }}
            />
            <div
                style={{
                    height: topBarBottomMargin + 25
                }}
            />
            <Contact
                ref={contactRef}
                windowDimensions={windowDimensions}
                selectedTab={selectedTab}
            />
            <Bio
                ref={bioRef}
                windowDimensions={windowDimensions}
                selectedTab={selectedTab}
            />
            <Skills
                ref={skillRef}
                windowDimensions={windowDimensions}
                selectedTab={selectedTab}
            />
            <Socials
                ref={socialRef}
                windowDimensions={windowDimensions}
                selectedTab={selectedTab}
            />
            <Languages
                ref={languageRef}
                windowDimensions={windowDimensions}
                selectedTab={selectedTab}
            />
            <Footer />
            <ArrowUp offsetTop={offsetTop} triggerOffset={100} />
        </div>
    )
}

export default App
