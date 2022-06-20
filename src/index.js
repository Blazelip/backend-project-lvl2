import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const findDiff = (obj1, obj2) => {
  const keys = _.sortBy(Object.keys({...obj1, ...obj2}));

  const result = keys.map((key) => {
    if (!obj2.hasOwnProperty(key)) {
      return {
        name: key,
        value: obj1[key],
        status: 'deleted'
      };
    }

    if (!obj1.hasOwnProperty(key)) {
      return {
        name: key,
        value: obj2[key],
        status: 'added'
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        name: key,
        value1: obj1[key],
        value2: obj2[key],
        status: 'modified'
      };
    }

    return {
      name: key,
      value: obj1[key],
      status: 'unchanged'
    };

  });

  return result;
};

export default (filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);

  const data1 = JSON.parse(fs.readFileSync(path1, { encoding:'utf8' }));
  const data2 = JSON.parse(fs.readFileSync(path2, { encoding:'utf8' }));
  
  const diff = findDiff(data1, data2);

  const result = {};

  for (const prop of diff) {
    switch (prop.status) {
      case 'deleted':
        result[`- ${prop.name}`] = prop.value;
        break;
      case 'added':
        result[`+ ${prop.name}`] = prop.value;
        break;
      case 'modified':
        result[`- ${prop.name}`] = prop.value1;
        result[`+ ${prop.name}`] = prop.value2;
        break;
      case 'unchanged':
        result[prop.name] = prop.value;
        break;
    }
  }

  return JSON.stringify(result);
};

