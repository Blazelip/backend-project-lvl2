import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const getFileContent = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const stylishOutput = getFileContent('stylishOutput.txt');

test('stylishJson', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(stylishOutput);
});

test('stylishYml', () => {
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(stylishOutput);
});
