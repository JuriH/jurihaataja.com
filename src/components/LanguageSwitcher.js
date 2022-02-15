import * as React from "react"
import { useLanguageContext } from "../contexts/LanguageProvider"
import AnimateHeight from "react-animate-height"
import { isBrowser } from "react-device-detect"

const options = ["en", "fi"]
let currentOptions = []

export default function LanguageSwitcher() {
    const languageContext = useLanguageContext()

    const [mouseHoverLanguageSwitcher, setMouseHoverLanguageSwitcher] =
        React.useState(false)

    const [mouseHoverLanguageItem, setMouseHoverLanguageItem] =
        React.useState(null)
    React.useEffect(() => {
        mouseHoverLanguageItem !== null && setMouseHoverLanguageSwitcher(false)
    }, [mouseHoverLanguageItem])

    const [animatedHeightAnimComplete, setAnimatedHeightanimComplete] =
        React.useState(null)

    let timeout = null
    const [
        selectedLanguageIndicatorVisible,
        setSelectedLanguageIndicatorVisible,
    ] = React.useState(true)

    const [selectedLanguage, setSelectedLanguage] = React.useState(
        languageContext.language
    )
    React.useEffect(() => {
        currentOptions = options.filter((item) => item !== selectedLanguage)
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(() => {
            setSelectedLanguageIndicatorVisible(true)
        }, 150)
    }, [selectedLanguage])

    const [revealed, setRevealed] = React.useState(false)
    React.useEffect(() => {
        console.log("Revealed: " + revealed)
        setAnimatedHeightanimComplete(false)
    }, [revealed])

    React.useEffect(() => {
        if (selectedLanguage === languageContext) return
        setSelectedLanguage(languageContext.language)
    }, [languageContext.language])

    function test(e) {
        try {
            if (!e.target.className.startsWith("language-switcher"))
                setRevealed(false)
        } catch (err) {
            setRevealed(false)
        }
    }

    React.useEffect(() => {
        document.body.addEventListener("click", (e) => {
            test(e)
        })
        return () => {
            document.body.removeEventListener("click", (e) => {
                test(e)
            })
        }
    }, [])

    return (
        // <div
        //     className="language-switcher-container"
        //     style={{
        //         zIndex: 1001,
        //         display: "flex",
        //         flexDirection: "column",
        //         alignItems: "center",
        //         justifyContent: "center",
        //         width: 50,
        //         minHeight: 50,
        //         borderRadius: 50,
        //         backgroundColor: "#c1d3feBF",
        //         overflow: "hidden",
        //         border: "1px solid #ffffff",
        //         marginTop: 10,
        //     }}
        // >
        // <div
        //     style={{
        //         cursor: "pointer",
        //         width: 50,
        //         height: 50,
        //         display: "flex",
        //         flexDirection: "row",
        //         alignItems: "center",
        //     }}
        //     onClick={() => {
        //         setRevealed(!revealed)
        //     }}
        // >
        //     <p
        //         style={{
        //             width: 50,
        //             textAlign: "center",
        //             margin: 0,
        //             opacity: 1,
        //             fontSize: 16,
        //             color: "#212529",
        //         }}
        //     >
        //         {selectedLanguage.toUpperCase()}
        //     </p>
        // </div>
        //     <AnimateHeight duration={300} height={revealed ? "auto" : 0}>
        //         <div
        //             style={{
        //                 display: "flex",
        //                 flexDirection: "column",
        //                 width: 50,
        //                 height: 50,
        //                 borderRadius: 50,
        //                 border: "1px solid #",
        //                 backgroundColor: "#e2eafc",
        //             }}
        //         >
        //             {currentOptions.map((option) => (
        //                 <div
        //                     style={{ cursor: "pointer" }}
        //                     key={"languageOption-" + option}
        //                     onClick={() => {
        //                         setRevealed(!revealed)
        //                         languageContext.setLanguage(option)
        //                     }}
        //                 >
        //                     <p
        //                         className={"language-switcher-option"}
        //                         style={{
        //                             width: 50,
        //                             height: 50,
        //                             margin: 0,
        //                             textAlign: "center",
        //                             verticalAlign: "middle",
        //                             display: "table-cell",
        //                             borderRadius: 50,
        //                         }}
        //                     >
        //                         {option.toUpperCase()}
        //                     </p>
        //                 </div>
        //             ))}
        //         </div>
        //     </AnimateHeight>
        // </div>
        <div
            className="language-switcher-container"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: 50,
                minHeight: 50,
                borderRadius: 50,
                backgroundColor: mouseHoverLanguageSwitcher
                    ? "#abc4ffbf"
                    : "#c1d3feBF",
                border: "1px solid #ffffff",
                marginTop: 10,
                transition: "all 0.25s ease",
                WebkitTransition: "all 0.25s ease",
                WebkitAnimationDuration: "0.25s",
                animationDuration: "0.25s",
            }}
            onMouseEnter={() => {
                isBrowser && setMouseHoverLanguageSwitcher(true)
            }}
            onMouseMove={() => {
                isBrowser &&
                    mouseHoverLanguageItem === null &&
                    setMouseHoverLanguageSwitcher(true)
            }}
            onMouseLeave={() => {
                isBrowser && setMouseHoverLanguageSwitcher(false)
            }}
        >
            <div
                className="language-switcher-revealer"
                style={{
                    zIndex:
                        revealed && animatedHeightAnimComplete ? 1004 : 1002,
                    width: 50,
                    minHeight: 0,
                    borderRadius: 50,
                }}
                onClick={() => {
                    selectedLanguageIndicatorVisible && setRevealed(!revealed)
                }}
            >
                <AnimateHeight
                    className="language-switcher-animateHeight"
                    duration={300}
                    height={revealed ? "auto" : 0}
                    onAnimationEnd={() => {
                        setAnimatedHeightanimComplete(true)
                    }}
                >
                    {currentOptions.map((option, index) => (
                        <div
                            className="language-switcher-option-container"
                            style={{ cursor: "pointer" }}
                            key={"languageOption-" + option}
                            onClick={() => {
                                if (selectedLanguageIndicatorVisible) {
                                    setSelectedLanguageIndicatorVisible(false)
                                    setRevealed(!revealed)
                                    languageContext.setLanguage(option)
                                }
                            }}
                            onMouseEnter={() => {
                                isBrowser && setMouseHoverLanguageItem(index)
                            }}
                            onMouseLeave={() => {
                                isBrowser && setMouseHoverLanguageItem(null)
                            }}
                        >
                            <p
                                className={"language-switcher-option-text"}
                                style={{
                                    width: 50,
                                    height: 50,
                                    margin: 0,
                                    verticalAlign: "middle", // To center text
                                    display: "table-cell", // To center text
                                    borderRadius: 50,
                                    backgroundColor:
                                        mouseHoverLanguageItem === index
                                            ? "#b6ccfebf"
                                            : "#edf2fbBF",
                                    transition: "all 0.25s ease",
                                    WebkitTransition: "all 0.25s ease",
                                    WebkitAnimationDuration: "0.25s",
                                    animationDuration: "0.25s",
                                }}
                            >
                                {option.toUpperCase()}
                            </p>
                        </div>
                    ))}
                </AnimateHeight>
            </div>
            <div
                className="language-switcher-selected-language-container"
                style={{
                    zIndex: 1003,
                    cursor: "pointer",
                    width: 50,
                    height: 50,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 50,
                }}
                onClick={() => {
                    selectedLanguageIndicatorVisible && setRevealed(!revealed)
                }}
            >
                <p
                    className="language-switcher-selected-language-text"
                    style={{
                        width: 50,
                        textAlign: "center",
                        margin: 0,
                        opacity: selectedLanguageIndicatorVisible ? 1 : 0,
                        fontSize: 16,
                        color: "#212529",
                        transition: "all 0.25s ease",
                        WebkitTransition: "all 0.25s ease",
                        WebkitAnimationDuration: "0.25s",
                        animationDuration: "0.25s",
                    }}
                >
                    {selectedLanguage.toUpperCase()}
                </p>
            </div>
        </div>
    )
}
