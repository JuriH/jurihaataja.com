import * as React from "react"
import { IoArrowUpOutline } from "react-icons/io5"
import "./arrowUp.css"

import { isBrowser, isMobile } from "react-device-detect"

const scroll = require("scroll")
const page = require("scroll-doc")()

export default function ArrowUp(props) {
    const [arrowVisible, setArrowVisible] = React.useState(false)
    // React.useEffect(() => {
    //     console.log("Arrow visible: " + arrowVisible)
    // }, [arrowVisible])

    React.useEffect(() => {
        if (props.offsetTop >= props.triggerOffset && !arrowVisible) {
            setArrowVisible(true)
            return
        }
        if (props.offsetTop < props.triggerOffset && arrowVisible) {
            setArrowVisible(false)
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.offsetTop])

    return (
        <div
            className="arrow-up-container"
            style={{
                // // Code below is from times when Language Switcher wasn't yet implemented
                // zIndex: 1000,
                // position: "fixed",
                // right: 0,
                // bottom: 0,
                // paddingBottom: "5vw",
                // padding: "3.5vw",
                opacity: arrowVisible ? 1.0 : 0.0,
                transition: "all .4s ease",
                WebkitTransition: "all .4s ease",
                MozTransition: "all .4s ease",
                cursor: arrowVisible ? "pointer" : "default",
            }}
        >
            <div
                className="arrow-up-icon-container"
                style={{
                    display: "flex",
                    flex: 1,
                    width: 50,
                    height: 50,
                    backgroundColor: "#343a40e6",
                    cursor: "pointer",
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #ffffff",
                    cursor: arrowVisible ? "pointer" : "default",
                    transition: "all .25s ease",
                    WebkitTransition: "all .25s ease",
                    MozTransition: "all .25s ease",
                    cursor: arrowVisible ? "pointer" : "default",
                }}
            >
                <IoArrowUpOutline
                    style={{
                        color: "white",
                    }}
                    size={35}
                    onClick={() => {
                        arrowVisible &&
                            scroll.top(page, 0, (err, scrollTop) => {})
                    }}
                />
            </div>
        </div>
    )
}
