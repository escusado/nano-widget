'use strict';

function includes(...modules) {
  let _Mix = class {};

  for (let module of modules) {
    for (let key of Object.getOwnPropertyNames(module.prototype)) {
      if (key !== "constructor" && key !== "prototype" && key !== "name") {
        let desc = Object.getOwnPropertyDescriptor(module.prototype, key);
        Object.defineProperty(_Mix.prototype, key, desc);
      }
    }
  }

  return _Mix;
}
