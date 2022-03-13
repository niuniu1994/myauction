
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

