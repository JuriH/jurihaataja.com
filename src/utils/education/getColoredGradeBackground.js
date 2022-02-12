export default function getColoredGradeBackground(grade) {
    switch (true) {
        case grade === 5:
        case grade === null:
            return "#55d6be"
        case grade === 4:
            return "#99d98c"
        case grade === 3:
            return "#fcb75d"
        case [1, 2].includes(grade):
            return "#ff686bBF"
        default:
            return "transparent"
    }
}
