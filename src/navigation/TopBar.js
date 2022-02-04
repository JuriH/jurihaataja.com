import * as React from "react"
import { useStyleContext } from "../contexts/StyleProvider"

// Support animated scrolling on Safari as well
const scroll = require("scroll")
const page = require("scroll-doc")()

const tabItemRefs = [
    "contactRef",
    "bioRef",
    "skillRef",
    "socialRef",
    "languageRef"
]
const tabItems = ["Contact", "Bio", "Skills", "Socials", "Languages"]

function ScrollTopOfSection(item, ref, topBarOffsetY) {
    scroll.top(
        page,
        item === "Contact" ? 0 : ref.offsetTop - topBarOffsetY,
        function (err, scrollTop) {
            // console.log(err)
            // { message: "Scroll cancelled" } or
            // { message: "Element already at target scroll position" } or
            // null
            // console.log(scrollTop)
            // => The new scrollTop position of the element
            // This is always returned, even when there’s an `err`.
        }
    )
}

export default function TopBar(props) {
    const styleContext = useStyleContext()
    const [selectedTab, setSelectedTab] = React.useState({
        name: null,
        millis: null
    })
    React.useEffect(() => {
        if (selectedTab.name !== null && selectedTab.millis !== null) {
            ScrollTopOfSection(
                selectedTab.name,
                props.refs[tabItemRefs[tabItems.indexOf(selectedTab.name)]]
                    .current,
                topBarOffsetY
            )
            props.callbackTab(selectedTab)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTab])
    const [mouseEnterTab, setMouseEnterTab] = React.useState(null)
    const [topBarOffsetY, setTopBarOffsetY] = React.useState(null)
    React.useEffect(() => {
        // console.log("topBarOffsetY: " + topBarOffsetY)
        props.callbackHeight(topBarOffsetY)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topBarOffsetY])

    const topBarRef = React.useRef(null)

    React.useEffect(() => {
        topBarRef !== null &&
            setTopBarOffsetY(topBarRef.current.clientHeight + 1)
    }, [topBarRef])

    // Automatically scroll to Contact-tab when its ref is assigned to it
    React.useEffect(() => {
        if (
            props.refs.contactRef.current !== null ||
            props.refs.contactRef.current !== undefined
        ) {
            ScrollTopOfSection(
                "Contact",
                props.refs.contactRef.current,
                topBarOffsetY
            )
            setSelectedTab({
                ...selectedTab,
                name: "Contact",
                millis: 0
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.refs.contactRef.current])

    // Automatically scroll to Contact-tab on component mount
    React.useEffect(() => {
        if (
            props.refs.contactRef.current !== null ||
            props.refs.contactRef.current !== undefined
        ) {
            ScrollTopOfSection(
                "Contact",
                props.refs.contactRef.current,
                topBarOffsetY
            )
            setSelectedTab({
                ...selectedTab,
                name: "Contact",
                millis: 0
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (props.offsetTop === 0 && selectedTab !== "Contact") {
            setMouseEnterTab(null) // This caused some buggy behaviour with highlighting tab(s)
            setSelectedTab({
                ...selectedTab,
                name: "Contact",
                millis: null
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.offsetTop])

    // // Automatically set selected tab based on user's scrolling
    // React.useEffect(() => {
    //     console.log("OffsetTop: " + props.offsetTop)
    //     console.log("Skill offsetTop: " + props.dims.skillDims.offsetTop)
    //     console.log(
    //         "Skill active: " +
    //             (props.dims.skillDims.offsetTop === props.offsetTop)
    //     )
    //     console.log(
    //         "scrolltop: " +
    //             props.offsetTop +
    //             ", active zone: " +
    //             (props.dims.skillDims.offsetTop +
    //                 (props.dims.skillDims.height -
    //                     props.dims.skillDims.offsetTop))
    //     )
    //     // if (props.offsetTop) {
    //     //     Object.keys(props.dims).forEach((dim) => {
    //     //         console.log("Dim: " + dim.offsetTop)
    //     //         if (
    //     //             props.offsetTop >= props.dims[dim].offsetTop &&
    //     //             props.offsetTop <=
    //     //                 props.dims[dim].height - props.dims[dim].offsetTop
    //     //         )
    //     //             setSelectedTab(props.dims[dim].name)
    //     //     })
    //     // }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [props.offsetTop])

    return (
        <div
            ref={topBarRef}
            style={{
                userSelect: "none",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
                width: "100vw",
                backgroundColor: "#ffffff",
                boxShadow: "0px 1px 10px 0px #dee2e6",
                marginBottom: 15,
                WebkitTapHighlightColor: "rgba(0,0,0,0)" // Fixes flickering on tap on Safari iOS
            }}
        >
            {tabItems.map((item, index) => (
                // <div
                //     key={"tabItem" + index}
                //     style={{
                //         width: "50vw",
                //         display: "flex",
                //         flexDirection: "row",
                //         alignItems: "center",
                //         justifyContent: "center"
                //     }}
                // >
                <div
                    key={"topBarItem" + index}
                    onClick={() => {
                        setSelectedTab({
                            ...selectedTab,
                            name: item,
                            millis: new Date()
                        })
                        // // Doesn't work smoothly on iOS Safari
                        // window.scrollTo({
                        //     top:
                        //         item === "Contact"
                        //             ? 0
                        //             : props.refs[tabItemRefs[index]]
                        //                   .current.offsetTop -
                        //               topBarOffsetY,
                        //     behavior: "smooth",
                        // })
                    }}
                    style={{
                        cursor: "pointer",
                        display: "inline-block",
                        marginRight: index !== tabItems.length - 1 ? "2vw" : 0
                    }}
                >
                    <p
                        style={{
                            fontSize: 14,
                            backgroundColor:
                                mouseEnterTab === index ||
                                selectedTab.name === item
                                    ? styleContext.navigation.title.mouseEnter
                                          .backgroundColor
                                    : styleContext.navigation.title.mouseLeave
                                          .backgroundColor,
                            padding: styleContext.navigation.title.padding,
                            borderRadius:
                                styleContext.navigation.title.borderRadius,
                            transition: "all .5s ease",
                            WebkitTransition: "all .5s ease",
                            MozTransition: "all .5s ease"
                        }}
                        onMouseEnter={() => {
                            mouseEnterTab !== index && setMouseEnterTab(index)
                        }}
                        onMouseLeave={() => {
                            mouseEnterTab === index && setMouseEnterTab(null)
                        }}
                    >
                        {item}
                    </p>
                </div>
            ))}
        </div>
    )
}
