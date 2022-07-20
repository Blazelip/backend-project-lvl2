import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const getFileContent = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const stylishOutput = getFileContent('stylishOutput.txt');
const plainOutput = getFileContent('plainOutput.txt');
const jsonOutput = getFileContent('jsonOutput.txt');

test('stylishJson', () => {
  expect(genDiff('file1.json', 'file2.json', 'stylish')).toEqual(stylishOutput);
});

test('stylishYml', () => {
  expect(genDiff('file1.yml', 'file2.yml', 'stylish')).toEqual(stylishOutput);
});

test('plainJson', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(plainOutput);
});

test('plainYml', () => {
  expect(genDiff('file1.yml', 'file2.yml', 'plain')).toEqual(plainOutput);
});

test('jsonJson', () => {
  expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(jsonOutput);
});

test('jsonYML', () => {
  expect(genDiff('file1.yml', 'file2.yml', 'json')).toEqual(jsonOutput);
});
