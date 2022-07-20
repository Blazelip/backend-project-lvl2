import _ from 'lodash';

const processValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const stylish = (diff) => {
  const iter = (tree, fileName) => {
    const result = tree.flatMap((node) => {
      const { name, status, value } = node;

      const filePath = [...fileName, name].join('.');

      switch (status) {
        case 'added':
          return `Property '${filePath}' was added with value: ${processValue(value)}`;
        case 'deleted':
          return `Property '${filePath}' was removed`;
        case 'nested':
          return `${iter(value, [filePath])}`;
        case 'unchanged':
          return [];
        case 'modified':
          return `Property '${filePath}' was updated. From ${processValue(node.value1)} to ${processValue(node.value2)}`;
        default:
          throw new Error(`Type: ${status} is undefined`);
      }
    });
    return result.join('\n');
  };

  return iter(diff, []);
};

export default stylish;
