import { readInputFile } from '../utilities/input-reader';

const replaceNumberWordsWithNumbers = (inputLine: string): string => {
    const numberWords: Record<string, string> = {
        oneight: '18',
        twone: '21',
        threeight: '38',
        fiveight: '58',
        sevenine: '79',
        eightwo: '82',
        eighthree: '83',
        nineight: '98',
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9'
    };

    const inputLineWithNumberWordsReplaced = Object
        .keys(numberWords)
        .reduce((updatedInputLine, numberWord) => updatedInputLine.replaceAll(numberWord, numberWords[numberWord]), inputLine);

    return inputLineWithNumberWordsReplaced;
};

const inputData = readInputFile('01/input.txt');

const calibrationValues = inputData.map((inputLine) => {
    const inputLineWithNumberWordsReplaced = replaceNumberWordsWithNumbers(inputLine);
    const inputCharacters = inputLineWithNumberWordsReplaced.split('');
    const inputNumbers = inputCharacters.filter((inputCharacter) => !isNaN(parseInt(inputCharacter)));
    const calibrationValue = parseInt(`${inputNumbers[0]}${inputNumbers[inputNumbers.length - 1]}`);

    return calibrationValue
});

const calibrationValuesSum = calibrationValues.reduce((currentCalibrationValuesSum, calibrationValue) => currentCalibrationValuesSum + calibrationValue, 0);

console.log('INFO: Sum of all calibration values:', calibrationValuesSum);
