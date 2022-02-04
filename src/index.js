import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

import { StyleProvider } from "./contexts/StyleProvider"
import { WindowDimensionsProvider } from "./contexts/WindowDimensionsProvider"

ReactDOM.render(
    <React.StrictMode>
        <StyleProvider>
            <WindowDimensionsProvider>
                <App />
            </WindowDimensionsProvider>
        </StyleProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
