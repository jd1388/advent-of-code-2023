import { readInputFile } from '../utilities/input-reader';
import { Bag, Color, CubeResult, CubeGame } from './types';

const inputData = readInputFile('02/input.txt');
const givenBagState: Bag = {
    [Color.RED]: 12,
    [Color.GREEN]: 13,
    [Color.BLUE]: 14
};

const games = inputData.map((gameString) => {
    const [rawGameNumber, rawGameResults] = gameString.split(':');
    const [, gameNumber] = rawGameNumber.split(' ');
    const gameResults = rawGameResults.split(';');
    const mappedGameResults = gameResults.map((gameResult) => {
        const individualCubeResults = gameResult.split(',');

        return individualCubeResults.map((individualCubeResult) => {
            const [cubeCount, cubeColor] = individualCubeResult
                .trim()
                .split(' ');

            return {
                count: parseInt(cubeCount),
                color: cubeColor
            } as CubeResult;
        });
    });

    return {
        gameNumber: parseInt(gameNumber),
        gameResults: mappedGameResults
    } as CubeGame;
});

const possibleGames = games.filter((game) =>
    game.gameResults.filter((gameResult) =>
        gameResult.filter((individualCubeResult) =>
            givenBagState[individualCubeResult.color] < individualCubeResult.count
        ).length > 0    
    ).length === 0
);

const possibleGameNumbers = possibleGames.map(({gameNumber}) => gameNumber);
const possibleGameNumbersSum = possibleGameNumbers.reduce((currentSum, gameNumber) => currentSum + gameNumber, 0);

console.log(`INFO: Possible games: ${possibleGameNumbers.length > 0 ? possibleGameNumbers.toString() : '[]'}`);
console.log(`INFO: Sum of possible game numbers: ${possibleGameNumbersSum}`);
