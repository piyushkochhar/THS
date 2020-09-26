/* 
    This file contains global config variables
*/

const environments = {};

// Default or Preproduction environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging',
  hashingSecret: 'theHackingSchool',
};

// Production Environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production',
  hashingSecret: 'theHackingSchool',
};

// Decide which environment to be exported
const currentEnvironment =
  typeof process.env.NODE_ENV === 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

/**
 * Check that the current Environment is one of the environments above, if not we
 * can default to staging mode
 *  */

const environmentToExport =
  typeof environments[currentEnvironment] === 'object'
    ? environments[currentEnvironment]
    : environments.staging;

module.exports = environmentToExport;
