# Time Server Project with Node.js

This project involves creating a time server using Node.js that responds with the current date and time. Initially, a TCP server is created using the net module, and then an HTTP server is implemented using the http module. The HTTP server responds with the current date and time in a JSON format when accessed via a specific endpoint.

## Description

This repository contains the code and instructions to set up a time server using Node.js on an Ubuntu VM instance.

## Design 
....

## Pre-Requisite/Requirement

To complete this task, you need to have an Ubuntu VM machine. Here are the instructions on how to set it up: [Setting up an Ubuntu VM on GCP](link-to-vm-setup-instructions).

## Implementation

### Step 1: Update the Package List

First, update the package list on your Ubuntu instance to ensure you have the latest package information.

```bash
$ sudo apt update
```
### Step 2: Install Node.js

#### Install Curl:

```bash
$ curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```
This command downloads and runs a script that configures your package manager to use the NodeSource repository. This repository contains the necessary packages for installing Node.js version 18.x.
This script updates your system’s package sources to include the NodeSource repository, which is specifically configured to provide Node.js packages.
After the repository is added, you still need to install Node.js from this repository. This is done using the command:
```bash
$ sudo apt install nodejs
```
### Check Node.js and npm Versions:
```bash
$ node -v
$ npm -v
```
### Step 3: Create Node.js Project
Create a folder:
Create a folder named student-info-server for the project:

```bash
$ mkdir student-info-server
$ cd student-info-server
```
#### Initialize a New Node.js Project: This creates a package.json file with default settings to manage project dependencies:
```bash
$ npm init -y
```
Installing express: this installs the Express framework and adds it to the project's dependencies:
```bash
$ npm install express
```
### Step 4: Creating the TIME SERVER Script

The timeserver.js file is being created to serve as a server application that responds with the current date and time. Create the file and copy the following information into it:

```bash
$ vi time_server.js
```
```js
const http = require('http');
const url = require('url');

function parsetime(time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  };
}

function unixtime(time) {
  return { unixtime: time.getTime() };
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const time = new Date(parsedUrl.query.iso);
  let result;

  if (parsedUrl.pathname === '/api/parsetime') {
    result = parsetime(time);
  } else if (parsedUrl.pathname === '/api/unixtime') {
    result = unixtime(time);
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(Number(process.argv[2]), () => {
  console.log('Node server running on http://localhost:' + process.argv[2]);
});
```
Run the server by executing the following command in your terminal:
```bash
$ node time-server.js 8000
```
To check on the browser, you need to have an external IP address. In my case, I can go back to my VM and copied the external IP address.

" http://35.208.204.75:8000/api/parsetime?iso=2013-08-10T12:10:15.474Z"
![Time Server Result](https://raw.githubusercontent.com/Senedaa/Cloud-Computing/main/JavaScript/Time-Server/images/vm.png)


Step 5: Result
The result is as shon below:

![Time Server Result](https://raw.githubusercontent.com/Senedaa/Cloud-Computing/main/JavaScript/Time-Server/images/result.png)

## Google Slide Presentation

https://docs.google.com/presentation/d/1RrO__E5jH1pj5sDdbzeU8Uul9VPKVmKR/edit#slide=id.p1

##Appendix


