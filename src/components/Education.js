import * as React from "react"
import { useStyleContext } from "../contexts/StyleProvider"
import EducationItem from "../sub-components/EducationItem"

const educationItems = [
    {
        nameOfSchool: {
            long: "Oulu University of Applied Sciences",
            short: "OAMK",
        },
        yearStarted: 2019,
        yearEnded: null,
        specialization: "Software Engineer",
        periods: [
            {
                Period: "Product Design and Implementation",
                Grade: 5,
                Info: "Developed a Proof-of-Concept marketplace app for both Android and iOS with React Native. It uses Google's Firebase for authentication and Firestore as database. REST API is implemented with Firebase Functions",
                Date: new Date("2021-12-22"),
            },
            {
                Period: "Advanced Studies of Software Development",
                Grade: 5,
                Info: "Studied iOS programming with Swift, analyzed HTTP-traffic with Wireshark and got familiar with Amazon Web Services (AWS) as well as basic Linux terminal commands",
                Date: new Date("2021-11-05"),
            },
            {
                Period: "Professional Practical Training 2",
                Grade: null,
                Info: "Developed a simple Twitter-bot with Node.js and Puppeteer-library for liking and sharing tweets that were related to cryptocurrency projects that I was invested in",
                Date: new Date("2021-10-31"),
            },
            {
                Period: "Mobile Application Development Project",
                Grade: 5,
                Info: "Developed a simple cryptocurrency price-tracking application for Android, where user could find trackable cryptocurrencies through Binance's API",
                Date: new Date("2021-05-23"),
            },
            {
                Period: "Mobile Programming",
                Grade: 5,
                Info: "Studied Java (Android) programming",
                Date: new Date("2021-03-29"),
            },
            {
                Period: "Embedded System Application Project",
                Grade: 5,
                Info: "Developed a webpage with HTML, CSS and JavaScript for a Unity-based singleplayer flight simulator. People could affect a simulator instance through the webpage by changing the weather or by applying temporary buffs or nerfs to the airplane",
                Date: new Date("2021-01-18"),
            },
            {
                Period: "Personal Practical Training 1",
                Grade: null,
                Info: "Developed an Android application that never saw the daylight",
                Date: new Date("2020-12-21"),
            },
            {
                Period: "Application Development",
                Grade: 5,
                Info: "To be fair, I don't even remember what we did during this period 🤔\nBut it seemed to go well 🤷‍♂️",
                Date: new Date("2020-11-13"),
            },
            {
                Period: "Software Development Application Project",
                Grade: 4,
                Info: "Created a Proof-of-Concept fullstack banking application with C#, PHP REST API and MySQL-database",
                Date: new Date("2020-05-12"),
            },
            {
                Period: "Basics of Software Development",
                Grade: 5,
                Info: "C# was added to studied programming languages along with C++",
                Date: new Date("2020-03-16"),
            },
            {
                Period: "IT Application Project",
                Grade: 4,
                Info: "Created a controller with Arduino and distance sensors that could be used for example to control Youtube or Spotify (Web Player) playback",
                Date: new Date("2020-01-21"),
            },
            {
                Period: "Introduction to ICT Studies",
                Grade: 4,
                Info: "Basics of C++ with console/terminal application, electric circuity and resistor calculations",
                Date: new Date("2019-11-12"),
            },
        ],
    },
]

const Education = React.forwardRef((props, ref) => {
    const styleContext = useStyleContext()

    const [enableHighlight, setEnableHighlight] = React.useState(false)

    React.useEffect(() => {
        if (props.selectedTab.name === "Education" && !enableHighlight) {
            setEnableHighlight(true)
            setTimeout(() => {
                setEnableHighlight(false)
            }, 450)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedTab.millis])

    return (
        <div
            ref={ref}
            style={{
                marginBottom: 25,
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 10,
                borderRadius: 10,
                width: props.windowDimensions.width > 500 ? 500 : "75vw",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f8f9fa",
            }}
        >
            <p
                style={{
                    backgroundColor: enableHighlight
                        ? styleContext.content.title.highlighted.backgroundColor
                        : "transparent",
                    transition: "all .5s ease",
                    WebkitTransition: "all .5s ease",
                    MozTransition: "all .5s ease",
                    WebkitAnimationDuration: ".5s",
                    display: "inline-block",
                    padding: 10,
                    borderRadius: 10,
                    color: styleContext.content.header.color,
                }}
            >
                Education
            </p>
            {educationItems.map((education, index) => {
                return (
                    <EducationItem
                        key={"education" + index}
                        education={education}
                    />
                )
            })}
        </div>
    )
})

export default Education
