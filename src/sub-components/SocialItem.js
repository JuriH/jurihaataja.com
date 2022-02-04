import * as React from "react"

export default function SocialItem(props) {
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
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "center",
                // Highlight on mouse event
                backgroundColor: mouseOver ? "#e2eafc" : "transparent",
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
                <props.icon size={35} />
            </div>
        </div>
    )
}
