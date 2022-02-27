import * as React from "react"
import { useCookiesContext } from "../../contexts/CookiesProvider"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"
import "./skillItem.css"

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
                    key={"rating-circle-animated-" + i}
                    className={`animate rating-circle-animated-light
                    rating-circle-unprocessed-light-${i}`}
                />
            ) : (
                <EmptyCircleBorder
                    key={`rating-circle-unanimated-${
                        props.darkmode ? "dark" : "light"
                    }`}
                    className={`animate rating-circle-unanimated-light`}
                />
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

function createAnimTimeout(darkmode, cookies, index) {
    /**
     * Could benefit from some optimization/simplification
     */

    // Remove placeholder element from rating-circles that blocks the actual styling in order to animate filling the circles
    // Not the prettiest code, but it works even if user changes between dark- and lightmodes during the animation-loop
    timeout = setTimeout(() => {
        let els = document.querySelectorAll(
            `.rating-circle-unprocessed-${darkmode ? "dark" : "light"}-${index}`
        )
        if (els.length > 0) {
            els.forEach((circle) => {
                circle.classList.remove(
                    `rating-circle-unprocessed-${
                        darkmode ? "dark" : "light"
                    }-${index}`
                )
            })
        } else {
            els = document.querySelectorAll(
                `.rating-circle-unprocessed-${
                    !darkmode ? "dark" : "light"
                }-${index}`
            )
            if (els.length > 0) {
                els.forEach((circle) => {
                    circle.classList.remove(
                        `rating-circle-unprocessed-${
                            !darkmode ? "dark" : "light"
                        }-${index}`
                    )
                })
            }
        }
        if (index < 5) {
            createAnimTimeout(darkmode, cookies, index + 1)
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
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

    const cookiesContext = useCookiesContext()
    const cookies = cookiesContext.cookies
    React.useEffect(() => {
        if (
            (props.triggerAnim || props.inView) &&
            timeout === null
            // && !animationPlayedCookieFound(cookies)
        ) {
            console.log("Animating")
            createAnimTimeout(darkmode, cookies, 0)
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
            <p
                className={"Skill-item-key-dark"}
                style={{ textAlign: "start", marginRight: 15 }}
            >
                {props.text}
            </p>
            <Rating
                darkmode={darkmode}
                rating={props.rating}
                cookies={cookies}
            />
        </div>
    )
}
