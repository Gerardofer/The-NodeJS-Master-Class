/*
 *Primary File for API
 *
 */

//Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");

//Server should responde to all request with a string
const server = http.createServer((req, res) => {
  //get the url and parse it
  const parsedUrl = url.parse(req.url, true);
  //get the path of the url
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  //get the query string as an object
  const queryStringObject = parsedUrl.query;

  //Get the http method
  const method = req.method.toLowerCase();

  //Get the headers as an object
  const headers = req.headers;

  //Get the payload, if any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", data => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();
    //choose the handler this request should go to, if one not found choose notFound handler
    const chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    //construct data object to send to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    };
    //Route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload) {
      //Use the status code called by the handler, or default to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;
      //Use the payload called back by the handler or default to empty object
      payload = typeof payload == "object" ? payload : {};
      //convert the payload to a string
      const payloadString = JSON.stringify(payload);

      //send the response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      //log the path of the request
      console.log("Returning this response", statusCode, payloadString);
    });
  });
});
//start the serve and have it listen on port 3000
server.listen(config.port, () => {
  console.log(
    `The Server is listening on PORT ${config.port} in ${config.envName} mode`
  );
});

//Define the handlers
const handlers = {};

//Define sample handler
handlers.sample = (data, callback) => {
  //callback an http status code, return a payload (as an object)
  callback(406, { name: "sample handler" });
};

//define a not fount handler
handlers.notFound = (data, callback) => {
  callback(404);
};
//Define a request router
const router = {
  sample: handlers.sample
};
