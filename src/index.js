/**
 * Decorates the target method, so that the call to the target method is done
 * asynchronously.
 *
 * @param {Function} target
 * @param {String} name
 * @param {Object} descriptor
 */
export default function decorator(target, name, descriptor) {
  descriptor.value = decorate(descriptor.value);
}

/**
 * Decorates the supplied function so that the call itself is done
 * asynchronously.
 *
 * @param {Function} fn
 * @return {Function}
 */
export function defer(fn) {
  return decorate(fn);
}

function decorate(fn) {
  return function (...params) {
    setImmediate(() => { this::fn(...params); });
  }
}
