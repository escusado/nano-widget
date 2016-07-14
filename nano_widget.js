(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NanoCustomEvent = function () {
  function NanoCustomEvent(type, data) {
    _classCallCheck(this, NanoCustomEvent);

    this.cancelable = true;
    this.currentTarget = null;
    this.timeStamp = 0;
    this.target = null;
    this.type = '';
    this.isPropagationStopped = false;
    this.isDefaultPrevented = false;
    this.isImmediatePropagationStopped = false;
    this.areImmediateHandlersPrevented = false;

    this.type = type;
    if (typeof data !== 'undefined') {
      Object.assign(this, data);
    }
  }

  _createClass(NanoCustomEvent, [{
    key: 'stopPropagation',
    value: function stopPropagation() {
      this.isPropagationStopped = true;
    }
  }, {
    key: 'preventDefault',
    value: function preventDefault() {
      this.isDefaultPrevented = true;
    }
  }, {
    key: 'stopImmediatePropagation',
    value: function stopImmediatePropagation() {
      this.preventImmediateHandlers();
      this.stopPropagation();
    }
  }, {
    key: 'preventImmediateHandlers',
    value: function preventImmediateHandlers() {
      this.areImmediateHandlersPrevented = true;
    }
  }]);

  return NanoCustomEvent;
}();

module.exports = NanoCustomEvent;

},{}],2:[function(require,module,exports){
'use strict';

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NanoWidget = require('./nano_widget');

function includes() {
  var desc = void 0,
      _Mix = function _Mix() {
    _classCallCheck(this, _Mix);
  };

  //if extending NeoWidget

  for (var _len = arguments.length, modules = Array(_len), _key = 0; _key < _len; _key++) {
    modules[_key] = arguments[_key];
  }

  if (modules.filter(function (module) {
    return module.name === 'NanoWidget';
  }).length) {
    modules.splice(modules.indexOf(NanoWidget), 1);
    _Mix = function (_NanoWidget) {
      _inherits(_Mix, _NanoWidget);

      function _Mix() {
        _classCallCheck(this, _Mix);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_Mix).apply(this, arguments));
      }

      return _Mix;
    }(NanoWidget);
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _module = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.getOwnPropertyNames(_module.prototype)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          desc = Object.getOwnPropertyDescriptor(_module.prototype, key);
          if (key !== 'constructor' && key !== 'name') {
            Object.defineProperty(_Mix.prototype, key, desc);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return _Mix;
}

module.exports = includes;

},{"./nano_widget":5}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NanoCustomEvent = require('./custom_event');
var NanoNodeSupport = require('./nano_node_support');

var NanoCustomEventSupport = function (_NanoNodeSupport) {
  _inherits(NanoCustomEventSupport, _NanoNodeSupport);

  function NanoCustomEventSupport() {
    _classCallCheck(this, NanoCustomEventSupport);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NanoCustomEventSupport).apply(this, arguments));
  }

  _createClass(NanoCustomEventSupport, [{
    key: 'bind',
    value: function bind(type, eventHandler) {
      var found = void 0,
          i = void 0,
          listeners = void 0;

      if (!this.eventListeners) {
        this.eventListeners = {};
      }

      if (!this.eventListeners[type]) {
        this.eventListeners[type] = [];
      }

      found = false;

      listeners = this.eventListeners[type];
      for (i = 0; i < listeners.length; i++) {
        if (listeners[i] === eventHandler) {
          found = true;
          break;
        }
      }

      if (!found) {
        this.eventListeners[type].push(eventHandler);
      }

      return this;
    }
  }, {
    key: 'unbind',
    value: function unbind(type, eventHandler) {
      var i = void 0,
          found = void 0,
          listeners = void 0;

      found = false;
      i = 0;

      if (!this.eventListeners) {
        this.eventListeners = {};
      }

      if (typeof eventHandler === 'undefined') {
        this.eventListeners[type] = [];
      }

      listeners = this.eventListeners[type];
      for (i = 0; i < listeners.length; i++) {
        if (listeners[i] === eventHandler) {
          found = true;
          break;
        }
      }

      if (found) {
        this.eventListeners[type].splice(i, 1);
      }

      return this;
    }
  }, {
    key: 'unbindAll',
    value: function unbindAll() {
      if (this.eventListeners) {
        this.eventListeners = null;
      }
      return this;
    }
  }, {
    key: 'dispatch',
    value: function dispatch(type, data) {
      var event = void 0,
          listeners = void 0,
          instance = void 0,
          i = void 0;

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
  }]);

  return NanoCustomEventSupport;
}(NanoNodeSupport);

