/*
 *Primary File for API
 *
 */

//Dependencies

const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

const server = http.createServer((req, res) => {
  //get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  //get the path
  const path = parsedUrl.pathname;
  const trimedPath = path.replace(/^\/+|\/+$/g, "");

  //get query string from Url
  const queryStringObjetc = parsedUrl.query;

  //get the http method
  const method = req.method.toLowerCase();

  //get the headers as an object
  const headers = req.headers;

  //Get the payload, if any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", data => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end;

    //choose the handler for the request.  If the request does not exist the handler should be routed to handlers.notFound
    // console.log("The router is: ", router[trimedPath]);

    var chooseHandler =
      typeof router[trimedPath] !== undefined
        ? router[trimedPath]
        : handlers.notFound;

    // Construct the data object to be sent to the handlers
    const data = {
      trimedPath,
      queryStringObjetc,
      method,
      headers,
      payload: buffer
    };

    //route the request to the handler specified in the router
    chooseHandler(data, function(statusCode, payload) {
      statusCode = typeof statusCode == "number" ? statusCode : 200;
      payload = typeof payload == "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      //return the response
      res.setHeader("Content-Type", "Appliction/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      //send the response
      console.log("Returning this response:", statusCode, payloadString);
    });
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

const handlers = {};

//Define the sample handler
handlers.sample = (data, callback) => {
  callback(406, { name: "sample handler" });
};

handlers.notFound = (data, callback) => {
  callback(404);
};

const router = {
  sample: handlers.sample
};
