import * as React from "react"

const circleRadius = 23

const FilledCircleBorder = () => (
    <div
        style={{
            width: circleRadius,
            height: circleRadius,
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#495057",
            marginRight: 5,
        }}
    />
)

const EmptyCircleBorder = () => (
    <div
        style={{
            border: "2px solid #ced4da",
            width: circleRadius - 2,
            height: circleRadius - 2,
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
        }}
    />
)

// const MissingCircleBorder = () => (
//     <div
//         style={{
//             width: 23,
//             height: 23,
//             borderRadius: 150,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             borderColor: "transparent",
//             borderWidth: 1,
//             backgroundColor: "#495057",
//             marginRight: 5,
//         }}
//     ></div>
// )

function Rating(props) {
    const ratingList = []

    for (let i = 0; i < 5; i++) {
        ratingList.push(
            props.rating > i ? (
                <FilledCircleBorder key={"rating" + i} />
            ) : (
                <EmptyCircleBorder key={"rating" + i} />
            )
        )
    }

    ratingList.reverse()

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
            }}
        >
            {ratingList.map((item, index) => {
                return <div key={"skillItem" + index}>{item}</div>
            })}
        </div>
    )
}

export default function SkillItem(props) {
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
            <p style={{ marginRight: 15 }}>{props.text}</p>
            <Rating rating={props.rating} />
        </div>
    )
}
