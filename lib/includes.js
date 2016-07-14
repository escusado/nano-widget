'use strict';

const NanoWidget = require('./nano_widget');

function includes(...modules) {
  let desc, _Mix = class {};

  //if extending NeoWidget
  if (modules.filter((module)=>{return module.name === 'NanoWidget';}).length) {
    modules.splice(modules.indexOf(NanoWidget), 1);
    _Mix = class extends NanoWidget {};
  }

  for (let module of modules) {
    for (let key of Object.getOwnPropertyNames(module.prototype)) {
      desc = Object.getOwnPropertyDescriptor(module.prototype, key);
      if (key !== 'constructor' && key !== 'name') {
        Object.defineProperty(_Mix.prototype, key, desc);
      }
    }
  }

  return _Mix;
}

module.exports = includes;
