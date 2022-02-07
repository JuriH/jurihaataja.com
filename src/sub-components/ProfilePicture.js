import calculateAspectRatioFit from "../utils/calculateAspectRatio"
import profilePicture from "../assets/profilePicture.png"

export default function ProfilePicture() {
    const keepAspectRatioSize = calculateAspectRatioFit(472, 529, 150, 150)
    return (
        <div style={{ marginBottom: 10 }}>
            <img
                style={{
                    width: keepAspectRatioSize.width,
                    height: keepAspectRatioSize.height,
                    borderRadius: 150,
                    border: "1px solid #e9ecef",
                }}
                src={profilePicture}
                alt="Me"
            />
        </div>
    )
}
