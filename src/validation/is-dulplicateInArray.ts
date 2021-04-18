const IsDulpicateInArray = (array: any[]) => {
    const set = new Set(array)
    if (set.size !== array.length) {
        return true
    } else {
        return false
    }
}

export default IsDulpicateInArray