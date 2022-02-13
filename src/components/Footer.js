import { useLanguageContext } from "../contexts/LanguageProvider"

const text = {
    footer: {
        en: "Made with ReactJS by Juri Haataja",
        fi: "Tehnyt Juri Haataja ReactJS:llä",
    },
}

export default function Footer() {
    const languageContext = useLanguageContext()

    return (
        <div
            className={languageContext.className}
            style={{
                display: "flex",
                flexDirection: "column",
                height: 50,
                marginTop: 10,
                marginBottom: 5,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <p style={{ fontSize: 12 }}>
                {text.footer[languageContext.language]}
            </p>
        </div>
    )
}
