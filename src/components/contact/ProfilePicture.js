import calculateAspectRatioFit from "../../utils/calculateAspectRatio"
import profilePicture from "../../assets/profilePicture.png"
import { useDarkmodeContext } from "../../contexts/DarkmodeProvider"

import "../../App.css"
export default function ProfilePicture() {
    const darkmodeContext = useDarkmodeContext()
    const darkmode = darkmodeContext.darkmode

    const keepAspectRatioSize = calculateAspectRatioFit(472, 529, 150, 150)

    return (
        <div style={{ marginBottom: 10 }}>
            <img
                style={{
                    width: keepAspectRatioSize.width,
                    height: keepAspectRatioSize.height,
                    borderRadius: 150,
                    border: `1px solid ${darkmode ? " #343a40" : "#e9ecef"}`,
                }}
                src={profilePicture}
                alt="Me"
            />
        </div>
    )
}