module.exports = NanoCustomEventSupport;

},{"./custom_event":1,"./nano_node_support":4}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NanoNodeSupport = function () {
  function NanoNodeSupport() {
    _classCallCheck(this, NanoNodeSupport);
  }

  _createClass(NanoNodeSupport, [{
    key: 'appendChild',
    value: function appendChild(child) {
      if (child.parent) {
        child.parent.removeChild(child);
      }

      if (!this.hasOwnProperty('children')) {
        this.children = [];
      }

      this.children.push(child);
      if (child.name) {
        this[child.name] = child;
      }
      child.setParent(this);
      return child;
    }
  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      var position = this.children.indexOf(child);

      if (position !== -1) {
        this.children.splice(position, 1);
        delete this[child.name];
        child.parent = null;
      }

      return child;
    }
  }, {
    key: 'setParent',
    value: function setParent(parent) {
      this.parent = parent;
      return this;
    }
  }, {
    key: 'destroyChildren',
    value: function destroyChildren() {
      var childrenLength = void 0;
      if (this.children) {
        childrenLength = this.children.length;
        while (childrenLength > 0) {
          this.children[0].destroyChildren();
          if (this.children.length === childrenLength) {
            this.children.shift();
          }
          childrenLength--;
        }
      }
      this.children = null;
      return this;
    }
  }]);

  return NanoNodeSupport;
}();

module.exports = NanoNodeSupport;

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NanoCustomEventSupport = require('./nano_custom_event_support');

var NanoWidget = function (_NanoCustomEventSuppo) {
  _inherits(NanoWidget, _NanoCustomEventSuppo);

  function NanoWidget(conf) {
    _classCallCheck(this, NanoWidget);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NanoWidget).call(this));

    var _defaults = {
      html: null,
      element: null,
      active: false,
      disabled: false,
      __destroyed: false
    };

    Object.assign(_defaults, conf);
    Object.assign(_this, _defaults);

    if (!_this.element) {
      _this.element = _this._getElement();
    }

    if (!_this.class) {
      _this.class = _this._getClass();
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _this.class.split(' ')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var className = _step.value;

        if (className) {
          _this.element.classList.add(className);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _this;
  }

  _createClass(NanoWidget, [{
    key: '_getClass',
    value: function _getClass() {
      return '';
    }
  }, {
    key: '_getElement',
    value: function _getElement() {
      var elementHolder = document.createElement('div'),
          htmlContent = this.html || this._getHTML().trim();
      elementHolder.innerHTML = htmlContent;
      if (elementHolder.childNodes.length > 1) {
        return elementHolder.childNodes;
      }
      return elementHolder.firstChild;
    }
  }, {
    key: '_getHTML',
    value: function _getHTML() {
      return '<div></div>';
    }
  }, {
    key: 'render',
    value: function render(element, beforeElement) {
      if (this.__destroyed === true) {
        console.warn('calling on destroyed object');
      }
      this.dispatch('beforeRender', {
        element: element,
        beforeElement: beforeElement
      });
      this._render(element, beforeElement);
      this.dispatch('render');
      return this;
    }
  }, {
    key: '_render',
    value: function _render(element, beforeElement) {
      if (beforeElement) {
        element.insertBefore(this.element, beforeElement);
      } else {
        element.appendChild(this.element);
      }
      return this;
    }
  }, {
    key: 'activate',
    value: function activate() {
      if (this.__destroyed) {
        console.warn('calling on destroyed object');
      }
      this.dispatch('beforeActivate');
      this._activate();
      this.dispatch('activate');
      return this;
    }
  }, {
    key: '_activate',
    value: function _activate() {
      this.active = true;
      this.element.classList.add('active');
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      if (this.__destroyed) {
        console.warn('calling on destroyed object');
      }
      this.dispatch('beforeDeactivate');
      this._deactivate();
      this.dispatch('deactivate');
      return this;
    }
  }, {
    key: '_deactivate',
    value: function _deactivate() {
      this.active = false;
      this.element.classList.remove('active');
    }
  }, {
    key: 'enable',
    value: function enable() {
      if (this.__destroyed) {
        console.warn('calling on destroyed object');
      }
      this.dispatch('beforeEnable');
      this._enable();
      this.dispatch('enable');
      return this;
    }
  }, {
    key: '_enable',
    value: function _enable() {
      this.disabled = false;
      this.element.classList.remove('disabled');
    }
  }, {
    key: 'disable',
    value: function disable() {
      if (this.__destroyed) {
        console.warn('calling on destroyed object');
      }
      this.dispatch('beforeDisable');
      this._disable();
      this.dispatch('disable');
      return this;
    }
  }, {
    key: '_disable',
    value: function _disable() {
      this.disabled = true;
      this.element.classList.add('disabled');
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.__destroyed) {
        console.warn('calling on destroyed object');
      }
      this.dispatch('beforeDestroy');
      this._destroy();
      this.dispatch('destroy');
      return null;
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      this.destroyElement();
      this.destroyChildren();
      if (this.parent) {
        this.parent.removeChild(this);
      }
      this.unbindAll();
      this.__destroyed = true;
    }
  }, {
    key: 'destroyElement',
    value: function destroyElement() {
      this.dispatch('beforeDestroyElement');
      this._destroyElement();
      this.dispatch('destroyElement');
    }
  }, {
    key: '_destroyElement',
    value: function _destroyElement() {
      if (this.element) {
        if (this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      }
      this.element = null;
      return this;
    }
  }]);

  return NanoWidget;
}(NanoCustomEventSupport);

module.exports = NanoWidget;

},{"./nano_custom_event_support":3}],6:[function(require,module,exports){
'use strict';

// web imports

var NanoWidget = require('./nano_widget');
var includes = require('./includes');

window.NanoWidget = NanoWidget;
window.includes = includes;

},{"./includes":2,"./nano_widget":5}]},{},[6]);
