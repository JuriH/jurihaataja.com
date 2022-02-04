import * as React from "react"
import SkillItem from "../sub-components/SkillItem"
import { useStyleContext } from "../contexts/StyleProvider"

// https://stackoverflow.com/a/1129270
function compare( a, b ) {
    if ( a.rating > b.rating ){
      return -1;
    }
    if ( a.rating < b.rating ){
      return 1;
    }
    return 0;
}

let skillItems = [
    {
        text: "JavaScript",
        rating: 5,
    },
    {
        text: "CSS",
        rating: 4,
    },
    {
        text: "ReactJS",
        rating: 4,
    },
    {
        text: "React Native",
        rating: 4,
    },
    {
        text: "Google Firebase",
        rating: 4,
    },
    {
        text: "Google Firestore",
        rating: 4,
    },
    {
        text: "Python",
        rating: 3,
    },
    {
        text: "C#",
        rating: 2
    },
    {
        text: "C++",
        rating: 2
    },
    {
        text: "Git",
        rating: 3,
    },
    {
        text: "Stoplight",
        rating: 2,
    },
    {
        text: "Docker",
        rating: 2,
    },
]

skillItems.sort(compare)

const Skills = React.forwardRef((props, ref) => {
    const styleContext = useStyleContext()

    const [enableHighlight, setEnableHighlight] = React.useState(false)

    React.useEffect(() => {
        if (props.selectedTab.name === "Skills" && !enableHighlight) {
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
                marginTop: 25,
                marginBottom: 25,
                backgroundColor: "#f8f9fa",
                // paddingTop: 10, // To compensate with added padding in section title for highlighting effect
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 10,
                width: props.windowDimensions.width > 500 ? 500 : "75vw",
                flexDirection:
                    props.windowDimensions.width > 500 ? "row" : "column",
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
                }}
            >
                Skills
            </p>
            <div>
                {skillItems.map((skill, index) => (
                    <SkillItem
                        key={"skillItem" + index}
                        text={skill.text}
                        rating={skill.rating}
                    />
                ))}
            </div>
        </div>
    )
})

export default Skills
