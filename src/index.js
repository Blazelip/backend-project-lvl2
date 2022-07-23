import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import parser from './parser.js';
import findDiff from './formatters/findDiff.js';
import formatDiff from './formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFileType = (filepath) => path.extname(filepath).slice(1);

const getFileContent = (filename) => {
  const filePath = path.resolve(__dirname, '..', '__fixtures__', filename);
  const content = fs.readFileSync(filePath, 'utf-8');

  return content;
};

export default (filepath1, filepath2, format = 'stylish') => {
  const content1 = getFileContent(filepath1);
  const content2 = getFileContent(filepath2);

  const extension1 = getFileType(filepath1);
  const extension2 = getFileType(filepath2);

  const data1 = parser(extension1, content1);
  const data2 = parser(extension2, content2);

  const diff = findDiff(data1, data2);

  return formatDiff(diff, format);
};
