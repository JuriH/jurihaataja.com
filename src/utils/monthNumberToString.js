const months = {
    january: {
        en: "January",
        fi: "Tammikuu",
    },
    february: {
        en: "February",
        fi: "Helmikuu",
    },
    march: {
        en: "March",
        fi: "Maaliskuu",
    },
    april: {
        en: "April",
        fi: "Huhtikuu",
    },
    may: {
        en: "May",
        fi: "Toukokuu",
    },
    june: {
        en: "June",
        fi: "Kesäkuu",
    },
    july: {
        en: "July",
        fi: "Heinäkuu",
    },
    august: {
        en: "August",
        fi: "Elokuu",
    },
    september: {
        en: "September",
        fi: "Syyskuu",
    },
    october: {
        en: "October",
        fi: "Lokakuu",
    },
    november: {
        en: "November",
        fi: "Marraskuu",
    },
    december: {
        en: "December",
        fi: "Joulukuu",
    },
}

export default function monthNumberToString(monthNumber, language) {
    return months[Object.keys(months)[monthNumber]][language]

    // if (monthNumber === 0) return months.january[language]
    // if (monthNumber === 1) return months.february[language]
    // if (monthNumber === 2) return months.march[language]

    // if (monthNumber === 3) return months.april[language]
    // if (monthNumber === 4) return months.may[language]
    // if (monthNumber === 5) return months.june[language]

    // if (monthNumber === 6) return months.july[language]
    // if (monthNumber === 7) return months.august[language]
    // if (monthNumber === 8) return months.september[language]

    // if (monthNumber === 9) return months.october[language]
    // if (monthNumber === 10) return months.november[language]
    // if (monthNumber === 11) return months.december[language]
}
