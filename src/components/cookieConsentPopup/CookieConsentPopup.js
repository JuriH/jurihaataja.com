import * as React from "react"
import CookieConsent from "react-cookie-consent"
import waitForElement from "../../utils/waitForElement"
import { isBrowser } from "react-device-detect"
import { useCookiesContext } from "../../contexts/CookiesProvider"
import { useLanguageContext } from "../../contexts/LanguageProvider"

const text = {
    large: {
        en: "This website uses cookies to enhance the user experience",
        fi: "Sivusto käyttää evästeitä käyttäjäkokemuksen parantamiseksi",
    },
    small: {
        en: "No personal information will be collected",
        fi: "Henkilötietoja ei kerätä",
    },
    button: {
        accept: {
            en: "Accept",
            fi: "Hyväksy",
        },
        decline: {
            en: "Decline",
            fi: "Hylkää",
        },
    },
}

// Display cookies consent if user hasn't accepted them yet or has cleared cookies for the webpage
function displayCookieConsent(cookiesContext) {
    const cookieConsentStatus = cookiesContext.cookies.get(
        cookiesContext.cookiesConsentName
    )
    if (cookieConsentStatus === undefined) return true
    if (cookieConsentStatus === "false") return true
    return false
}

export default function CookieConsentPopup() {
    const languageContext = useLanguageContext()
    const cookiesContext = useCookiesContext()
    const [visible, setVisible] = React.useState(
        displayCookieConsent(cookiesContext)
    )
    const [buttonHovered, setButtonHovered] = React.useState({
        accept: false,
    })

    function updateButtonHovered(button, status) {
        isBrowser && setButtonHovered({ ...buttonHovered, [button]: status })
    }

    React.useEffect(() => {
        waitForElement("#rcc-confirm-button").then((button) => {
            button.addEventListener("mouseenter", () => {
                updateButtonHovered("accept", true)
            })
            button.addEventListener("mouseleave", () => {
                updateButtonHovered("accept", false)
            })
        })
        waitForElement("#rcc-decline-button").then((button) => {
            button.addEventListener("mouseenter", () => {
                updateButtonHovered("decline", true)
            })
            button.addEventListener("mouseleave", () => {
                updateButtonHovered("decline", false)
            })
        })
        return () => {
            waitForElement("#rcc-confirm-button").then((button) => {
                button.removeEventListener("mouseenter", () => {
                    updateButtonHovered("accept", true)
                })
                button.removeEventListener("mouseleave", () => {
                    updateButtonHovered("accept", false)
                })
            })
            waitForElement("#rcc-decline-button").then((button) => {
                button.removeEventListener("mouseenter", () => {
                    updateButtonHovered("decline", true)
                })
                button.removeEventListener("mouseleave", () => {
                    updateButtonHovered("decline", false)
                })
            })
        }
    }, [])

    return (
        <CookieConsent
            visible={visible}
            location="bottom"
            acceptOnScroll={true}
            enableDeclineButton={true}
            onDecline={() => {
                setVisible(false)
            }}
            hideOnDecline={true}
            declineCookieValue={false}
            onAccept={() => {
                setVisible(false)
            }}
            hideOnAccept={true}
            buttonText={text.button.accept[languageContext.language]}
            declineButtonText={text.button.decline[languageContext.language]}
            cookieName={cookiesContext.cookiesConsentName}
            style={{
                background: "#2b373bf2",
                opacity: visible ? 1 : 0,
                transition: "all .5s ease",
                WebkitTransition: "all .5s ease",
                MozTransition: "all .5s ease",
                pointerEvents: visible ? "normal" : "none",
                justifyContent: "center", // Center buttons on mobile
            }}
            contentStyle={{ cursor: "default", userSelect: "none" }}
            buttonClasses={languageContext.className}
            buttonStyle={{
                color: "#212529",
                borderRadius: 5,
                fontSize: "13px",
                backgroundColor: buttonHovered.accept ? "#5dd9c1" : "#b4fde5",
                transition: "all .5s ease",
                WebkitTransition: "all .5s ease",
                MozTransition: "all .5s ease",
            }}
            declineButtonClasses={languageContext.className}
            declineButtonStyle={{
                color: "#212529",
                borderRadius: 5,
                fontSize: "13px",
                backgroundColor: buttonHovered.decline ? "#ef6461" : "#f57c73",
                transition: "all .5s ease",
                WebkitTransition: "all .5s ease",
                MozTransition: "all .5s ease",
            }}
        >
            <p
                className={languageContext.className}
                style={{
                    margin: 0,
                    transition: "all .5s ease",
                    WebkitTransition: "all .5s ease",
                    MozTransition: "all .5s ease",
                }}
            >
                {text.large[languageContext.language]}
            </p>
            <p
                className={languageContext.className}
                style={{
                    fontSize: 12,
                    marginTop: 5,
                    marginBottom: 0,
                    transition: "all .5s ease",
                    WebkitTransition: "all .5s ease",
                    MozTransition: "all .5s ease",
                }}
            >
                {text.small[languageContext.language]}
            </p>
        </CookieConsent>
    )
}
