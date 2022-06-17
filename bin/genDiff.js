#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js'


const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((argument1, argument2) => {
    const content = genDiff(argument1, argument2);
    console.log(content)
  });

program.parse();