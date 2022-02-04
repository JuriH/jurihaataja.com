// https://stackoverflow.com/a/14731922
export default function calculateAspectRatioFit(
    srcWidth,
    srcHeight,
    maxWidth,
    maxHeight
) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)

    return { width: srcWidth * ratio, height: srcHeight * ratio }
}
