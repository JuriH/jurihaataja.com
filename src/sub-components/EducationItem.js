import * as React from "react"
import { IoChevronDown } from "react-icons/io5"
import { useStyleContext } from "../contexts/StyleProvider"
import "./educationItem.css"
import "../App.css"
import { v4 as uuidv4 } from "uuid"

import AnimateHeight from "react-animate-height"

const borderRadius = 10

const iconSize = 25
const iconPadding = {
    top: 10,
    right: 25,
    bottom: 10,
    left: 25,
}

function monthNumberToString(monthNumber) {
    if (monthNumber === 0) return "January"
    if (monthNumber === 1) return "February"
    if (monthNumber === 2) return "March"

    if (monthNumber === 3) return "April"
    if (monthNumber === 4) return "May"
    if (monthNumber === 5) return "June"

    if (monthNumber === 6) return "July"
    if (monthNumber === 7) return "August"
    if (monthNumber === 8) return "September"

    if (monthNumber === 9) return "October"
    if (monthNumber === 10) return "November"
    if (monthNumber === 11) return "December"
}

function dynamicTextOutput(key, value) {
    switch (key) {
        case "Grade":
            return value === null ? "Completed" : value + " / 5"
        case "Date":
            return (
                monthNumberToString(value.getMonth()) +
                " - " +
                value.getFullYear()
            )
        default:
            return value.toString()
    }
}

const RevealIcon = (props) => (
    <IoChevronDown
        size={25}
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

const PeriodItem = (props) => (
    <div
        className="educationItem"
        style={{
            marginTop: props.first ? 10 : 0,
            display: "flex",
            flexDirection: "column",
            padding: 5,
        }}
        onMouseDown={() => {
            props.closeReveal()
        }}
    >
        {Object.keys(props.period).map((item, index) => (
            <div
                key={uuidv4()}
                style={{
                    marginBottom:
                        index === Object.keys(props.period).length - 1 ||
                        item === "Info"
                            ? 12
                            : 8,
                    display: "flex",
                    flexDirection: item === "Info" ? "column" : "row",
                    alignItems: item === "Info" ? "start" : "center",
                    justifyContent: "space-between",
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                }}
            >
                <p
                    style={{
                        display: "flex",
                        flex: 0.5,
                        color: props.styleContext.content.header.color,
                        marginTop: item === "Info" ? 8 : 5,
                        marginBottom: item === "Info" ? 8 : 5,
                        textAlign: "start",
                    }}
                >
                    {item === "Period" ? `${item} #${props.index + 1}` : item}
                </p>
                <div
                    style={{
                        display: "flex",
                        flex: 1,
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                        textAlign: item === "Info" ? "start" : "end",
                        justifyContent: "flex-end",
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            color: props.styleContext.content.text.color,
                            fontSize: item === "Info" ? 14 : 16,
                        }}
                    >
                        {dynamicTextOutput(item, props.period[item])}
                    </p>
                </div>
            </div>
        ))}
        <div
            style={{
                width: "95%",
                alignSelf: "center",
                borderBottom: props.last && "3px solid #d7e3fc",
                borderRadius: 5,
            }}
        />
    </div>
)
const EducationItem = (props) => {
    const styleContext = useStyleContext()
    const [revealed, setRevealed] = React.useState(false)

    return (
        <div
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
                    backgroundColor: "#d7e3fc80",
                    borderRadius: borderRadius,
                    paddingTop: 10,
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
            <div>
                <AnimateHeight
                    id="example-panel"
                    duration={500}
                    height={revealed ? "auto" : 0}
                >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {props.education.periods.map((period, index) => (
                            <PeriodItem
                                styleContext={styleContext}
                                closeReveal={() => {
                                    setRevealed(false)
                                }}
                                key={uuidv4()}
                                period={period}
                                index={
                                    props.education.periods.length - (index + 1)
                                }
                                first={index === 0 ? true : false}
                                last={
                                    props.education.periods.length !== index + 1
                                }
                            />
                        ))}
                    </div>
                </AnimateHeight>
            </div>
        </div>
    )
}

export default EducationItem
