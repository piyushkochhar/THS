/*
    The Entry File to handle all APIs
    @Author: Piyush Kochhar
    @DESC : Implementing RESTful API
*/

// Day 4
// RESTful API

const http = require('http');
const https = require('https');
const { StringDecoder } = require('string_decoder');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const fs = require('fs');
const config = require('./config');
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');

// Global Declarations
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

const htttpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
};

const httpsServer = https.createServer(htttpsServerOptions, (req, res) => {
  unifiedServer(req, res);
});

// This is HTTP Server
httpServer.listen(config.httpPort, () => {
  console.log(`Server started at ${config.httpPort} in ${config.envName} mode`);
});

// This is HTTPS Server
httpsServer.listen(config.httpsPort, () => {
  console.log(
    `Server started at ${config.httpsPort} in ${config.envName} mode`
  );
});

// Handle Both HTTP & HTTPS
const unifiedServer = (req, res) => {
  // Get URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get Path Name
  const path = parsedUrl.pathname;

  // To remove "/" from front and back
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the HTTP Method
  const method = req.method.toLowerCase();

  // Get the Query Params (bcz of true in url.parse)
  const queryStringObject = parsedUrl.query;

  // Get the Headers as an object
  const headers = req.headers;

  // Get body/payload from Client to Server
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    // Choose the handler where request should go according to route path
    const chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct the data to send to the chosen handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: helpers.parseJsonToObject(buffer),
    };

    // Route the request tot he handler what we choosed
    chosenHandler(data, (statusCode, payload) => {
      // Use the statusCode called back by the handler
      statusCode = typeof statusCode === 'number' ? statusCode : 200;

      // Use the payload called by the handler or default to empty object
      payload = typeof payload === 'object' ? payload : {};

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Send the finalResponse
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log(statusCode, payloadString);
    });
  });
};

// Implementing a Router
const router = {
  ping: handlers.ping,
  users: handlers.users,
  hobby: handlers.hobby,
  age: handlers.age,
};
