import * as React from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

// For keyboard support
import "swiper/css/navigation"

import "./educationCarousel.css"

import { useLanguageContext } from "../contexts/LanguageProvider"
import { useStyleContext } from "../contexts/StyleProvider"

// import required modules
import { Pagination, Keyboard } from "swiper"

import Header from "../sub-components/education/Header"
import Grade from "../sub-components/education/Grade"
import Info from "../sub-components/education/Info"
import Date from "../sub-components/education/Date"
import TranscriptOfRecords from "./education/TranscriptOfRecords"

import getColoredGradeBackground from "../utils/education/getColoredGradeBackground"

const containerHeightPx = 300

const padding = {
    left: 5,
    right: 5,
}

const fontSize = {
    mainHeader: 18,
    text: 16,
    longText: 14,
}

const text = {
    period: {
        en: "Period",
        fi: "Jakso",
    },
}

export default function EducationCarousel(props) {
    const languageContext = useLanguageContext()
    const styleContext = useStyleContext()

    const pagination = {
        el: ".my-custom-pagination-div",
        clickable: true,
        renderBullet: function (index, className) {
            return (
                '<span class="' +
                className +
                '" style="margin: 5px;' + // If bullets go to multi-line, they are too close to each other vertically without margin
                `background-color: ${getColoredGradeBackground(
                    // Set dynamic background-color to bullet based on period grade
                    props.education.periods[index].grade
                )};` +
                '">' +
                (index + 1) +
                "</span>"
            )
        },
    }

    const [currentActiveSlide, setCurrentActiveSlide] = React.useState(null)
    React.useEffect(() => {
        currentActiveSlide &&
            console.log("Current Active slide: " + currentActiveSlide)
    }, [currentActiveSlide])

    const Divider = () => (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    height: 2,
                    width: "90%",
                    backgroundColor: "#ccdbfdBF",
                }}
            />
        </div>
    )

    return (
        <div style={{ alignItems: "center" }}>
            <Swiper
                className="swiper-container"
                slidesPerView={1}
                loop={true}
                pagination={pagination}
                modules={[Pagination, Keyboard]}
                initialSlide={0}
                keyboard={{
                    enabled: true,
                    onlyInViewport: true,
                }}
                onSlideChange={(swiper) => {
                    setCurrentActiveSlide(swiper.activeIndex)
                }}
            >
                {props.education.periods.map((period, index) => (
                    <SwiperSlide
                        key={period + "slide" + index}
                        style={{
                            height: "auto",
                            backgroundColor: "transparent",
                            width: props.parentWidth,
                        }}
                    >
                        <div
                            className="grid-container"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                width: "100%",
                                paddingLeft: 10,
                                paddingRight: 10,
                            }}
                        >
                            <Header
                                fontSize={fontSize}
                                period={period.period}
                                style={styleContext}
                            />
                            <Grade
                                fontSize={fontSize}
                                padding={padding}
                                grade={period.grade}
                                style={styleContext}
                            />
                            <Info
                                containerHeightPx={containerHeightPx}
                                fontSize={fontSize}
                                padding={padding}
                                info={period.info}
                                style={styleContext}
                                revealed={props.revealed}
                                currentActiveSlide={currentActiveSlide}
                                index={index}
                            />
                            <Date
                                fontSize={fontSize}
                                padding={padding}
                                date={period.date}
                                style={styleContext}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Divider />
            <div
                style={{
                    margin: 10,
                    paddingBottom: 5,
                    borderRadius: 5,
                }}
            >
                <p
                    className={languageContext.className}
                    style={{
                        margin: 0,
                        marginBottom: 10,
                        color: styleContext.content.text.color,
                    }}
                >
                    {text.period[languageContext.language]}
                </p>
                <div className="my-custom-pagination-div" />
                <TranscriptOfRecords />
            </div>
        </div>
    )
}
