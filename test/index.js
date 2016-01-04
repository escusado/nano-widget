'use strict';
let eventHandler, myNanoWidget, myOtherNanoWidget, myHTMLWidget;

console.log('Testing NanoWidget');

eventHandler = function (ev) {
  console.log('Event Catched!', this.name);
};

myNanoWidget = new NanoWidget({
  name : 'my First NanoWidget'
});

myOtherNanoWidget = new NanoWidget({
  name : 'my Second NanoWidget'
});

myNanoWidget.bind('my-custom-event', eventHandler);
myOtherNanoWidget.bind('my-custom-event', eventHandler);

myNanoWidget.dispatch('my-custom-event');
myNanoWidget.unbind('my-custom-event');
myNanoWidget.dispatch('my-custom-event');
console.log('Event unbound');
console.log('beforeDestroy', myNanoWidget, myOtherNanoWidget);
myNanoWidget.destroy();
myOtherNanoWidget.destroy();
console.log('afterDestroy', myNanoWidget, myOtherNanoWidget);

myHTMLWidget = new HTMLTestWidget();
myHTMLWidget.render(document.body);
myHTMLWidget.activate();
myHTMLWidget.disable();

//New Module test

class ColorChangeSupport {
  changeColor (newColor) {
    this.element.style.color = newColor;
  }
}

class ColorChangingWidget extends includes(NanoWidget, ColorChangeSupport){};
console.log('ColorChangingWidget.prototype.constructor', ColorChangingWidget.prototype.constructor);
window.myColorChangingWidget = new ColorChangingWidget({
  html : '<div>My color changing widget</div>'
});
myColorChangingWidget.render(document.body);
console.log('Color ColorChangingWidget', myColorChangingWidget);
myColorChangingWidget.changeColor('#0F0');
