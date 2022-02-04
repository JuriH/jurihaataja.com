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

const Firstname = () => (
    <div
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        <p>Firstname</p>
        <p>Juri</p>
    </div>
)

const Lastname = () => (
    <div
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        <p>Lastname</p>
        <p>Haataja</p>
    </div>
)

const Born = () => (
    <div
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        <p>Born</p>
        <p>1996</p>
    </div>
)

const Age = () => (
    <div
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}
    >
        <p>Age</p>
        <p>{getAge(new Date(new Date("1996-02-21T07:00:00")))}</p>
    </div>
)

const CurrentRole = () => (
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

const Goal = () => (
    <div
        style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }}
    >
        <p style={{ alignSelf: "flex-start", flex: 1, textAlign: "start" }}>
            Goals
        </p>
        <div
            style={{
                flex: 1,
                whiteSpace: "normal",
                overflowWrap: "break-word",
                textAlign: "center",
            }}
        >
            <p>
                Get employed in the industry in order to learn more about
                programming and to connect with new people
            </p>
        </div>
    </div>
)

const Achievement = () => {
    const keywords = [
        {
            word: "javascript",
            tag: "interest",
        },
        {
            word: "react",
            tag: "interest",
        },
    ]

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <p style={{ alignSelf: "flex-start" }}>Achievements</p>
            <div
                style={{
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                    maxWidth: "50%",
                    textAlign: "center",
                }}
            >
                <p>
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
            <Firstname />
            <Lastname />
            <Born />
            <Age />
            <CurrentRole />
            <Goal />
            <Achievement />
        </div>
    )
})

export default Bio
