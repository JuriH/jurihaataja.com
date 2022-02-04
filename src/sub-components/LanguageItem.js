import * as React from "react"
import calculateAspectRatioFit from "../utils/calculateAspectRatio"

export default function LanguageItem(props) {
    const keepAspectRatioSize = calculateAspectRatioFit(1191, 793.92, 50, 50)
    return (
        <div
            style={{
                display: "flex",
                flex: 1,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <img
                    src={props.flag}
                    alt={props.text}
                    style={{
                        width: keepAspectRatioSize.width,
                        height: keepAspectRatioSize.height,
                        marginRight: 15,
                        borderRadius: 5,
                        overflow: "hidden",
                    }}
                />
                <p style={{ marginRight: 15 }}>{props.text}</p>
            </div>
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {Object.keys(props.rating).map((item, index) => (
                    <p
                        key={"languageItem" + index}
                        style={{ flex: 1, textAlign: "center" }}
                    >
                        {props.rating[item]}
                    </p>
                ))}
            </div>
        </div>
    )
}
