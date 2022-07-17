import _ from 'lodash';

const stringify = (data, depth, replacer) => {
  if (!_.isObject(data)) {
    return data;
  }

  const indentForKey = replacer.repeat(depth + 3);
  const indentForBracket = replacer.repeat(depth + 1);
  const lines = Object.entries(data)
    .map(([key, value]) => `${indentForKey}${key}: ${stringify(value, depth + 2, replacer)}`);

  return ['{', ...lines, `${indentForBracket}}`].join('\n');
};

const stylish = (diff, replacer = '  ') => {
  const iter = (tree, depth) => tree.map((node) => {
    const { name, status, value } = node;
    const indent = replacer.repeat(depth);
    const indentForBracket = replacer.repeat(depth + 1);

    const makeLine = (val, mark) => `${indent}${mark} ${name}: ${stringify(val, depth, replacer)}`;

    switch (status) {
      case 'added':
        return makeLine(value, '+');
      case 'deleted':
        return makeLine(value, '-');
      case 'nested':
        return `${indent}  ${name}: ${['{', ...iter(value, depth + 2), `${indentForBracket}}`].join('\n')}`;
      case 'unchanged':
        return makeLine(value, ' ');
      case 'modified':
        return [`${makeLine(node.value1, '-')}`,
          `${makeLine(node.value2, '+')}`].join('\n');
      default:
        throw new Error(`Type: ${status} is undefined`);
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default stylish;
