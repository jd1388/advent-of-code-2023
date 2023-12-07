import { readInputFile } from "../utilities/input-reader";

interface ScratchCard {
  winningNumbers: number[];
  scratchCardNumbers: number[];
}

const convertNumberStringIntoNumbers = (numberString: string): number[] =>
  numberString
    .split(" ")
    .map((rawNumber) => parseInt(rawNumber))
    .filter((number) => !isNaN(number));

const parseScratchCards = (rawScratchCards: string[]): ScratchCard[] => {
  const parsedScratchCards = rawScratchCards.map((rawScratchCard) => {
    const [_cardNumber, numbersOnCard] = rawScratchCard.trim().split(":");

    const [rawWinningNumbers, rawScratchCardNumbers] = numbersOnCard
      .trim()
      .split("|");

    const winningNumbers = convertNumberStringIntoNumbers(rawWinningNumbers);
    const scratchCardNumbers = convertNumberStringIntoNumbers(
      rawScratchCardNumbers
    );

    return {
      winningNumbers,
      scratchCardNumbers,
    };
  });

  return parsedScratchCards;
};

const getPointsScoredFromScratchCard = ({
  winningNumbers,
  scratchCardNumbers,
}: ScratchCard): number => {
  const getScore = (numberOfWinningNumbers: number): number =>
    1 * Math.pow(2, numberOfWinningNumbers - 1);

  const numbersThatWon = winningNumbers.filter((winningNumber) =>
    scratchCardNumbers.includes(winningNumber)
  );

  const score = numbersThatWon.length > 0 ? getScore(numbersThatWon.length) : 0;

  return score;
};

const inputData = readInputFile("04/input.txt");

const scratchCards = parseScratchCards(inputData);

const pointsFromScratchCards = scratchCards
  .map(getPointsScoredFromScratchCard)
  .reduce((totalScore, currentScore) => totalScore + currentScore, 0);

console.log(
  `INFO: Points scored from all scratch cards: ${pointsFromScratchCards}`
);
