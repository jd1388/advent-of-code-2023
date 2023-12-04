import { readInputFile } from '../utilities/input-reader';
import { Bag, Color, CubeResult, CubeGame } from './types';

const inputData = readInputFile('02/input.txt');

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

const minimumBagsForEachGame = games.map((game) => {
    const bag = game.gameResults.reduce((currentBag: Bag, gameResult) => {
        const updatedBag = gameResult.reduce((currentUpdatedBag: Bag, individualGameResult) => {
            return {
                ...currentUpdatedBag,
                [individualGameResult.color]: currentUpdatedBag[individualGameResult.color] < individualGameResult.count
                    ? individualGameResult.count
                    : currentUpdatedBag[individualGameResult.color]
            }
        }, currentBag);

        return updatedBag;
    }, {
        [Color.RED]: 0,
        [Color.GREEN]: 0,
        [Color.BLUE]: 0
    });

    return bag;
});

const minimumPowerForEachGame = minimumBagsForEachGame.map((bag) => {
    return Object
        .values(bag)
        .reduce((currentPower, colorCount) => currentPower * colorCount, 1);
});

const sumOfMinimumPowersForEachGame = minimumPowerForEachGame.reduce((currentPowerSum, power) => currentPowerSum + power, 0);

console.log(`INFO: Minimum power for each game: ${minimumPowerForEachGame.toString()}`);
console.log(`INFO: Sum of minimum powers: ${sumOfMinimumPowersForEachGame}`);
