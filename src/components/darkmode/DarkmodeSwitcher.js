import * as React from "react"
import { IoMoon, IoSunny } from "react-icons/io5"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"

import "./darkmodeSwitcher.css"

import { isBrowser } from "react-device-detect"

let timeout = null
const iconSize = 20

const getBackgroundColor = (mouseHover, darkmode) => {
    // console.log("Darkmode: " + darkmode + ", mouseHover: " + mouseHover)
    if (mouseHover && darkmode) return "#fcbf49"
    if (!mouseHover && darkmode) return "#ffd166"
    if (mouseHover && !darkmode) return "#343a40"
    if (!mouseHover && !darkmode) return "#495057"
}

export default function DarkmodeSwitcher() {
    const darkmodeContext = useDarkmodeContext()
    // Detect mouse hover on the Language Switcher that's used to reveal the language options
    const [mouseHover, setMouseHover] = React.useState(false)

    const [iconVisible, setIconVisible] = React.useState(
        darkmodeContext.darkmode
    )

    React.useEffect(() => {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(() => {
            setIconVisible(true)
        }, 150)
    }, [darkmodeContext])

    const iconStyle = {
        transition: "all 0.25s ease",
        WebkitTransition: "all 0.25s ease",
        WebkitAnimationDuration: "0.25s",
        animationDuration: "0.25s",
        opacity: iconVisible ? 1 : 0,
        color: !darkmodeContext.darkmode && "#e9ecef",
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                minHeight: 50,
                borderRadius: 50,
                backgroundColor: getBackgroundColor(
                    mouseHover,
                    darkmodeContext.darkmode
                ),
                border: "1px solid #ffffff",
                marginTop: 10,
                transition: "all 0.25s ease",
                WebkitTransition: "all 0.25s ease",
                WebkitAnimationDuration: "0.25s",
                animationDuration: "0.25s",
                pointerEvents: "auto",
                touchAction: "auto",
            }}
            onMouseEnter={() => {
                isBrowser && setMouseHover(true)
            }}
            onMouseMove={() => {
                isBrowser && mouseHover === null && setMouseHover(true)
            }}
            onMouseLeave={() => {
                isBrowser && setMouseHover(false)
            }}
            onClick={() => {
                setIconVisible(false)
                darkmodeContext.toggleDarkmode()
            }}
        >
            {darkmodeContext.darkmode ? (
                <IoSunny size={iconSize} style={iconStyle} />
            ) : (
                <IoMoon size={iconSize} style={iconStyle} />
            )}
        </div>
    )
}
