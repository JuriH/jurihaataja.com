import * as React from "react"
import { useStyleContext } from "../contexts/StyleProvider"
import EducationItem from "../sub-components/EducationItem"

import { educations } from "../resources/educations"

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
            {educations.map((education, index) => (
                <EducationItem
                    key={"education" + index}
                    education={education}
                    topBarBottomMargin={props.topBarBottomMargin}
                />
                // <div
                //     state={{ pageYOffset: window.pageYOffset }}
                //     style={{ padding: 10, backgroundColor: "yellow" }}
                // >
                //     <p>{education.nameOfSchool.short}</p>
                // </div>
            ))}
        </div>
    )
})

export default Education
