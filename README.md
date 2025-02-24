# Overview
This is a react single page application template setup using Redux Saga by default.
Other templates can be found on following branch:
- [form](https://github.com/Webjet/Boilerplate-React/tree/form): Basic form & validation using [formik](https://formik.org/) & [yup](https://github.com/jquense/yup)
- [simpleApp](https://github.com/Webjet/Boilerplate-React/tree/simpleApp): Simple react application without Redux store

# Getting started

## Development

### Dev tools:

-   [Visual Studio Code](https://code.visualstudio.com/)
-   [NodeJs](https://nodejs.org/en/)

### Start:

Install packages:

> `> npm install`

To check outdated packages:

> `> npm outdated`

To update packages:

> `> npm update`

### Commit:

Before commit, run the following to make sure the coding standard & unit tests are good:

> `> npm run pre-commit`

Run standard fix if your javascript does not meet the standard

> `> npm run standard-fix`

### Build

> `> npm run build:wjau` >`> npm run build:wjnz`

### Test Counter Page

> `> npm run start` then browse `http://localhost:9000/#/counter`

## Github Action Pipeline
1. please update imagename/servicename/WEBHOOK_URL in "main.yml" file, more info refer [pipeline](https://github.com/Webjet/platform-docs/blob/master/pipeline/pipeline-setup.md)