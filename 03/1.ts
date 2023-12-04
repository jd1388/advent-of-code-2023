import { readInputFile } from '../utilities/input-reader';

const isPeriod = (character: string) => character === '.';
const isNumber = (character: string) => !isNaN(parseInt(character));

const inputData = readInputFile('03/input.txt');

const engineSchematicRows = inputData.map((line) => line.split(''));

const isFirstColumn = (columnNumber: number) => columnNumber === 0;
const isFirstRow = (rowNumber: number) => rowNumber === 0;
const isLastColumn = (columnNumber: number) => columnNumber === engineSchematicRows[0].length - 1;
const isLastRow = (rowNumber: number) => rowNumber === engineSchematicRows.length - 1;

const enginePartNumbers: number[] = [];

engineSchematicRows.forEach((schematicRow, rowNumber) => {
    schematicRow.forEach((schematicCharacter, columnNumber) => {
        if (isNumber(schematicCharacter) && (columnNumber === 0 || !isNumber(schematicRow[columnNumber - 1]))) {
            const numberDigits: string[] = [];
            let currentNumber = schematicCharacter;
            let hasSchematicSymbolAdjacent = false;
            let currentColumnNumber = columnNumber;

            while (isNumber(currentNumber)) {
                numberDigits.push(currentNumber);

                const characterUpLeft = isFirstRow(rowNumber) || isFirstColumn(currentColumnNumber) ? '.' : engineSchematicRows[rowNumber - 1][currentColumnNumber - 1];
                const characterUp = isFirstRow(rowNumber) ? '.' : engineSchematicRows[rowNumber - 1][currentColumnNumber];
                const characterUpRight = isFirstRow(rowNumber) || isLastColumn(currentColumnNumber) ? '.' : engineSchematicRows[rowNumber - 1][currentColumnNumber + 1];
                const characterLeft = isFirstColumn(currentColumnNumber) ? '.' : schematicRow[currentColumnNumber - 1];
                const characterRight = isLastColumn(currentColumnNumber) ? '.' : schematicRow[currentColumnNumber + 1];
                const characterDownLeft = isLastRow(rowNumber) || isFirstColumn(currentColumnNumber) ? '.' : engineSchematicRows[rowNumber + 1][currentColumnNumber - 1];
                const characterDown = isLastRow(rowNumber) ? '.' : engineSchematicRows[rowNumber + 1][currentColumnNumber];
                const characterDownRight = isLastRow(rowNumber) || isLastColumn(currentColumnNumber) ? '.' : engineSchematicRows[rowNumber + 1][currentColumnNumber + 1];

                const adjacentSymbols = [
                    characterUpLeft,
                    characterUp,
                    characterUpRight,
                    characterLeft,
                    characterRight,
                    characterDownLeft,
                    characterDown,
                    characterDownRight
                ].filter((adjacentCharacter) => !isNumber(adjacentCharacter) && !isPeriod(adjacentCharacter));

                if (adjacentSymbols.length) {
                    hasSchematicSymbolAdjacent = true;
                }

                currentColumnNumber++;
                currentNumber = schematicRow[currentColumnNumber];
            }

            if (hasSchematicSymbolAdjacent) {
                const enginePartNumber = parseInt(numberDigits.join(''));

                enginePartNumbers.push(enginePartNumber);
            }
        }
    });
});

const sumOfEnginePartNumbers = enginePartNumbers.reduce((currentSum, enginePartNumber) => currentSum + enginePartNumber, 0);

console.log(`INFO: Sum of all engine part numbers: ${sumOfEnginePartNumbers}`);
