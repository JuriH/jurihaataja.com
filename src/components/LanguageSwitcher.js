import * as React from "react"
import "./languageSwitcher.css"
import { useLanguageContext } from "../contexts/LanguageProvider"
import AnimateHeight from "react-animate-height"

const options = ["en", "fi"]
let currentOptions = []

export default function LanguageSwitcher() {
    const languageContext = useLanguageContext()

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
    // React.useEffect(() => {
    //     console.log("Revealed: " + revealed)
    // }, [revealed])

    React.useEffect(() => {
        if (selectedLanguage === languageContext) return
        setSelectedLanguage(languageContext.language)
    }, [languageContext.language])
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
                backgroundColor: "#c1d3feBF",
                border: "1px solid #ffffff",
                marginTop: 10,
                transition: "all 0.25s ease",
                WebkitTransition: "all 0.25s ease",
                WebkitAnimationDuration: "0.25s",
                animationDuration: "0.25s",
            }}
        >
            <div
                style={{
                    zIndex: 1002,
                    width: 50,
                    minHeight: 0,
                    borderRadius: 50,
                }}
                onClick={() => {
                    selectedLanguageIndicatorVisible && setRevealed(!revealed)
                }}
            >
                <AnimateHeight
                    duration={300}
                    height={revealed ? "auto" : 0}
                    onAnimationEnd={() => {}}
                >
                    {currentOptions.map((option) => (
                        <div
                            style={{ cursor: "pointer" }}
                            key={"languageOption-" + option}
                            onClick={() => {
                                if (selectedLanguageIndicatorVisible) {
                                    setSelectedLanguageIndicatorVisible(false)
                                    setRevealed(!revealed)
                                    languageContext.setLanguage(option)
                                }
                            }}
                        >
                            <p
                                className={"language-switcher-option"}
                                style={{
                                    width: 50,
                                    height: 50,
                                    margin: 0,
                                    verticalAlign: "middle", // To center text
                                    display: "table-cell", // To center text
                                    borderRadius: 50,
                                    backgroundColor: "#edf2fbBF",
                                }}
                            >
                                {option.toUpperCase()}
                            </p>
                        </div>
                    ))}
                </AnimateHeight>
            </div>
            <div
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
