export enum Color {
    RED = 'red',
    GREEN = 'green',
    BLUE = 'blue'
}

export interface CubeResult {
    count: number;
    color: Color
}

export interface CubeGame {
    gameNumber: number;
    gameResults: CubeResult[][]
}

export type Bag = {
    [T in Color]: number;
}
