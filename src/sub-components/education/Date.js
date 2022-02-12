import * as React from "react"
import monthNumberToString from "../../utils/monthNumberToString"

export default function Date(props) {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
                paddingLeft: props.padding.left,
                paddingRight: props.padding.right,
                marginTop: 5,
                marginBottom: 5,
            }}
        >
            <p
                style={{
                    margin: 0,
                    fontSize: props.fontSize.text,
                    color: props.style.content.header.color,
                    alignSelf: "flex-start",
                }}
            >
                Date
            </p>
            <p
                style={{
                    margin: 0,
                    fontSize: props.fontSize.text,
                    color: props.style.content.text.color,
                }}
            >
                {monthNumberToString(props.date.getMonth()) +
                    " - " +
                    props.date.getFullYear()}
            </p>
        </div>
    )
}
