import * as React from "react"
import Modal from "react-modal"

import { isBrowser, isMobile } from "react-device-detect"

const modalCloseTimeoutMs = 300

export default function EducationInfoModal(props) {
    return (
        <>
            <Modal
                closeTimeoutMS={modalCloseTimeoutMs}
                isOpen={props.open}
                onRequestClose={() => {
                    props.closeModal()
                }}
                ariaHideApp={false}
                style={{
                    overlay: {
                        marginLeft: 15,
                        marginRight: 15,
                        marginTop: Math.abs(props.topBarBottomMargin),
                        zIndex: 1001,
                        backgroundColor: "transparent",
                        borderRadius: 5,
                        animation: props.open
                            ? "modalFadeIn 0.3s ease-out forwards"
                            : "modalFadeOut 0.3s ease-out forwards",
                    },
                    content: {
                        backgroundColor: "#f8f9fa",
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                    },
                }}
                contentLabel="Example Modal"
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                    }}
                    onClick={() => {
                        props.closeModal()
                    }}
                >
                    <p style={{ color: "#212529", textAlign: "center" }}>
                        {props.title}
                    </p>
                    <p style={{ color: "#6c757d", textAlign: "start" }}>
                        {props.text}
                    </p>
                </div>
            </Modal>
        </>
    )
}
