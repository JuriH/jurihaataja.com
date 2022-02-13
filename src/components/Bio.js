import * as React from "react"
import { useStyleContext } from "../contexts/StyleProvider"
import { useLanguageContext } from "../contexts/LanguageProvider"
import "./bio.css"

const text = {
    header: {
        en: "Bio",
        fi: "Bio",
    },
}

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

const Firstname = (props) => {
    const text = {
        en: "Firstname",
        fi: "Etunimi",
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <p
                className={props.languageContext.className}
                style={{ color: props.styleContext.content.header.color }}
            >
                {text[props.languageContext.language]}
            </p>
            <p style={{ color: props.styleContext.content.text.color }}>Juri</p>
        </div>
    )
}

const Lastname = (props) => {
    const text = {
        en: "Lastname",
        fi: "Sukunimi",
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <p
                className={props.languageContext.className}
                style={{ color: props.styleContext.content.header.color }}
            >
                {text[props.languageContext.language]}
            </p>
            <p style={{ color: props.styleContext.content.text.color }}>
                Haataja
            </p>
        </div>
    )
}

const Born = (props) => {
    const text = {
        en: "Born",
        fi: "Syntymäaika",
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <p
                className={props.languageContext.className}
                style={{ color: props.styleContext.content.header.color }}
            >
                {text[props.languageContext.language]}
            </p>
            <p style={{ color: props.styleContext.content.text.color }}>1996</p>
        </div>
    )
}

const Age = (props) => {
    const text = {
        en: "Age",
        fi: "Ikä",
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <p
                className={props.languageContext.className}
                style={{ color: props.styleContext.content.header.color }}
            >
                {text[props.languageContext.language]}
            </p>
            <p style={{ color: props.styleContext.content.text.color }}>
                {getAge(new Date(new Date("1996-02-21T07:00:00")))}
            </p>
        </div>
    )
}

const Role = (props) => {
    const text = {
        header: {
            en: "Role",
            fi: "Rooli",
        },
        value: {
            en: "Student",
            fi: "Opiskelija",
        },
    }

    return (
        <div
            className={props.languageContext.className}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <p>{text.header[props.languageContext.language]}</p>
            <p style={{ color: props.styleContext.content.text.color }}>
                {text.value[props.languageContext.language]}
            </p>
        </div>
    )
}

const Goal = (props) => {
    const text = {
        header: {
            en: "Goals",
            fi: "Tavoitteet",
        },
        value: {
            en: "Get employed in the industry in order to learn more about programming and to connect with new people",
            fi: "Työllistyä alalle oppiakseen enemmän ohjelmoinnista sekä tavatakseen uusia ihmisiä",
        },
    }

    return (
        <div
            className={props.languageContext.className}
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
                {text.header[props.languageContext.language]}
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
                    {text.value[props.languageContext.language]}
                </p>
            </div>
        </div>
    )
}

const Achievement = (props) => {
    const text = {
        header: {
            en: "Achievements",
            fi: "Saavutukset",
        },
        value: {
            en: "Biggest achievement has been learning to use JavaScript and React, as they can enable even a solo-developer to do so much",
            fi: "Suurin saavutus on ollut oppia JavaScript sekä React, sillä ne mahdollistavat niin paljon jopa soolo-ohjelmoijalle",
        },
    }

    return (
        <div
            className={props.languageContext.className}
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
                {text.header[props.languageContext.language]}
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
                    {text.value[props.languageContext.language]}
                </p>
            </div>
        </div>
    )
}

const Bio = React.forwardRef((props, ref) => {
    const languageContext = useLanguageContext()
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
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 10,
                width: props.windowDimensions.width > 500 ? 500 : "75vw",
            }}
        >
            <p
                className={languageContext.className}
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
                {text.header[languageContext.language]}
            </p>
            <Firstname
                languageContext={languageContext}
                styleContext={styleContext}
            />
            <Lastname
                languageContext={languageContext}
                styleContext={styleContext}
            />
            <Born
                languageContext={languageContext}
                styleContext={styleContext}
            />
            <Age
                languageContext={languageContext}
                styleContext={styleContext}
            />
            <Role
                languageContext={languageContext}
                styleContext={styleContext}
            />
            <Goal
                languageContext={languageContext}
                styleContext={styleContext}
            />
            <Achievement
                languageContext={languageContext}
                styleContext={styleContext}
            />
        </div>
    )
})

export default Bio
