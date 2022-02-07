import * as React from "react"
import { IoChevronDown, IoChevronUp } from "react-icons/io5"
import { useStyleContext } from "../contexts/StyleProvider"
import "./educationItem.css"
import "../App.css"

import AnimateHeight from "react-animate-height"

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
            color: props.styleContext.content.text.color,
            textAlign: "start",
            backgroundColor: "#ffd670BF",
            padding: 5,
            borderRadius: borderRadius,
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
            display: "flex",
            flexDirection: "column",
            padding: 5,
        }}
    >
        {Object.keys(props.period).map((item, index) => (
            <div
                style={{
                    textAlign: "start",
                    marginBottom: 10,
                }}
            >
                <p style={{ margin: 0, padding: 5 }}>
                    {item !== "date"
                        ? props.period[item].toString()
                        : props.period[item]
                              .toLocaleDateString("id")
                              .replaceAll("/", " / ")}
                </p>
            </div>
            // <div
            //     style={{
            //         display: "flex",
            //         flexDirection: "column",
            //         padding: 5,
            //     }}
            // >
            //     <div
            //         style={{
            //             display: "flex",
            //             flexDirection: "row",
            //             justifyContent: "space-between",
            //         }}
            //     >
            //         <p>Period</p>
            //         <p>{item.name}</p>
            //     </div>
            // </div>
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
                                key={period.name}
                                period={period}
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
