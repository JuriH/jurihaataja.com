import { useLanguageContext } from "../contexts/LanguageProvider"
import { useDarkmodeContext } from "../contexts/DarkmodeProvider"

// const text = {
//     footer: {
//         en: "© Juri Haataja 2022",
//         fi: "© Juri Haataja 2022",
//     },
// }

export default function Footer() {
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

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
            <p
                className={languageContext.className}
                style={{
                    fontSize: 12,
                    color: darkmode ? "#f8f9fa" : "#212529",
                }}
            >
                {"© Juri Haataja 2022"}
            </p>
        </div>
    )
}
