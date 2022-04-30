exports.getTime = (startTime, EndTime) => {
    const time = EndTime - startTime;
    let minutes = new Date(time).getMinutes()
    let seconds = new Date(time).getSeconds() % 60
    if (seconds < 10) seconds = "0" + seconds
    if (minutes < 10) minutes = "0" + minutes
    if (!minutes) return `${seconds} seconds`
    return `${minutes}:${seconds}`;
}

