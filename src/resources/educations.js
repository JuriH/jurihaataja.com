let educations = [
    {
        nameOfSchool: {
            long: "Oulu University of Applied Sciences",
            short: "OAMK",
        },
        yearStarted: 2019,
        yearEnded: null,
        specialization: "Software Engineer",
        periods: [
            {
                period: "Product Design and Implementation",
                grade: 5,
                info: "Developed a Proof-of-Concept marketplace app for both Android and iOS with React Native.\nIt uses Google's Firebase for authentication and Firestore as database. REST API is implemented with Firebase Functions.",
                date: new Date("2021-12-22"),
            },
            {
                period: "Advanced Studies of Software Development",
                grade: 5,
                info: "Studied iOS programming with Swift, analyzed HTTP-traffic with Wireshark and got familiar with Amazon Web Services (AWS) as well as basic Linux terminal commands.",
                date: new Date("2021-11-05"),
            },
            {
                period: "Professional Practical Training 2",
                grade: null,
                info: "Developed a Twitter-bot with Node.js and Puppeteer-library for liking and sharing tweets that were related to cryptocurrency projects that I was invested in.",
                date: new Date("2021-10-31"),
            },
            {
                period: "Mobile Application Development Project",
                grade: 5,
                info: "Developed a cryptocurrency price-tracking application for Android, where user could find trackable cryptocurrencies through Binance's API.",
                date: new Date("2021-05-23"),
            },
            {
                period: "Mobile Programming",
                grade: 5,
                info: "Studied Java (Android) programming.",
                date: new Date("2021-03-29"),
            },
            {
                period: "Embedded System Application Project",
                grade: 5,
                info: "Developed a webpage with HTML, CSS and JavaScript for a Unity-based flight simulator.\nUsers could apply temporary effects to a simulator instance through the webpage, for example changing the in-game weather or applying a buff or nerf to the airplane.",
                date: new Date("2021-01-18"),
            },
            {
                period: "Personal Practical Training 1",
                grade: null,
                info: "Developed an Android application for creating and filling-out surveys that never got even close to its pilot-version nor saw the daylight.",
                date: new Date("2020-12-21"),
            },
            {
                period: "Application Development",
                grade: 5,
                info: "Physics, entrepreneurship, Windows Forms and JavaFX.",
                date: new Date("2020-11-13"),
            },
            {
                period: "Software Development Application Project",
                grade: 4,
                info: "Created a Proof-of-Concept fullstack banking application with C#, PHP REST API and MySQL-database.",
                date: new Date("2020-05-12"),
            },
            {
                period: "Basics of Software Development",
                grade: 5,
                info: "C# was added to studied programming languages along with C++.",
                date: new Date("2020-03-16"),
            },
            {
                period: "IT Application Project",
                grade: 4,
                info: "Created a controller with Arduino and distance sensors that could be used for example to control Youtube or Spotify (Web Player) playback.",
                date: new Date("2020-01-21"),
            },
            {
                period: "Introduction to ICT Studies",
                grade: 4,
                info: "Basics of C++ with console/terminal application, electric circuity and resistor calculations.",
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
