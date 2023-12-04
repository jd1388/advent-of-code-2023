import { readInputFile } from '../utilities/input-reader';

const isNumber = (character: string) => !isNaN(parseInt(character));
const isGear = (character: string) => character === '*';

const inputData = readInputFile('03/input.txt');

const engineSchematicRows = inputData.map((line) => line.split(''));

const isFirstColumn = (columnNumber: number) => columnNumber === 0;
const isFirstRow = (rowNumber: number) => rowNumber === 0;
const isLastColumn = (columnNumber: number) => columnNumber === engineSchematicRows[0].length - 1;
const isLastRow = (rowNumber: number) => rowNumber === engineSchematicRows.length - 1;

const findFullPartNumber = (rowNumber: number, columnNumber: number): number => {
    const schematicRow = engineSchematicRows[rowNumber];

    if (isNumber(schematicRow[columnNumber - 1])) {
        return findFullPartNumber(rowNumber, columnNumber - 1);
    } else {
        const lastNumberDigitColumn = schematicRow.findIndex((_character, characterColumn) => characterColumn >= columnNumber && !isNumber(schematicRow[characterColumn + 1]));
        const partNumberDigits = schematicRow.slice(columnNumber, lastNumberDigitColumn + 1);

        return parseInt(partNumberDigits.join(''));
    }
};

const gearRatios: number[] = [];

engineSchematicRows.forEach((schematicRow, rowNumber) => {
    schematicRow.forEach((schematicCharacter, columnNumber) => {
        if (isGear(schematicCharacter)) {
            const adjacentGearRatios: number[] = [];

            const characterUpLeft = isFirstRow(rowNumber) || isFirstColumn(columnNumber) ? '.' : engineSchematicRows[rowNumber - 1][columnNumber - 1];
            const characterUp = isFirstRow(rowNumber) ? '.' : engineSchematicRows[rowNumber - 1][columnNumber];
            const characterUpRight = isFirstRow(rowNumber) || isLastColumn(columnNumber) ? '.' : engineSchematicRows[rowNumber - 1][columnNumber + 1];
            const characterLeft = isFirstColumn(columnNumber) ? '.' : schematicRow[columnNumber - 1];
            const characterRight = isLastColumn(columnNumber) ? '.' : schematicRow[columnNumber + 1];
            const characterDownLeft = isLastRow(rowNumber) || isFirstColumn(columnNumber) ? '.' : engineSchematicRows[rowNumber + 1][columnNumber - 1];
            const characterDown = isLastRow(rowNumber) ? '.' : engineSchematicRows[rowNumber + 1][columnNumber];
            const characterDownRight = isLastRow(rowNumber) || isLastColumn(columnNumber) ? '.' : engineSchematicRows[rowNumber + 1][columnNumber + 1];

            if (isNumber(characterUpLeft)) {
                adjacentGearRatios.push(findFullPartNumber(rowNumber - 1, columnNumber - 1));
            }

            if (isNumber(characterUp) && !isNumber(characterUpLeft)) {
                adjacentGearRatios.push(findFullPartNumber(rowNumber - 1, columnNumber));
            }

            if (isNumber(characterUpRight) && !isNumber(characterUp)) {
                adjacentGearRatios.push(findFullPartNumber(rowNumber - 1, columnNumber + 1));
            }

            if (isNumber(characterLeft)) {
                adjacentGearRatios.push(findFullPartNumber(rowNumber, columnNumber - 1));
            }

            if (isNumber(characterRight)) {
                adjacentGearRatios.push(findFullPartNumber(rowNumber, columnNumber + 1));
            }

            if (isNumber(characterDownLeft)) {
                adjacentGearRatios.push(findFullPartNumber(rowNumber + 1, columnNumber - 1));
            }

            if (isNumber(characterDown) && !isNumber(characterDownLeft)) {
                adjacentGearRatios.push(findFullPartNumber(rowNumber + 1, columnNumber));
            }

            if (isNumber(characterDownRight) && !isNumber(characterDown)) {
                adjacentGearRatios.push(findFullPartNumber(rowNumber + 1, columnNumber + 1));
            }

            if (adjacentGearRatios.length === 2) {
                gearRatios.push(adjacentGearRatios[0] * adjacentGearRatios[1]);
            }
        }
    });
});

const sumOfGearRatios = gearRatios.reduce((currentGearRatiosSum, gearRatio) => currentGearRatiosSum + gearRatio, 0);

console.log(`INFO: Sum of all gear ratios: ${sumOfGearRatios}`);
