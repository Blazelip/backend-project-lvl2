import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { fileURLToPath } from 'url';
import parser from './parser.js';

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

const stylish = (tree, space = '*', spacesCount = 2) => {
  // console.log('CURRENT TREE', tree);

  const iter = (node, depth) => {
    // console.log('CURRENT NODE', node);

    const indentSize = depth * spacesCount;
    const currentIndent = space.repeat(indentSize);

    const result = node.flatMap((item) => {
      switch (item.status) {
        case 'deleted':
          return `${currentIndent}- ${item.name}: ${item.value}`;
        case 'added':
          return `${currentIndent}+ ${item.name}: ${item.value}`;
        case 'nested':
          return `${currentIndent}  ${item.name}: ${iter(item.value, depth + 1)}`;
        case 'modified':
          return `${currentIndent}- ${item.name}: ${item.value1}\n${currentIndent}+ ${item.name}: ${item.value2}`;
        case 'unchanged':
          return `${currentIndent}  ${item.name}: ${item.value}`;
        default:
          throw new Error(`Unknown type: '${item.status}'`);
      }
    });

    return `{\n${result.join('\n')}\n${currentIndent}}`;
  };
  return iter(tree, 1);
};

export default (filepath1, filepath2) => {
  const content1 = getFileContent(filepath1);
  const content2 = getFileContent(filepath2);

  const extension1 = getFileType(filepath1);
  const extension2 = getFileType(filepath2);

  const data1 = parser(extension1, content1);
  const data2 = parser(extension2, content2);

  const diff = findDiff(data1, data2);

  return stylish(diff);
};
