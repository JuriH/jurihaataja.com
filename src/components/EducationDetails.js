import * as React from "react"
import { Routes, Route, Link } from "react-router-dom"

import { IoChevronBackOutline } from "react-icons/io5"

import { useLocation } from "react-router-dom"
import { navigationRef } from "../navigation/RootNavigation"

const topBarHeight = 50

const TopBar = (props) => (
    <div
        style={{
            display: "flex",
            flexDirection: "row",
            position: "fixed",
            width: "100vw",
        }}
    >
        <div
            style={{
                display: "flex",
                flex: 0.1,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 10,
            }}
            onClick={() => {
                navigationRef.navigate("Home", {})
            }}
        >
            <IoChevronBackOutline size={topBarHeight / 2} />
        </div>
        <div
            style={{
                alignItems: "center",
                flex: 1,
                textAlign: "center",
            }}
        >
            <p style={{ fontSize: 18 }}>Education details</p>
        </div>
        <div style={{ flex: 0.1 }} />
    </div>
)

export default function EducationDetails({ route, navigation }) {
    // const location = useLocation()
    // const { pageYOffset } = location.state
    // console.log("PageYOffset param: " + pageYOffset)

    // React.useEffect(() => {
    //     window.scrollTo(0, route.pageYOffset)
    // }, [])
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
            }}
        >
            <TopBar />
        </div>
    )
}
