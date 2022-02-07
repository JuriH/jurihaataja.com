import * as React from "react"
import { useStyleContext } from "../contexts/StyleProvider"
import EducationItem from "../sub-components/EducationItem"

let educationItems = [
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
                name: "IT Application Project",
                etc: 4,
                more: "Created a controller with Arduino and distance sensors that could be used for example to control Youtube or Spotify (Web Player) playback",
                date: new Date("2020-01-21"),
            },
            {
                name: "Introduction to ICT Studies",
                etc: 4,
                more: "Basics of C++ with console/terminal application",
                date: new Date("2019-11-12"),
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
