import fs from 'fs';
import path from 'path';

export default (filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);

  const fileContent1 = JSON.parse(fs.readFileSync(path1, {encoding:'utf8'}));
  const fileContent2 = JSON.parse(fs.readFileSync(path2, {encoding:'utf8'}));
  return fileContent1;
};