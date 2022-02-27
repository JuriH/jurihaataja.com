import * as React from "react"
import { IoChevronDown } from "react-icons/io5"
import { useLanguageContext } from "../../contexts/LanguageProvider"
import { useStyleContext } from "../../contexts/StyleProvider"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"
import "./educationItem.css"

import AnimateHeight from "react-animate-height"
import EducationCarousel from "./EducationCarousel"

import { educations } from "../../resources/educations"

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
            color: props.darkmode ? "#6c757d" : "#212529",
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
        <p
            className={`${props.languageContext.className} education-item-key-${
                props.darkmode ? "dark" : "light"
            }`}
            style={{ margin: 0, fontSize: 14, textAlign: "start" }}
        >
            {props.nameOfSchool.long[props.languageContext.language]}
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
        <p
            className={`education-item-key-${
                props.darkmode ? "dark" : "light"
            }`}
            style={{ margin: 0, fontSize: 16 }}
        >
            {props.nameOfSchool.short[props.languageContext.language]}
        </p>
    </div>
)

const EducationSpecialization = (props) => (
    <p
        className={`${props.languageContext.className} education-item-value-${
            props.darkmode ? "dark" : "light"
        }`}
        style={{
            textAlign: "start",
            marginTop: 0,
            marginBottom: 10,
            color: props.style.content.text.color,
            fontSize: 14,
        }}
    >
        {props.specialization[props.languageContext.language]}
    </p>
)

const EducationTimeframe = (props) => {
    const text = {
        present: {
            en: "Present",
            fi: "Nykyhetki",
        },
    }
    function getLocalizedPresent() {
        return text.present[props.languageContext.language]
    }

    return (
        <p
            className={props.languageContext.className}
            style={{
                display: "inline-block",
                marginTop: 10,
                color: "#343a40",
                textAlign: "start",
                backgroundColor: props.darkmode ? "#ffd670BF" : "#ffd670BF",
                padding: 5,
                borderRadius: borderRadius,
                marginBottom: 5,
            }}
        >
            {props.yearStarted +
                " - " +
                (props.yearEnded === null
                    ? getLocalizedPresent()
                    : props.yearEnded)}
        </p>
    )
}

const EducationItem = (props) => {
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

    const languageContext = useLanguageContext()
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
                backgroundColor: darkmode ? "#30638ebf" : "#edf2fb",
                borderRadius: borderRadius,
                // borderWidth: 0,
                // borderColor: "#edf2fb",
            }}
        >
            <div
                className={`education-item-container-${
                    darkmode ? "dark" : "light"
                }`}
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    justifyItems: "space-between",
                    alignItems: "center",
                    backgroundColor: mouseOver ? "#ccdbfdBF" : "#d7e3fc80",
                    borderRadius: borderRadius,
                    borderWidth: 1,
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
                        darkmode={darkmode}
                        languageContext={languageContext}
                        nameOfSchool={props.education.nameOfSchool}
                    />
                    <SchoolNameLong
                        darkmode={darkmode}
                        languageContext={languageContext}
                        nameOfSchool={props.education.nameOfSchool}
                    />
                    <div
                        style={{
                            textAlign: "center",
                            justifyItems: "center",
                        }}
                    >
                        <EducationSpecialization
                            darkmode={darkmode}
                            languageContext={languageContext}
                            specialization={props.education.specialization}
                            style={styleContext}
                        />
                        <EducationTimeframe
                            darkmode={darkmode}
                            languageContext={languageContext}
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
                    <RevealIcon
                        darkmode={darkmode}
                        iconPadding={iconPadding}
                        revealed={revealed}
                    />
                </div>
            </div>
            <AnimateHeight duration={300} height={revealed ? "auto" : 0}>
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
