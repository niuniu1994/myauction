
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0


## Install

    $ git clone https://github.com/niuniu1994/myauction.git
    $ cd PROJECT_TITLE
    $ npm install

## Simple build for production

    $ npm run build

## Running the project

    $ npm run start


## API Reference

Our application provide the API documentation with Swagger UI. For accessing the API documentation, 
use needs to lance the application and visite http://localhost:3000/documentation

## Configure app
We are using `config` libray to make the application configurable for different deployment environments that read the system environement variable `NODE_ENV` to decide which configuration file to apply.    

For instance, you want to apply `dev.json` as the configuration file of the application then the `NODE_ENV = dev`

Open `auction/config` then you can add your own configuration file.

For more information please visite  https://www.npmjs.com/package/config


# Checkpoints report for the project

You **MUST** append a filled copy of this document at the end of your `README.MD`.

This document serves three main purposes:
- providing you a clear list of my expectations (check each point when done) ;
- ensuring I do not miss some of your engineering during the review ;
- asking for additional information that helps me during the review.

## Notice

Check every applicable checkbox in the above list. For each one, provide the requested additional information.

In your explanation, please provide links (file + line) to relevant parts of your source code and tests if applicable.

### Caption

🔵 means the checkbox is mandatory. If missing or absolutely not satisfying, it may cost you 0.5 penalty point.

## Expectations

### Input validation

- [ 👍 ] Strictly and deeply validate the type of every input (`params, querystring, body`) at runtime before any processing. **[1 point]** 🔵

> How did you achieve this?
With help of Fastify schema for more info please check https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/

- [  👍 ] Ensure the type of every input can be inferred by Typescript at any time and properly propagates across the app. **[1 point]** 🔵

> How did you achieve this?
Using interface to describe the data structure of object, for some parametes in url we set them in schema of route

- [ 👍 ] Ensure the static and runtime input types are always synced. **[1 point]** 🔵
> How did you achieve this? If extra commands must be run before the typescript checking, how do you ensure there are run?
We verify it with fastify schema so all the input data must repesct the schema



### Authorisation

- [ 👍] Check the current user is allowed to call this endpoint. **[1 point]** 🔵
> How did you achieve this?
Route implemented with Fastify and tested with postman
- [👍] Check the current user is allowed to perform the action on a specific resource. **[1 point]** 🔵
> How did you achieve this?
 Our autorisation system is based on jwt token. Basicly, once user login a token with his info will be returnd and for certain apis the application will check if the request brings token with it and decode the token and check the info keep inside to verify if the user who send the request has the accessbility to the endpoint.
- [ 👍 ] Did you build or use an authorisation framework, making the authorisation widely used in your code base? **[1 point]**
> How did you achieve this?
We are using "fastify-auth" and "fastify-jwt" in the projet

- [] Do you have any way to ensure authorisation is checked on every endpoint? **[1 point]**
> It is pretty easy to forget authorising some action.
> For obvious reasons, it may lead to security issues and bugs.
> At work, we use `varvet/pundit` in our `Ruby on Rails` stack. It can raise exception just before answering the client if authorisation is not checked.
> https://github.com/varvet/pundit#ensuring-policies-and-scopes-are-used
> 
> How did you achieve this?

### Secret and configuration management

- [ 👍] Use a hash for any sensitive data you do not need to store as plain text. 🔵
> Also check this if you do not store any password or such data (and say it here).
The password is encrybtd with alog bcrypt
- [ ] Store your configuration entries in environment variables or outside the git scope. **[1 point]** 🔵
> How did you achieve this?
Using  "config" library from npm 
- [ ] Do you provide a way to list every configuration entries (setup instructions, documentation, requireness... are appreciated)? **[1 point]**
> How did you achieve this?

- [ ] Do you have a kind of configuration validation with meaningful error messages? **[1 point]**
> How did you achieve this?

### Package management

- [ 👍 ] Do not use any package with less than 50k downloads a week. 🔵

- [ ] Did you write some automated tools that check no unpopular dependency was installed? If yes, ensure it runs frequently. **[1 point]**
> How did you achieve this? A Github Action (or similar) and compliance rule for pull requests are appreciated.

- [ 👍] Properly use dependencies and devDevepencies in your package.json. **[0.5 points]**
> How did you achieve this?
some dependencys for dev should use npm install xx --save-dev to install for exemple 'mocha' and 'chai' 

### Automated API generation

- [👍] Do you have automated documentation generation for your API (such as OpenAPI/Swagger...)? **[1 point]** 
> How did you achieve this?🔵
> You must link your documentation for review (a Github page, a ZIP archive, an attachment to the release notes...).
http://localhost:3000/documentation

- [👍] In addition to requireness and types, do you provide a comment for every property of your documentation? **[1 point]**
> How did you achieve this?
add them in the schema
- [ 👍 ] Do you document the schema of responses (at least for success codes) and provide examples of payloads? **[1 point]**
> How did you achieve this?
http://localhost:3000/documentation

- [ ] Is your documentation automatically built and published when a commit reach the develop or master branches? **[1 point]**
> How did you achieve this?

### Error management

- [👍] Do not expose internal application state or code (no sent stacktrace in production!). **[1 point]** 🔵
> How did you achieve this?
 create a error handler with Fastify
- [ ] Do you report errors to Sentry, Rollbar, Stackdriver… **[1 point]**
> How did you achieve this?

### Log management

- [👍] Mention everything you put in place for a better debugging experience based on the logs collection and analysis. **[3 points]**
> How did you achieve this?
Using Fastify to log

- [👍 ] Mention everything you put in place to ensure no sensitive data were recorded to the log. **[1 point]**
> How did you achieve this?
only basic info is logged like id of object
### Asynchronous first

- [👍] Always use the async implementations when available. **[1 point]** 🔵
> List all the functions you call in their async implementation instead of the sync one.
> 
> Ex: I used `await fs.readFile` in file `folder/xxx.ts:120` instead of `fs.readFileSync`.
most of functions used are  async functions

- [👍] No unhandled promise rejections, no uncaught exceptions… **[1 point]** 🔵
> For example, how do you ensure every promise rejection is caught and properly handled?
> Tips: one part of the answer could be the use of a linter.
using try catch in the code, and there existe error handler that will catch all exception throwed out
### Code quality

- [👍] Did you put a focus on reducing code duplication? **[1 point]**
> How did you achieve this?
seperate code with mutiple layer like service , route and put encapsulate function in independent file in order to use it anywhere


- [ ] Eslint rules are checked for any pushed commit to develop or master branch. **[1 point]**
> Please provide a link to the sample of Github Action logs (or similar).

### Automated tests

- [  👍 ] You implemented automated specs. **[1 point]** 🔵
> Please provide a link to the more complete summary you have.
 run npm run test
- [ 👍] Your test code coverage is 75% or more.  **[1 point]** 🔵
> Please provide a link to the `istanbul` HTML coverage summary (or from a similar tool).
after runing npm run test you can find the report in coverage/index.html

- [ ] Do you run the test on a CD/CI, such as Github Action? **[1 point]**
> Please provide a link to the latest test summary you have, hosted on Github Action or similar.
