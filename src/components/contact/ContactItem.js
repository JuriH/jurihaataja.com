import * as React from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "react-toastify"
import { IoCopy } from "react-icons/io5"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"
import { isBrowser, isMobile } from "react-device-detect"

function getTypeToastMessage(type) {
    switch (type) {
        case "email":
            return "Email address copied"
        case "phone":
            return "Phone number copied"
        default:
            return "Copied"
    }
}

export default function ContactItem(props) {
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

    const [mouseOver, setMouseOver] = React.useState(false)
    React.useEffect(() => {
        // console.log("MouseOver: " + mouseOver)
    }, [mouseOver])
    function MouseOver() {
        !mouseOver && setMouseOver(true)
    }
    function MouseOut() {
        mouseOver && setMouseOver(false)
    }

    const notify = () => {
        if (darkmode) {
            toast.dark(getTypeToastMessage(props.type), {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            toast(getTypeToastMessage(props.type), {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    return (
        <div
            style={{
                display: "flex",
                flex: 1,
                // overflow: "hidden",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginBottom: 10,
                alignItems: "center",
            }}
        >
            <div
                className={`link-${darkmode ? "dark" : "light"}`}
                style={{
                    display: "inline-flex", // Align icon vertically center with text, while making container fit the content
                    cursor: "pointer",
                    alignItems: "center", // Align icon vertically center with text
                    padding: 8,
                    borderRadius: 5,
                    marginRight: 10,
                    transition: "all .5s ease",
                    WebkitTransition: "all .5s ease",
                    MozTransition: "all .5s ease",
                }}
                onMouseOver={() => {
                    isBrowser && MouseOver()
                }}
                onMouseOut={isBrowser ? MouseOut : undefined}
                onMouseUp={isBrowser ? MouseOut : undefined}
                onClick={() => {
                    window.open(
                        props.type === "email"
                            ? `mailto:${props.text}`
                            : `tel:${props.text.replace(/ /g, "")}`,
                        "_self"
                    )
                }}
            >
                <span
                    style={{
                        marginRight: 15,
                        color: darkmode ? "#adb5bd" : "#6c757d",
                    }}
                >
                    {props.text}
                </span>
                <props.icon color={darkmode ? "#f8f9fa" : "#212529"} />
            </div>
            <CopyToClipboard
                style={{
                    cursor: "pointer",
                    color: darkmode ? "#f8f9fa" : "#212529",
                    opacity: 0.75,
                    padding: 10,
                }}
                onCopy={notify}
                text={props.text.replace(/ /g, "")}
            >
                <IoCopy />
            </CopyToClipboard>
        </div>
    )
}
