# nano-widget
An es6 UI element API

[Document in progress needs feedback]

# Intro

NanoWidget is a personal interpretation of [azendal's Widget](https://github.com/azendal/neon/blob/master/stdlib/widget.js)
for es6.

A UI API definition to work with DOM UI elements, tries to use most of the native
stuff and offers a standard API that includes:

- Event Support: For easy signaling
- Node Support: To create tree structures with the `Widget`s

More info: http://code.toily.mx/nano-widget/

# API

## Create Widgets
You can create a widget on the fly or have a class in its own file, either way the
API should remain the same.

We can define the content of a `Widget` using an `HTML` string, a `DOM element`:
```javascript
let myOnTheFlyWidget = new NeoWidget({
  html: '<a>Sup!</a>'
});

let myOnTheFlyWidget = new NeoWidget({
  element: document.createElement('a')
});

//or on widget declaration

class MyDeclaredWidget extends NanoWidget {
  _getHTML () {
    return '<a href="#">Sup!</a>';
  }
}

class MyDeclaredWidget extends NanoWidget {
  _getElement () {
    return document.createElement('a');
  }
}

```

## Methods Widget

### `.render(element)`
*`args`*
`element`: Should implement `.appendChild` as normal `DOM node`s do

*`returns`*
`this`: The `Widget` instance

Sugar for `element.appendChild(widget.element);`, based on the principle that the
component instanciating a `Widget` should be responsible of rendering it.

### `.destroy()`
*`returns`*
`null`

Unbinds all events, removes the element using `parent.removeChild(this.element)`,
and destroys all of its children too.

### `.activate() and .deactivate()`
*`returns`*
`this`: The `Widget` instance

Turn the property flag and the element class `active` on the `Widget`. Used in tandem
with css `classes` to define UI states.

### `.disable() and .enable()`
*`returns`*
`this`: The `Widget` instance

Turn the property flag and the element class `disabled` on the `Widget`. Used in tandem
with css `classes` to define UI states.

## Methods NanoNodeSupport

### `.appendChild(child)`
*`args`*
`child`: <Object> An instance, mostly other `Widgets`

*`returns`*
`child`: The new child

Attach a child to the `Widget` `children` array if the child has a `.name`
property its added to the `Widget` instance as a property. This lets us have a
console API for free.

```javascript
//children can be all the country States
myCountryList.myChildCountry.children[2].activate();
```

### `.removeChild(child)`
*`args`*
`child`: <Object> An instance, mostly other `Widgets`

*`returns`*
`child`: The removing child

Removes the child from the tree and returns it.

### `.setParent(parent)`
*`args`*
`parent`: <Object> An instance, mostly other `Widgets`

*`returns`*
`this`: The `Widget` instance

Changes the parent of a child (this does not remove it from the previous
parent child list)

### `.destroyChildren()`
*`returns`*
`this`: The `Widget` instance

Removes all Children references n the `children` array.

## Methods NanoCustomEventSupport

### `.bind(type, eventHandler)`
*`args`*
`type`: <String> The event name.
`eventHandler`: <Function> The event handler will be called with a `CustomEvent` instance.

*`returns`*
`this`: The `Widget` instance

The basic event binding the callback is called with a `CustomEvent` instance, that
can be used to send messages using `.dispatch`

### `.dispatch(type, ...data)`
*`args`*
`type`: <String> The event name.
`data`: <Object optional> The event data

*`returns`*
`this`: The `Widget` instance

Dispatches the event and calls the handlers, the `data` extends itself to the ev
instance, its recommended to enclose the custom data in a well known property usually
named also `data`:

```javascript
//somewhere in a formWidget declaration
  onClick (ev) {
    this.dispatch('new-form-data'{
      data : this.form.getData()
    });
  }

//somewhere on binding
formWidget.bind('new-form-data', function(ev){
  let formData = ev.data;
});
```

### `.unbind(type, ...eventHandler)`
*`args`*
`type`: <String> The event name.
`eventHandler`: <Function optional> The event handler to remove, if absent all
handlers for that event will be removed

*`returns`*
`this`: The `Widget` instance

Removes handlers from the `eventListeners` array.

### `.unbindAll()`
*`returns`*
`this`: The `Widget` instance

Nullifies the `eventListeners` array.

# Philosophy

The idea is to have a consistent way to define UI components, regardless of their
use. UI is UI app logic can live abstracted in their own `class`es and just use
`Widget` for UI tasks.
