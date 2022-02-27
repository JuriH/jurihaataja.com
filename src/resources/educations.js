let educations = [
    {
        nameOfSchool: {
            long: {
                en: "Oulu University of Applied Sciences",
                fi: "Oulun ammattikorkeakoulu",
            },
            short: {
                en: "OAMK",
                fi: "OAMK",
            },
        },
        yearStarted: 2019,
        yearEnded: null,
        specialization: {
            en: "Software Engineer",
            fi: "Ohjelmistokehittäjä",
        },
        transcriptOfRecords:
            "https://drive.google.com/file/d/1SLi_uxva5tFsMQsz7tL64EXOM94TKZpQ/view?usp=sharing",
        periods: [
            {
                period: {
                    en: "Product Design and Implementation",
                    fi: "Tuotesuunnittelu ja toteutus",
                },
                grade: 5,
                info: {
                    en: "Developed a Proof-of-Concept marketplace app for both Android and iOS with React Native.\nIt uses Google's Firebase for authentication and Firestore as database. REST API is implemented with Firebase Functions.",
                    fi: "Kehitin testiversion kauppapaikka sovelluksesta Android:lle sekä iOS:lle käyttäen React Native:a.\nSe käyttää Google Firebase:a autentikointiin sekä Firestore:a tietokantana. Rest API on toteutettu Firebase Functions:lla",
                },
                date: new Date("2021-12-22"),
            },
            {
                period: {
                    en: "Advanced Studies of Software Development",
                    fi: "Vaativammat sovelluskehityksen opinnot",
                },
                grade: 5,
                info: {
                    en: "Studied iOS programming with Swift, analyzed HTTP-traffic with Wireshark and got familiar with Amazon Web Services (AWS) as well as basic Linux terminal commands.",
                    fi: "Opiskelin iOS-ohjelmointoa Swift:llä, analysoin HTTP-liikennettä Wireshark:lla sekä tutustuin Amazon Web Services:iin (AWS) ja Linux:in terminaali komentoihin.",
                },
                date: new Date("2021-11-05"),
            },
            {
                period: {
                    en: "Professional Practical Training 2",
                    fi: "Ammattiharjoittelu 2",
                },
                grade: null,
                info: {
                    en: "Developed a Twitter-bot with Node.js and Puppeteer-library for liking and sharing tweets that were related to cryptocurrency projects that I was invested in.",
                    fi: "Kehitin Twitter-botin Node.js:llä sekä Puppeteer-kirjastolla, joka tykkää ja jakaa twiittejä jotka liittyivät sijoittamiini kryptovaluutta projekteihin.",
                },
                date: new Date("2021-10-31"),
            },
            {
                period: {
                    en: "Mobile Application Development Project",
                    fi: "Mobiilisovellusten kehitysprojekti",
                },
                grade: 5,
                info: {
                    en: "Developed a cryptocurrency price-tracking application for Android, where user could find trackable cryptocurrencies through Binance's API.",
                    fi: "Kehitin kryptovaluuttojen hintojen seurantasovelluksen Android:lle, jossa käyttäjät pystyvät etsimään seurattavia kryptovaluuttoja Binance:n API:en kautta.",
                },
                date: new Date("2021-05-23"),
            },
            {
                period: {
                    en: "Mobile Programming",
                    fi: "Mobiiliohjelmointi",
                },
                grade: 5,
                info: {
                    en: "Studied Java (Android) programming.",
                    fi: "Opiskelin Java-ohjelmointia (Android).",
                },
                date: new Date("2021-03-29"),
            },
            {
                period: {
                    en: "Embedded System Application Project",
                    fi: "Sulautetun järjestelmän sovellusprojekti",
                },
                grade: 5,
                info: {
                    en: "Developed a webpage with HTML, CSS and JavaScript for a Unity-based flight simulator.\nUsers could apply temporary effects to a simulator instance through the webpage, for example changing the in-game weather or applying a buff or nerf to the airplane.",
                    fi: "Kehitin verkkosivun HTML:llä, CSS:llä sekä JavaScript:llä Unity-pohjaiselle lentosimulaattorille.\nKäyttäjät pystyivät aktivoimaan tilapäisiä efektejä simulaattori-instanssiin verkkosivun kautta, kuten esimerkiksi muuttamaan pelin sisäistä säätä sekä tehostamaan tai huonontamaan lentokonetta.",
                },
                date: new Date("2021-01-18"),
            },
            {
                period: {
                    en: "Professional Practical Training 1",
                    fi: "Ammattiharjoittelu 1",
                },
                grade: null,
                info: {
                    en: "Developed an Android application for creating and filling-out surveys that never got even close to its pilot-version nor saw the daylight.",
                    fi: "Kehitin Android-sovelluksen kyselyjen luontiin sekä täyttämiseen joka ei kuitenkaan koskaan päässyt edes pilotti-versioonsa.",
                },
                date: new Date("2020-12-21"),
            },
            {
                period: {
                    en: "Application Development",
                    fi: "Sovelluskehitys",
                },
                grade: 5,
                info: {
                    en: "Physics, entrepreneurship, Windows Forms and JavaFX.",
                    fi: "Fysiikkaa, yrittäjyyttä, Windows Forms:eja sekä JavaFX:ää.",
                },
                date: new Date("2020-11-13"),
            },
            {
                period: {
                    en: "Software Development Application Project",
                    fi: "Ohjelmistokehityksen sovellusprojekti",
                },
                grade: 4,
                info: {
                    en: "Developed a Proof-of-Concept fullstack banking application with C#, PHP REST API and MySQL-database.",
                    fi: "Kehitin testiversion C#:iin painottuvasta fullstack-pankkisovelluksesta, jonka REST API oli toteutettu PHP:lla sekä tietokanta MySQL:llä",
                },
                date: new Date("2020-05-12"),
            },
            {
                period: {
                    en: "Basics of Software Development",
                    fi: "Ohjelmistokehityksen perusteet",
                },
                grade: 5,
                info: {
                    en: "C# was added to studied programming languages along with C++.",
                    fi: "C# lisätty opiskeltaviin kieliin C++:n lisäksi.",
                },
                date: new Date("2020-03-16"),
            },
            {
                period: {
                    en: "IT Application Project",
                    fi: "Tietotekniikan sovellusprojekti",
                },
                grade: 4,
                info: {
                    en: "Created a controller with Arduino and distance sensors that could be used for example to control Youtube or Spotify (Web Player) playback.",
                    fi: "Kehitin etäisyyssensoreihin pohjautuvan Arduino-ohjaimen, jolla pystyi vaikuttamaan esimerkiksi Youtube:n ja Spotify:n (selainversio) mediatoistoon.",
                },
                date: new Date("2020-01-21"),
            },
            {
                period: {
                    en: "Introduction to ICT Studies",
                    fi: "Johdatus tietotekniikan opintoihin",
                },
                grade: 4,
                info: {
                    en: "Basics of C++ with console/terminal application, electric circuity and resistor calculations.",
                    fi: "C++:n perusteet terminaali sovelluksella, sähköpiirejä sekä vastus-laskuja.",
                },
                date: new Date("2019-11-12"),
            },
        ],
    },
]

function sortByDate(index) {
    let periodsCopy = []

    educations[index].periods.forEach((period) => {
        periodsCopy.push(period)
    })

    periodsCopy = periodsCopy.sort((a, b) => a.date - b.date)

    educations[index].periods = periodsCopy
}

sortByDate(0)

export { educations }
