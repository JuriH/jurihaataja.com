import * as React from "react"
import { useStyleContext } from "../contexts/StyleProvider"

function getAge(dateString) {
    var today = new Date()
    var birthDate = new Date(dateString)
    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

const Firstname = (props) => (
    <div
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        <p style={{ color: props.styleContext.content.header.color }}>
            Firstname
        </p>
        <p style={{ color: props.styleContext.content.text.color }}>Juri</p>
    </div>
)

const Lastname = (props) => (
    <div
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        <p style={{ color: props.styleContext.content.header.color }}>
            Lastname
        </p>
        <p style={{ color: props.styleContext.content.text.color }}>Haataja</p>
    </div>
)

const Born = (props) => (
    <div
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        <p style={{ color: props.styleContext.content.header.color }}>Born</p>
        <p style={{ color: props.styleContext.content.text.color }}>1996</p>
    </div>
)

const Age = (props) => (
    <div
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        <p style={{ color: props.styleContext.content.header.color }}>Age</p>
        <p style={{ color: props.styleContext.content.text.color }}>
            {getAge(new Date(new Date("1996-02-21T07:00:00")))}
        </p>
    </div>
)

const CurrentRole = (props) => (
    <div
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }}
    >
        <p>Current role</p>
        <p
            style={{ color: props.styleContext.content.text.color }}
            // style={{
            //     backgroundColor: "#b9fbc080",
            //     padding: 10,
            //     borderRadius: 15
            // }}
        >
            Student
        </p>
    </div>
)

const Goal = (props) => (
    <div
        className="section"
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
    >
        <p
            style={{
                alignSelf: "flex-start",
                textAlign: "start",
                color: props.styleContext.content.header.color,
            }}
        >
            Goals
        </p>
        <div
            style={{
                whiteSpace: "normal",
                overflowWrap: "break-word",
                textAlign: "left",
            }}
        >
            <p
                style={{
                    color: props.styleContext.content.text.color,
                    paddingBottom: 10,
                    margin: 0,
                }}
            >
                Get employed in the industry in order to learn more about
                programming and to connect with new people
            </p>
        </div>
    </div>
)

const Achievement = (props) => {
    // const keywords = [
    //     {
    //         word: "javascript",
    //         tag: "interest",
    //     },
    //     {
    //         word: "react",
    //         tag: "interest",
    //     },
    // ]

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <p
                style={{
                    alignSelf: "flex-start",
                    color: props.styleContext.content.header.color,
                }}
            >
                Achievements
            </p>
            <div
                style={{
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                    textAlign: "left",
                }}
            >
                <p
                    style={{
                        color: props.styleContext.content.text.color,
                        paddingBottom: 10,
                        margin: 0,
                    }}
                >
                    Biggest achievement has been learning to use JavaScript and
                    React, as they can enable even a solo developer to do so
                    much
                </p>
            </div>
        </div>
    )
}

const Bio = React.forwardRef((props, ref) => {
    const styleContext = useStyleContext()
    const [enableHighlight, setEnableHighlight] = React.useState(false)

    React.useEffect(() => {
        if (props.selectedTab.name === "Bio" && !enableHighlight) {
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
                    display: "inline-block",
                }}
            >
                Bio
            </p>
            <Firstname styleContext={styleContext} />
            <Lastname styleContext={styleContext} />
            <Born styleContext={styleContext} />
            <Age styleContext={styleContext} />
            <CurrentRole styleContext={styleContext} />
            <Goal styleContext={styleContext} />
            <Achievement styleContext={styleContext} />
        </div>
    )
})

export default Bio
