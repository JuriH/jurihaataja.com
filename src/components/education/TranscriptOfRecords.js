import * as React from "react"
import { IoLink } from "react-icons/io5"
import { useLanguageContext } from "../../contexts/LanguageProvider"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"
import { isBrowser } from "react-device-detect"
import "./transcriptOfRecords.css"

const text = {
    transcriptOfRecords: {
        en: "Transcript of Records",
        fi: "Opintosuorite",
    },
}

export default function TranscriptOfRecords(props) {
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

    const languageContext = useLanguageContext()
    const [pressed, setPressed] = React.useState(false)
    const [mouseHover, setMouseHover] = React.useState(false)
    return (
        <div
            className={`transcript-of-records-${darkmode ? "dark" : "light"}`}
            style={{
                marginTop: 15,
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                // color: "#f8f9fa",
                // backgroundColor: pressed
                //     ? "#9163cb"
                //     : mouseHover
                //     ? "#b185db"
                //     : "#c19ee0",
                paddingLeft: 5,
                paddingRight: 5,
                // border: "1px solid #d7e3fcBF",
                cursor: "pointer",
                transition: "all .3s ease",
                WebkitTransition: "all .3s ease",
                MozTransition: "all .3s ease",
            }}
            onMouseOver={() => {
                isBrowser && setMouseHover(true)
            }}
            onMouseLeave={() => {
                isBrowser && setMouseHover(false)
                setPressed(false)
            }}
            onMouseDown={() => {
                isBrowser && setPressed(true)
            }}
            onMouseUp={() => {
                isBrowser && setPressed(false)
            }}
            onTouchStart={() => {
                setPressed(true)
            }}
            onTouchEnd={() => {
                setPressed(false)
            }}
            onClick={() => {
                window.open(props.transcriptOfRecords, "_blank")
            }}
        >
            <p
                // className={languageContext.className}
                style={{
                    margin: 0,
                    padding: 5,
                    paddingRight: 10,
                }}
            >
                {text.transcriptOfRecords[languageContext.language]}
            </p>
            <IoLink size={20} />
        </div>
    )
}
