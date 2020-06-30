'use strict';

class ValidationHelper {
    validate (alias, value, options) {
        if (options.hasOwnProperty('required')) {
            validateRequired(alias, value);
        }

        if (options.hasOwnProperty('type')) {
            validateType(alias, value, options.type);
        }
    }
}
/**
 * Validates given value according to given options.
 *
 * @param {string} alias - Alias for the given value. It is used for creation error message.
 * @param {*} value - Value that is checked for validity.
 * @param {object} options - There are 8 options which are listed below.
 * 		- {boolean} required
 * 		- {string} type
 * 		- {Array} possibleValues
 * 		- {number|Date} max
 * 		- {string} maxLength
 * 		- {number|Date} min
 * 		- {string} minLength
 * 		- {RegExp} pattern
 */

function validateRequired (alias, value) {
  if (isNullOrUndefined(value)) {
    throw new Error(alias + ' is required.').setErrorCode('ERR_MISSING_PARAM').setErrorData({alias: alias});
  }
}

function validateType (alias, value, type) {
  switch (type) {
    case 'number':
      if (!isNumber(value)) {
        throw new TypeError(alias + ' is not a "number"').setErrorCode('ERR_INVALID_TYPE').setErrorData({alias: alias, value: value, type: type});
      }
      break;
    case 'date':
      if (!isDate(value)) {
        throw new TypeError(alias + ' is not a "date"').setErrorCode('ERR_INVALID_TYPE').setErrorData({alias: alias, value: value, type: type});
      }
      break;
    default:
      if (!(value instanceof type)) {
        throw new TypeError(alias + ' is not an instance of ' + type).setErrorCode('ERR_INVALID_TYPE').setErrorData({alias: alias, value: value, type: type});
      }
      break;
  }
}


function isDate(value) {
  return (new Date(value) !== "Invalid Date" && !isNaN(new Date(value)));
};

function isNullOrUndefined(value) {
  return (value === undefined || value === null);
};

function isNumber(value) {
  return (typeof value === 'number' || value instanceof Number);
};

module.exports = ValidationHelper;
