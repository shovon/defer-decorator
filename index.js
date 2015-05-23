/**
 * Decorates the target method, so that the call to the target method is done
 * asynchronously.
 *
 * @param {Function} target
 * @param {String} name
 * @param {Object} descriptor
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = decorator;
exports.defer = defer;

function decorator(target, name, descriptor) {
  descriptor.value = decorate(descriptor.value);
}

/**
 * Decorates the supplied function so that the call itself is done
 * asynchronously.
 *
 * @param {Function} fn
 * @return {Function}
 */

function defer(fn) {
  return decorate(fn);
}

function decorate(fn) {
  return function () {
    var _this = this;

    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    setImmediate(function () {
      fn.bind(_this).apply(undefined, params);
    });
  };
}

