import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { fileURLToPath } from 'url';
import parser from './parser.js';
import formatDiff from './formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFileType = (filepath) => path.extname(filepath).slice(1);

const getFileContent = (filename) => {
  const filePath = path.resolve(__dirname, '..', '__fixtures__', filename);
  const content = fs.readFileSync(filePath, 'utf-8');

  return content;
};

const findDiff = (obj1, obj2) => {
  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

  const result = keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return {
        name: key,
        value: obj1[key],
        status: 'deleted',
      };
    }

    if (!Object.hasOwn(obj1, key)) {
      return {
        name: key,
        value: obj2[key],
        status: 'added',
      };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        value: findDiff(obj1[key], obj2[key]),
        status: 'nested',
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        name: key,
        value1: obj1[key],
        value2: obj2[key],
        status: 'modified',
      };
    }

    return {
      name: key,
      value: obj1[key],
      status: 'unchanged',
    };
  });

  return result;
};

export default (filepath1, filepath2, format) => {
  const content1 = getFileContent(filepath1);
  const content2 = getFileContent(filepath2);

  const extension1 = getFileType(filepath1);
  const extension2 = getFileType(filepath2);

  const data1 = parser(extension1, content1);
  const data2 = parser(extension2, content2);

  const diff = findDiff(data1, data2);

  return formatDiff(diff, format);
};
