import * as React from "react"
import { useCookiesContext } from "../../contexts/CookiesContext"

const circleRadius = 23

// Interval for animating rating elements
let timeout = null

function animationPlayedCookieFound(cookies) {
    const skillsAnimPlayed = cookies.get("skills_animation_played")
    if (skillsAnimPlayed === undefined || skillsAnimPlayed === null)
        return false
    return true
}

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

    // // Play Rating-circles animation only once until the browser is closed
    // if (animationPlayedCookieFound(props.cookies)) {
    //     for (let i = 0; i < 5; i++) {
    //         ratingList.push(
    //             props.rating > i ? (
    //                 <FilledCircleBorder key={"rating" + i} />
    //             ) : (
    //                 <EmptyCircleBorder key={"rating" + i} />
    //             )
    //         )
    //     }
    // } else {
    //     for (let i = 0; i < 5; i++) {
    //         ratingList.push(
    //             props.rating > i ? (
    //                 <EmptyCircleBorder
    //                     key={"rating" + i}
    //                     className={"ratingCircle" + i}
    //                 />
    //             ) : (
    //                 <EmptyCircleBorder key={"rating" + i} />
    //             )
    //         )
    //     }
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

function createAnimTimeout(cookies, index) {
    timeout = setTimeout(() => {
        // console.log("Animating circles at index: " + (index - 1))
        document.body
            .querySelectorAll(`.ratingCircle${index - 1}`)
            .forEach((circle) => {
                circle.style.backgroundColor = "#495057"
                circle.style.borderColor = "#495057"
            })
        if (index < 5) {
            createAnimTimeout(cookies, index + 1)
        } else {
            // // Cookie for indicating that the Rating-circles animation has been played
            // cookies.set("skills_animation_played", {
            //     secure:
            //         !process.env.NODE_ENV ||
            //         process.env.NODE_ENV === "development"
            //             ? false
            //             : true,
            // })
        }
    }, 250)
}

export default function SkillItem(props) {
    const cookiesContext = useCookiesContext()
    const cookies = cookiesContext.cookies
    React.useEffect(() => {
        if (
            (props.triggerAnim || props.inView) &&
            timeout === null
            // && !animationPlayedCookieFound(cookies)
        ) {
            createAnimTimeout(cookies, 1)
        }
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
            <Rating rating={props.rating} cookies={cookies} />
        </div>
    )
}
