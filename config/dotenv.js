/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function () {
  return {
    clientAllowedKeys: ['API_BASE_URL'],
    failOnMissingKey: true,
    path: path.join(path.dirname(__dirname), '.env'),
  };
};
