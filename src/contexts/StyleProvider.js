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
            header: {
                color: "#212529",
            },
            text: {
                color: "#6c757d",
            },
        },
        navigation: {
            title: {
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
