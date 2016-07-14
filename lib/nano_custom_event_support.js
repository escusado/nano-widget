'use strict';

const NanoCustomEvent = require('./custom_event');
const NanoNodeSupport = require('./nano_node_support');

class NanoCustomEventSupport extends NanoNodeSupport {

  bind (type, eventHandler) {
    let found, i, listeners;

    if(!this.eventListeners) {
      this.eventListeners = {};
    }

    if(!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }

    found = false;

    listeners = this.eventListeners[type];
    for (i = 0; i < listeners.length; i++) {
      if(listeners[i] === eventHandler) {
        found = true;
        break;
      }
    }

    if(!found) {
      this.eventListeners[type].push(eventHandler);
    }

    return this;
  }

  unbind (type, eventHandler) {
    let i, found, listeners;

    found = false;
    i = 0;

    if(!this.eventListeners) {
      this.eventListeners = {};
    }

    if(typeof eventHandler === 'undefined') {
      this.eventListeners[type] = [];
    }

    listeners = this.eventListeners[type];
    for (i = 0; i < listeners.length; i++) {
      if(listeners[i] === eventHandler) {
        found = true;
        break;
      }
    }

    if(found) {
      this.eventListeners[type].splice(i, 1);
    }

    return this;
  }

  unbindAll () {
    if(this.eventListeners){
      this.eventListeners = null;
    }
    return this;
  }

  dispatch (type, data) {
    let event, listeners, instance, i;

    if (!this.eventListeners) {
      this.eventListeners = {};
    }

    if (typeof data === 'undefined') {
      data = {};
    }

    if (data.hasOwnProperty('target') === false) {
      data.target = this;
    }

    event = new NanoCustomEvent(type, data);
    listeners = this.eventListeners[type] || [];
    instance = this;

    for (i = 0; i < listeners.length; i = i + 1) {
      listeners[i].call(instance, event);
      if (event.areImmediateHandlersPrevented === true) {
        break;
      }
    }

    return event;
  }
}

module.exports = NanoCustomEventSupport;
