import * as React from "react"
import AnimateHeight from "react-animate-height"
import { IoChevronDown } from "react-icons/io5"
import { useLanguageContext } from "../../contexts/LanguageProvider"

const text = {
    header: {
        en: "Info",
        fi: "Info",
    },
}

const Info = (props) => {
    const languageContext = useLanguageContext()

    const multiplier = props.fontSize.longText * 1.5
    const headerMarginBottom = 5

    const [innerTextHeight, setInnerTextHeight] = React.useState(null)
    const [revealed, setRevealed] = React.useState(false)

    // Calculate the height for the actual info-text based on the font size and grid cell's height
    const infoContentHeight =
        Math.ceil(
            (props.containerHeightPx * 0.5 -
                props.fontSize.text * 1.5 -
                headerMarginBottom) /
                multiplier
        ) * multiplier

    const maxTextLines = infoContentHeight / (props.fontSize.longText * 1.5)

    const [textOverflow, setTextOverflow] = React.useState(null)
    React.useEffect(() => {
        textOverflow &&
            console.log(
                "Text overflows at index: " +
                    props.index +
                    ": " +
                    (textOverflow === true)
            )
        // eslint-disable-next-line
    }, [textOverflow])

    // Get the whole height of the text, including the overflown, hidden text
    function checkTextOverflow() {
        const innerTextHeight = document.body.querySelectorAll(
            '[data-testid="info-text"]'
        )[props.index + 1].scrollHeight
        console.log(
            "innerTextHeight: " +
                innerTextHeight +
                " vs container: " +
                infoContentHeight
        )
        setInnerTextHeight(innerTextHeight)
        setTextOverflow(innerTextHeight > infoContentHeight)
    }

    React.useEffect(() => {
        // Un-reveal when switching to another slide
        if (props.currentActiveSlide !== props.index + 1 && revealed)
            setRevealed(false)
        if (props.currentActiveSlide !== props.index + 1) return
        checkTextOverflow()
        // eslint-disable-next-line
    }, [props.currentActiveSlide, props.revealed, languageContext.language])

    // Un-reveal Info-container on language change
    React.useEffect(() => {
        revealed && setRevealed(false)
    }, [languageContext.language])

    const InfoTextContent = () => (
        <p
            data-testid="info-text"
            className={languageContext.className}
            key={props.info}
            style={{
                display: "-webkit-box", // Makes ellipsis work
                WebkitLineClamp: revealed ? 999 : maxTextLines,
                WebkitBoxOrient: "vertical",
                height: innerTextHeight,
                // transition: "all 0.5s ease-in-out",
                maxWidth: `calc(100% - ${
                    props.padding.left + props.padding.right
                }px)`,
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.5,
                textAlign: "start",
                margin: 0,
                color: props.style.content.text.color,
                fontSize: props.fontSize.longText,
                paddingLeft: props.padding.left * 2,
                paddingRight: props.padding.right * 2,
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
            }}
        >
            {props.info[languageContext.language]}
        </p>
    )

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                textOverflow && setRevealed(!revealed)
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    textAlign: "center",
                }}
            >
                <p
                    style={{
                        display: "flex",
                        margin: 0,
                        fontSize: props.fontSize.text,
                        color: props.style.content.header.color,
                        paddingLeft: props.padding.left,
                        paddingRight: props.padding.right,
                    }}
                >
                    {text.header[languageContext.language]}
                </p>
                {textOverflow && (
                    <IoChevronDown
                        style={{
                            alignSelf: "center",
                            color: "#6c757dBF",
                            transform: revealed ? "rotateX(180deg)" : "",
                            transition: "transform 200ms ease", // smooth transition
                        }}
                        size={14}
                    />
                )}
            </div>
            <AnimateHeight
                duration={500}
                height={revealed ? innerTextHeight : infoContentHeight}
            >
                <InfoTextContent />
            </AnimateHeight>
        </div>
    )
}

export default Info
