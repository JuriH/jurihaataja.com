import * as React from "react"
import { useLanguageContext } from "../../contexts/LanguageProvider"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"

import EducationItem from "./EducationItem"

import { educations } from "../../resources/educations"

const text = {
    header: {
        en: "Education",
        fi: "Koulutus",
    },
}

const Education = React.forwardRef((props, ref) => {
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

    const languageContext = useLanguageContext()

    const [enableHighlight, setEnableHighlight] = React.useState(false)

    React.useEffect(() => {
        props.inViewCallback()
    }, [props.inView])

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
            className={`Education-container-${darkmode ? "dark" : "light"}`}
            ref={ref}
            ref={props.inViewRef}
            style={{
                marginBottom: 25,
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 10,
                borderRadius: 10,
                width: props.windowDimensions.width > 500 ? 500 : "75vw",
                justifyContent: "space-between",
                alignItems: "center",
                // backgroundColor: "#f8f9fa",
            }}
        >
            <p
                className={`${
                    languageContext.className
                } Education-section-header-${darkmode ? "dark" : "light"}`}
                style={{
                    transition: "all .5s ease",
                    WebkitTransition: "all .5s ease",
                    MozTransition: "all .5s ease",
                    WebkitAnimationDuration: ".5s",
                    display: "inline-block",
                    padding: 10,
                    borderRadius: 10,
                    // color: styleContext.content.header.color,
                }}
            >
                {text.header[languageContext.language]}
            </p>
            {educations.map((education, index) => (
                <EducationItem
                    key={"education" + index}
                    education={education}
                    topBarBottomMargin={props.topBarBottomMargin}
                />
            ))}
        </div>
    )
})

export default Education
