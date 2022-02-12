export default function Header(props) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: props.fontSize.mainHeader * 1.5 * 3,
            }}
        >
            <p
                style={{
                    fontSize: props.fontSize.mainHeader,
                    color: props.style.content.header.color,
                    margin: 0,
                    textOverflow: "ellipsis",
                }}
            >
                {props.period}
            </p>
        </div>
    )
}
