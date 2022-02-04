import * as React from "react"

const StyleContext = React.createContext()

export function useStyleContext() {
    return React.useContext(StyleContext)
}

export function StyleProvider({ children }) {
    const [sharedStyle, setSharedStyle] = React.useState({
        content: {
            title: {
                highlighted: {
                    backgroundColor: "#fee44080",
                },
            },
            container: {
                borderRadius: 10,
            },
        },
        navigation: {
            title: {
                mouseEnter: {
                    backgroundColor: "#e2eafc",
                },
                mouseLeave: {
                    backgroundColor: "transparent",
                },
                borderRadius: 15,
                padding: 10,
            },
            borderBottom: {
                backgroundColor: "#adb5bd",
            },
        },
    })

    return (
        <StyleContext.Provider value={sharedStyle}>
            {children}
        </StyleContext.Provider>
    )
}
