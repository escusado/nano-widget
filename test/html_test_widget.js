'use strict';

class HTMLTestWidget extends NanoWidget {

  _getHTML () {
    return `
      <div class="my custom element classes">
        Custom HTML Content
        <input type="text" class="my-value" value="my value before click">
        <button class="my-button">Click me!</button>
      </div>
    `;
  }

  constructor () {
    super();

    this.myValueEl = this.element.querySelector('.my-value');
    this.testButtonEl = this.element.querySelector('.my-button');

    console.log('ppp', this.myValueEl, this.testButtonEl);

    this._bindEvents();
  }

  _bindEvents () {
    this.testButtonEl.addEventListener('click', this._clickHandler.bind(this));
  }

  _clickHandler (ev){
    console.log('Click catched!');
    this.myValueEl.value = 'my value AFTER click';
  }

};
