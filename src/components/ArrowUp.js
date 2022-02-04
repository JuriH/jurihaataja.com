import * as React from "react"
import { IoArrowUpOutline } from "react-icons/io5"
const scroll = require("scroll")
const page = require("scroll-doc")()

export default function ArrowUp(props) {
    const [arrowVisible, setArrowVisible] = React.useState(false)

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
            style={{
                position: "fixed",
                right: 0,
                bottom: 0,
                paddingBottom: "5vw",
                padding: "3.5vw",
                opacity: arrowVisible ? 1.0 : 0.0,
                transition: "all .4s ease",
                WebkitTransition: "all .4s ease",
                MozTransition: "all .4s ease",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    width: 50,
                    height: 50,
                    backgroundColor: "#495057",
                    cursor: "pointer",
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgb(255, 255, 255)",
                    opacity: 0.9
                }}
            >
                <IoArrowUpOutline
                    style={{
                        color: "white",
                    }}
                    size={35}
                    onClick={() => {
                        scroll.top(page, 0, (err, scrollTop) => {})
                    }}
                />
            </div>
        </div>
    )
}
