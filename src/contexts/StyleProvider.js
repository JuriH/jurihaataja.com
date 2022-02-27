import * as React from "react"

const StyleContext = React.createContext()

export function useStyleContext() {
    return React.useContext(StyleContext)
}

export function StyleProvider({ children }) {
    const [sharedStyle, setSharedStyle] = React.useState({
        content: {
            title: {
                highlighted: "#fee44080",
                color: {
                    true: "#f8f9fa",
                    false: "#fee44080",
                },
            },
            container: {
                borderRadius: 10,
                backgroundColor: {
                    true: "#000814",
                    false: "#ffffff",
                },
            },
            subcontainer: {
                title: {
                    true: "#f8f9fa",
                    false: "#000000",
                },
                icon: {
                    true: "#f8f9fa",
                    false: "#000000",
                },
                borderRadius: 10,
                backgroundColor: {
                    true: "#212529",
                    false: "#f8f9fa",
                },
            },
            header: {
                color: "#000814",
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
            topBar: {
                container: {
                    backgroundColor: {
                        true: "#000814",
                        false: "#ffffff",
                    },
                },
            },
        },
        animations: {
            transition: "all 0.25s ease",
            WebkitTransition: "all 0.25s ease",
            WebkitAnimationDuration: "0.25s",
            animationDuration: "0.25s",
        },
    })

    return (
        <StyleContext.Provider value={sharedStyle}>
            {children}
        </StyleContext.Provider>
    )
}
