[![Build Status](https://travis-ci.org/kaelzhang/npm-workstation.svg?branch=master)](https://travis-ci.org/kaelzhang/npm-workstation)
[![Coverage](https://codecov.io/gh/kaelzhang/npm-workstation/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/npm-workstation)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/npm-workstation?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/npm-workstation)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/npm-workstation.svg)](http://badge.fury.io/js/npm-workstation)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/npm-workstation.svg)](https://www.npmjs.org/package/npm-workstation)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/npm-workstation.svg)](https://david-dm.org/kaelzhang/npm-workstation)
-->

# npm-workstation

A tool for managing multiple related JavaScript projects(npm packages), the better replacement of lerna.

## What can npm-workstation do?

With the help of `npm-workstation`, we need not to put multiple npm packages into a [monorepo](https://en.wikipedia.org/wiki/Monorepo), such as [`babel`](https://github.com/babel/babel).

`npm-workstation` could coordinate multiple arbitrary already-existed standalone but related npm packages.

Generally, if you want to do something as lerna does, and you don't want a monorepo, or can't put everything inside a monorepo (because the npm packages already exist), `npm-workstation` will be a good choice.

## Usage

```sh
# Install npmw
npm i -g npm-workstation

# Create a workstation
npmw create foo

cd /path/to/project-1
# Add the current directory to workstation foo,
npmw add . foo
#  or you can use `npmw add /path/to/project-1 foo`

npmw add /path/to/project-2 foo

# Then make changes to project-1 and project-2,
# inside /path/to/project-2
npmw publish
```

A vscode extension is also available to help it much easier to add repos into a single workstation.

## Commands

## Documentations

- Frequently asked questions

## License

[MIT](LICENSE)
