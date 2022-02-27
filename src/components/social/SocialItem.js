import * as React from "react"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"
import { useStyleContext } from "../../contexts/StyleProvider"

export default function SocialItem(props) {
    const styleContext = useStyleContext()
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

    return (
        <div
            className={`link-${darkmode ? "dark" : "light"}`}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "center",
                // Highlight on mouse event
                // backgroundColor: mouseOver ? "#e2eafc" : "transparent",
                padding: 8,
                borderRadius: 5,
                transition: "all .5s ease",
                WebkitTransition: "all .5s ease",
                MozTransition: "all .5s ease",
            }}
            onMouseOver={MouseOver}
            onMouseOut={MouseOut}
            onMouseUp={MouseOut}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}
                onClick={() => {
                    window.open(props.link)
                }}
            >
                {/* <div style={{ paddingRight: 15 }}>{props.link}</div> */}
                <props.icon
                    size={35}
                    style={{
                        color: styleContext.content.subcontainer.icon[darkmode],
                    }}
                />
            </div>
        </div>
    )
}
