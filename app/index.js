/*
 *Primary File for API
 *
 */

//Dependencies

const http = require("http");
const url = require("url");

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

  //send the response
  res.end("Server is now running");

  //log the request path
  console.log("The headers are:", headers);
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
