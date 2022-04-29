import randomWords from 'random-words'
const wordsArray = randomWords({ exactly: 100, maxLength: 10 })
const findWordByLength = (minLength, maxLength) => {
    if (!minLength || minLength < 2)
        minLength = 2;
    if (!maxLength || maxLength < minLength)
        maxLength = minLength
    const word = wordsArray.find((randWord) => { randWord.length >= minLength && randWord <= maxLength })
    return word
}
module.exports = { findWordByLength };