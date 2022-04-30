import randomWords from 'random-words';

export const findWordByLength = (minLength, maxLength) => {
    const wordsArray = randomWords({ exactly: 100, maxLength: 10 })
    if (!minLength || minLength < 2)
        minLength = 2;
    if (!maxLength || maxLength < minLength)
        maxLength = minLength;
    const word = wordsArray.find((randWord) => randWord.length >= minLength && randWord.length <= maxLength);
    return word;
}
