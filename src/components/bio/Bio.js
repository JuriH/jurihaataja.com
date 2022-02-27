import * as React from "react"
import { useStyleContext } from "../../contexts/StyleProvider"
import { useLanguageContext } from "../../contexts/LanguageProvider"
import monthNumberToString from "../../utils/monthNumberToString"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"
import "../../App.css"

// const items = [
//     {
//         en: "Firstname",
//         fi: "Etunimi",
//     },
//     {
//         en: "Lastname",
//         fi: "Sukunimi",
//     },
//     {
//         en: "Born",
//         fi: "Syntymäaika",
//     },
//     {
//         en: "Age",
//         fi: "Ikä",
//     },
//     {
//         header: {
//             en: "Status",
//             fi: "Status",
//         },
//         value: {
//             en: "Student",
//             fi: "Opiskelija",
//         },
//     },
// ]

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
                className={`${props.languageContext.className} bio-key-${props.darkmode}`}
            >
                {text[props.languageContext.language]}
            </p>
            <p className={`bio-value-${props.darkmode}`}>Juri</p>
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
                className={`${props.languageContext.className} bio-key-${props.darkmode}`}
            >
                {text[props.languageContext.language]}
            </p>
            <p className={`bio-value-${props.darkmode}`}>Haataja</p>
        </div>
    )
}

const Born = (props) => {
    const text = {
        header: {
            en: "Born",
            fi: "Syntymäaika",
        },
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
                className={`${props.languageContext.className} bio-key-${props.darkmode}`}
            >
                {text.header[props.languageContext.language]}
            </p>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <p
                    className={`${props.languageContext.className} bio-value-${props.darkmode}`}
                >
                    {monthNumberToString(1, props.languageContext.language)}
                </p>
                <p
                    className={`bio-value-${props.darkmode}`}
                    style={{
                        whiteSpace: "pre", // To keep leading whitespace in paragraph
                    }}
                >
                    {" - 1996"}
                </p>
            </div>
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
                className={`${props.languageContext.className} bio-key-${props.darkmode}`}
            >
                {text[props.languageContext.language]}
            </p>
            <p className={`bio-value-${props.darkmode}`}>
                {getAge(new Date(new Date("1996-02-21T07:00:00")))}
            </p>
        </div>
    )
}

const Status = (props) => {
    const text = {
        header: {
            en: "Status",
            fi: "Status",
        },
        value: {
            en: "Student",
            fi: "Opiskelija",
        },
    }

    return (
        <div
            className={`${props.languageContext.className} bio-key-${props.darkmode}`}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <p>{text.header[props.languageContext.language]}</p>
            <p className={`bio-value-${props.darkmode}`}>
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
                className={`${props.languageContext.className} bio-key-${props.darkmode}`}
                style={{
                    alignSelf: "flex-start",
                    textAlign: "start",
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
                    className={`bio-value-${props.darkmode}`}
                    style={{
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
                className={`${props.languageContext.className} bio-key-${props.darkmode}`}
                style={{
                    alignSelf: "flex-start",
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
                    className={`${props.styleContext.className} bio-value-${props.darkmode}`}
                    style={{
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
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

    const languageContext = useLanguageContext()
    const styleContext = useStyleContext()
    const [enableHighlight, setEnableHighlight] = React.useState(false)

    React.useEffect(() => {
        props.inViewCallback()
    }, [props.inView])

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
            className={`Bio-container-${darkmode ? "dark" : "light"}`}
            ref={ref}
            ref={props.inViewRef}
            style={{
                marginTop: 25,
                marginBottom: 25,
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 10,
                width: props.windowDimensions.width > 500 ? 500 : "75vw",
            }}
        >
            <p
                className={`${languageContext.className} Bio-section-header-${
                    darkmode ? "dark" : "light"
                }`}
                style={{
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
                darkmode={darkmode ? "dark" : "light"}
            />
            <Lastname
                languageContext={languageContext}
                styleContext={styleContext}
                darkmode={darkmode ? "dark" : "light"}
            />
            <Born
                languageContext={languageContext}
                styleContext={styleContext}
                darkmode={darkmode ? "dark" : "light"}
            />
            <Age
                languageContext={languageContext}
                styleContext={styleContext}
                darkmode={darkmode ? "dark" : "light"}
            />
            <Status
                languageContext={languageContext}
                styleContext={styleContext}
                darkmode={darkmode ? "dark" : "light"}
            />
            <Goal
                languageContext={languageContext}
                styleContext={styleContext}
                darkmode={darkmode ? "dark" : "light"}
            />
            <Achievement
                languageContext={languageContext}
                styleContext={styleContext}
                darkmode={darkmode ? "dark" : "light"}
            />
        </div>
    )
})

export default Bio
