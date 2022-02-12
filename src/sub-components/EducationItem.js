import * as React from "react"
import { IoChevronDown } from "react-icons/io5"
import { useStyleContext } from "../contexts/StyleProvider"
import "./educationItem.css"

import AnimateHeight from "react-animate-height"
import EducationCarousel from "./EducationCarousel"

import { educations } from "../resources/educations"

import { isBrowser } from "react-device-detect"

const borderRadius = 10

const iconSize = 25
const iconPadding = {
    top: 10,
    right: 25,
    bottom: 10,
    left: 25,
}

const RevealIcon = (props) => (
    <IoChevronDown
        style={{
            color: "#212529",
            paddingTop: props.iconPadding.top,
            paddingRight: props.iconPadding.right,
            paddingBottom: props.iconPadding.bottom,
            paddingLeft: props.iconPadding.left,
            transform: props.revealed ? "rotateX(180deg)" : "",
            transition: "transform 200ms ease", // smooth transition
        }}
        size={iconSize}
    />
)

const SchoolNameLong = (props) => (
    <div
        style={{
            justifyItems: "center",
            marginBottom: 10,
        }}
    >
        <p style={{ margin: 0, fontSize: 14, textAlign: "start" }}>
            {props.nameOfSchool.long}
        </p>
    </div>
)

const SchoolNameShort = (props) => (
    <div
        style={{
            textAlign: "center",
            justifyItems: "center",
            marginBottom: 10,
        }}
    >
        <p style={{ margin: 0, fontSize: 16 }}>{props.nameOfSchool.short}</p>
    </div>
)

const EducationSpecialization = (props) => (
    <p
        style={{
            marginTop: 0,
            marginBottom: 10,
            color: props.style.content.text.color,
            fontSize: 14,
        }}
    >
        {props.specialization}
    </p>
)

const EducationTimeframe = (props) => (
    <p
        style={{
            display: "inline-block",
            marginTop: 10,
            color: "#343a40",
            // color: props.styleContext.content.text.color,
            textAlign: "start",
            backgroundColor: "#ffd670BF",
            padding: 5,
            borderRadius: borderRadius,
            marginBottom: 5,
        }}
    >
        {props.yearStarted +
            " - " +
            (props.yearEnded === null ? "Present" : props.yearEnded)}
    </p>
)

const EducationItem = (props) => {
    const styleContext = useStyleContext()

    const [revealed, setRevealed] = React.useState(false)
    const [mouseOver, setMouseOver] = React.useState(false)
    const [parentWidth, setParentWidth] = React.useState(null)
    React.useEffect(() => {
        parentWidth && console.log("Parent width: " + parentWidth)
    }, [parentWidth])

    const ref = React.useRef(null)

    return (
        <div
            ref={ref}
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#edf2fb",
                borderRadius: borderRadius,
                borderWidth: 1,
                borderColor: "#edf2fb",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    justifyItems: "space-between",
                    alignItems: "center",
                    backgroundColor: mouseOver ? "#ccdbfdBF" : "#d7e3fc80",
                    borderRadius: borderRadius,
                    paddingTop: 10,
                    cursor: "pointer",
                    transition: "all .3s ease",
                    WebkitTransition: "all .3s ease",
                    MozTransition: "all .3s ease",
                }}
                onMouseOver={() => {
                    isBrowser && setMouseOver(true)
                }}
                onMouseLeave={() => {
                    isBrowser && setMouseOver(false)
                }}
                onClick={() => {
                    setRevealed(!revealed)
                }}
            >
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        paddingLeft: 5,
                    }}
                >
                    <SchoolNameShort
                        nameOfSchool={props.education.nameOfSchool}
                    />
                    <SchoolNameLong
                        nameOfSchool={props.education.nameOfSchool}
                    />
                    <div
                        style={{
                            textAlign: "center",
                            justifyItems: "center",
                        }}
                    >
                        <EducationSpecialization
                            specialization={props.education.specialization}
                            style={styleContext}
                        />
                        <EducationTimeframe
                            yearStarted={props.education.yearStarted}
                            yearEnded={props.education.yearEnded}
                            styleContext={styleContext}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <RevealIcon iconPadding={iconPadding} revealed={revealed} />
                </div>
            </div>
            <AnimateHeight duration={250} height={revealed ? "auto" : 0}>
                {educations.map((education) => (
                    <EducationCarousel
                        parentWidth={parentWidth}
                        key={education}
                        education={education}
                        revealed={revealed}
                        closeReveal={() => {
                            setRevealed(false)
                        }}
                        topBarBottomMargin={props.topBarBottomMargin}
                    />
                ))}
            </AnimateHeight>
        </div>
    )
}

export default EducationItem
