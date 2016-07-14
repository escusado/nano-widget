'use strict';

const NanoCustomEventSupport = require('./nano_custom_event_support');

class NanoWidget extends NanoCustomEventSupport {

  constructor (conf) {
    super();

    let _defaults = {
      html : null,
      element : null,
      active : false,
      disabled : false,
      __destroyed : false
    };

    Object.assign(_defaults, conf);
    Object.assign(this, _defaults);

    if (!this.element) {
      this.element = this._getElement();
    }

    if (!this.class) {
      this.class = this._getClass();
    }

    for (let className of this.class.split(' ')) {
      if(className){
        this.element.classList.add(className);
      }
    }
  }

  _getClass () {
    return '';
  }

  _getElement () {
    let elementHolder = document.createElement('div'),
        htmlContent = this.html || this._getHTML().trim();
    elementHolder.innerHTML = htmlContent;
    if (elementHolder.childNodes.length > 1) {
      return elementHolder.childNodes;
    }
    return elementHolder.firstChild;
  }

  _getHTML () {
    return `<div></div>`;
  }

  render (element, beforeElement) {
    if (this.__destroyed === true) {
      console.warn('calling on destroyed object');
    }
    this.dispatch('beforeRender', {
      element : element,
      beforeElement : beforeElement
    });
    this._render(element, beforeElement);
    this.dispatch('render');
    return this;
  }

  _render (element, beforeElement) {
    if (beforeElement) {
      element.insertBefore(this.element, beforeElement);
    } else {
      element.appendChild(this.element);
    }
    return this;
  }

  activate () {
    if (this.__destroyed) {
        console.warn('calling on destroyed object');
    }
    this.dispatch('beforeActivate');
    this._activate();
    this.dispatch('activate');
    return this;
  }

  _activate() {
    this.active = true;
    this.element.classList.add('active');
  }

  deactivate() {
    if (this.__destroyed) {
        console.warn('calling on destroyed object');
    }
    this.dispatch('beforeDeactivate');
    this._deactivate();
    this.dispatch('deactivate');
    return this;
  }

  _deactivate() {
    this.active = false;
    this.element.classList.remove('active');
  }

  enable() {
    if (this.__destroyed) {
        console.warn('calling on destroyed object');
    }
    this.dispatch('beforeEnable');
    this._enable();
    this.dispatch('enable');
    return this;
  }

  _enable() {
    this.disabled = false;
    this.element.classList.remove('disabled');
  }

  disable() {
    if (this.__destroyed) {
        console.warn('calling on destroyed object');
    }
    this.dispatch('beforeDisable');
    this._disable();
    this.dispatch('disable');
    return this;
  }

  _disable() {
    this.disabled = true;
    this.element.classList.add('disabled');
  }

  destroy () {
    if (this.__destroyed) {
        console.warn('calling on destroyed object');
    }
    this.dispatch('beforeDestroy');
    this._destroy();
    this.dispatch('destroy');
    return null;
  }

  _destroy () {
    this.destroyElement();
    this.destroyChildren();
    if (this.parent) {
        this.parent.removeChild(this);
    }
    this.unbindAll();
    this.__destroyed = true;
  }

  destroyElement () {
    this.dispatch('beforeDestroyElement');
    this._destroyElement();
    this.dispatch('destroyElement');
  }

  _destroyElement () {
    if (this.element) {
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    }
    this.element = null;
    return this;
  }

}

module.exports = NanoWidget;
