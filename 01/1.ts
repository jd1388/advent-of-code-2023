import { readInputFile } from '../utilities/input-reader';

const inputData = readInputFile('01/input.txt');

const calibrationValues = inputData.map((inputLine) => {
    const inputCharacters = inputLine.split('');
    const inputNumbers = inputCharacters.filter((inputCharacter) => !isNaN(parseInt(inputCharacter)));
    const calibrationValue = parseInt(`${inputNumbers[0]}${inputNumbers[inputNumbers.length - 1]}`);

    return calibrationValue
});

const calibrationValuesSum = calibrationValues.reduce((currentCalibrationValuesSum, calibrationValue) => currentCalibrationValuesSum + calibrationValue, 0);

console.log('INFO: Sum of all calibration values:', calibrationValuesSum);
