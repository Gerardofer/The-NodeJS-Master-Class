/*
 *Create and store configuration variables
 *
 */

//Container for all the environments

const environments = {};

//Create a staging object
environments.staging = {
  port: 3000,
  envName: "staging"
};

//Production Object
environments.production = {
  port: 5000,
  envName: "production"
};

//Determine which environment was passed as a command line argument
var currentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

//check that the current environment is on of the environments defined above, if not, default to staging
var environmentToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.staging;

//export the module
module.exports = environmentToExport;
