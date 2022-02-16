import * as React from "react"

const circleRadius = 23

// Interval for animating rating elements
let timeout = null

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

const EmptyCircleBorder = (props) => (
    <div
        className={props.className}
        style={{
            border: "2px solid #ced4da",
            width: circleRadius - 2,
            height: circleRadius - 2,
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
            transition: "all .5s ease",
            WebkitTransition: "all .5s ease",
            MozTransition: "all .5s ease",
        }}
    />
)

function Rating(props) {
    const ratingList = []

    // for (let i = 0; i < 5; i++) {
    //     ratingList.push(
    //         props.rating > i ? (
    //             <FilledCircleBorder key={"rating" + i} />
    //         ) : (
    //             <EmptyCircleBorder key={"rating" + i} />
    //         )
    //     )
    // }

    for (let i = 0; i < 5; i++) {
        ratingList.push(
            props.rating > i ? (
                <EmptyCircleBorder
                    key={"rating" + i}
                    className={"ratingCircle" + i}
                />
            ) : (
                <EmptyCircleBorder key={"rating" + i} />
            )
        )
    }

    // Render empty circles first, filled circles after them
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

function createAnimTimeout(index) {
    timeout = setTimeout(() => {
        // console.log("Animating circles at index: " + (index - 1))
        document.body
            .querySelectorAll(`.ratingCircle${index - 1}`)
            .forEach((circle) => {
                circle.style.backgroundColor = "#495057"
                circle.style.border = "2px solid #495057"
                circle.style.width = circleRadius
                circle.style.height = circleRadius
            })
        if (index < 5) {
            createAnimTimeout(index + 1)
        }
    }, 250)
}

export default function SkillItem(props) {
    React.useEffect(() => {
        if ((props.triggerAnim || props.inView) && timeout === null)
            createAnimTimeout(1)
    }, [props.triggerAnim, props.inView])

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
            <p style={{ textAlign: "start", marginRight: 15 }}>{props.text}</p>
            <Rating rating={props.rating} />
        </div>
    )
}
