---
layout: post
title:  "Create a nodejs package for AWS lambda using npm"
date:   2018-03-02 12:15:04 +0530
categories: cloud
tags:
  - aws
  - aws-lambda
  - nodejs
  - npm
share: true
read_time: true
---

Creating a node.js package for AWS lambda is described [here](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html) in detail. Basically, we have to bundle our javascript code and dependent node modules from `node_mdules/` directory. In simple scenario, it would be as simple as following command:

```
$zip package.zip index.js node_modules 
```

The above command will create a package with the project code with index.js and all dependencies installed under `node_modules/`. I find this a bit over bundling as all `dev-dependencies` will be part of package. Thus making the package as oversized unnecessarily for AWS lambda. 

Consider, following `package.json` file

```
{
  "name": "lambda-nodejs-package",
  "version": "1.0.0",
  "description": "Example of nodejs for AWS lambda",
  "main": "index.js",
  "keywords": [
    "npm"
  ],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "aws-sdk": "^2.192.0",
    "elasticsearch": "^13.2.0",
    "http-aws-es": "^4.0.0"
  },
  "devDependencies": {
    "chai": "latest",
    "istanbul": "latest",
    "jshint": "latest",
    "mocha": "latest",
    "nyc": "latest",
    "sinon": "latest"
  },
  ...
}
```

This project has `dev-dependencies` and probably we do not want to include these modules from `node_modules/` directory during aws lambda package creation. I tried to find for a handy utility to create a package for for aws lambda, but I could not found any useful in this context.

Few days later I came across a good article about using [npm as build tool](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/). This gave me an idea to see If I can make use of `npm ls --production`, thus I finally come up with following command to create a nodejs package using unix commands.

```
 "build": "zip -r $npm_package_name-$npm_package_version.zip package.json README.md index.js `npm ls --production --parseable | grep node_modules | sed -r -e 's/(.*)$npm_package_name\\///g'`"
```

This command will create a zip package with name `name-version.zip` with contents as `package.json`, `READMe.md`, `index.js`, and `dependencies` excluding the `dev-dependencies`.

`npm ls --production --parsable` will list all the producton dependencies with absolute path, thus to remove initial path the `sed` command is used.

Final `package.json` will be:

```
{
  "name": "lambda-nodejs-package",
  "version": "1.0.0",
  "description": "Example of nodejs for AWS lambda",
  "main": "index.js",
  "scripts": {
    "clean": "rm $npm_package_name-$npm_package_version.zip",
    "build": "zip -r $npm_package_name-$npm_package_version.zip package.json README.md index.js `npm ls --production --parseable | grep node_modules | sed -r -e 's/(.*)$npm_package_name\\///g'`",
    "prebuild": "npm run clean"
  },
  "keywords": [
    "npm"
  ],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "aws-sdk": "^2.192.0",
    "elasticsearch": "^13.2.0",
    "http-aws-es": "^4.0.0"
  },
  "devDependencies": {
    "chai": "latest",
    "istanbul": "latest",
    "jshint": "latest",
    "mocha": "latest",
    "nyc": "latest",
    "sinon": "latest"
  },
  ...
}
```

The following `npm` command will create the package:

```
$npm run build
```

I hope this will be helpful for many to create a node.js package for AWS Lambda.

