### Hexlet status:
[![Actions Status](https://github.com/Blazelip/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Blazelip/backend-project-lvl2/actions)

[![Tests and linter](https://github.com/Blazelip/backend-project-lvl2/actions/workflows/tests-lint.yml/badge.svg)](https://github.com/Blazelip/backend-project-lvl2/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/1ba2bd3409d1d18af39a/maintainability)](https://codeclimate.com/github/Blazelip/backend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/1ba2bd3409d1d18af39a/test_coverage)](https://codeclimate.com/github/Blazelip/backend-project-lvl2/test_coverage)

# Description: 
**Generator of difference** is the CLI program that generate difference between two files. Supporting formats: JSON, YML, YAML.

## How to install:
1. Make sure you have installed [Node.js](https://nodejs.org/en/) no lower version 12: ```node -v```.
2. Clone repository: ```git@github.com:Blazelip/backend-project-lvl2.git```.
3. Change directory to backend-project-lvl2
4. Run the command: ```make install```.

```shell
$ git clone git@github.com:Blazelip/backend-project-lvl2.git
$ cd backend-project-lvl2
$ make install
```

## Run tests:
```shell
$ make test
```

## How to use:
You can use the project as a script in the terminal or as a library in your JavaScript project. You can format the difference in three styles: stylish (default), plain and json.
```shell
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>
Compares two configuration files and shows a difference.
Options:
  -V, --version          output the version number
  -f, --format <type>    output format (choices: "stylish", "plain", "json", default: "stylish")
  -h, --help             display help for command
```

## Project asciinemas:

#### Help demonstration
[![asciicast](https://asciinema.org/a/xhOyKYnCGkGrrDH8MwX1ksbRH.svg)](https://asciinema.org/a/xhOyKYnCGkGrrDH8MwX1ksbRH)

#### gendiff stylish formatter example
[![asciicast](https://asciinema.org/a/bkFHEi2no2n0eNBSI8T5irjlL.svg)](https://asciinema.org/a/bkFHEi2no2n0eNBSI8T5irjlL)

#### gendiff plain formatter example
[![asciicast](https://asciinema.org/a/cZFjzapg0um8EJic6D3z16jFq.svg)](https://asciinema.org/a/cZFjzapg0um8EJic6D3z16jFq)

#### gendiff json formatter example
[![asciicast](https://asciinema.org/a/BxYnXjYRMba6n7G3SyEXijkPQ.svg)](https://asciinema.org/a/BxYnXjYRMba6n7G3SyEXijkPQ)


