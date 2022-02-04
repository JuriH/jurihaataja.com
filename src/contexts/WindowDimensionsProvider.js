import * as React from "react"

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
        width,
        height,
    }
}

const WindowDimensionsContext = React.createContext()

export function useWindowDimensionsContext() {
    return React.useContext(WindowDimensionsContext)
}

export function WindowDimensionsProvider({ children }) {
    const [windowDimensions, setWindowDimensions] = React.useState(
        getWindowDimensions()
    )
    React.useEffect(() => {
        // console.log("WindowDimensions: " + JSON.stringify(windowDimensions))
    }, [windowDimensions])

    React.useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions())
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <WindowDimensionsContext.Provider value={windowDimensions}>
            {children}
        </WindowDimensionsContext.Provider>
    )
}
