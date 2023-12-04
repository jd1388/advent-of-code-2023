import fs from 'fs';

export const readInputFile = (filePath: string): string[] => fs
    .readFileSync(filePath)
    .toString()
    .split('\n');
