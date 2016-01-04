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

# The lib problem

Widget lib depends on neon.js, as es6 now supports a native `class` definition
using Widget had became a little of a challenge for me, given the changing
technology paradigm and coding styles, I've adapted Widgets philosophy into my
current coding requirements.

- Reduce dependency (Use native es6 as much as possible).
- Simpler API (For my liking there were elements of it that I rarely used e.g. `NodeSupport.prototype.nextSibling`).
- Get rid of the multiline workaround for defining HTML

# The UI's problem
## My personal philosophy on how UI should be coded, [skip to API](#API) the code if not on the mood.

TL;DR; We need a native non-magical way of interacting with UI elements (mostly DOM).

Of first let me rant a little and get that out of the way:

- Complexity is not only expensive its really boring.
- Your framework should be part of the solution not part of the problem. (sometimes it's a constraint, I know).
- If you think Angular is ok, and don't understand why stupid coders like me "just don't get it", please leave.
- Ooooook!, ok, Angular IS ok. (sheesh!) but please don't tell me that "1-project-learning-curve" is a good thing.
- There is always a learning curve sorry.
- UI can be fun again, really!
- This is not new.
- Lowest level of Magic!
- This lib solves one problem and one problem only: I don't have the UI library that I want.

I rant about Angular as I can rant about any complex UI library, I get that there
are many ways of using Angular (it was designed to be that way I get it), but look
around, most of the beginner tutorials tells you that you need 3 files to define
one component, that should map through a capitalization engine to be called, then
controlled from another file?, ok then lets hope I'm calling them correctly because
they are strings? uhm... ok I guess, ...wait what the fuck is the `$scope`?, does
the `$` do somehting?, ok then I need to read about that... wait so is the `this`?
what? oh so is not the same?... ok, oh, wait it worked! it was `base64Converter`
not `base64converter`, oh ok well, nice, now the convertion should happen on a `Service`?
or on another controller?, but wait how do I call another controller if I don't
have a `Directive` for it?, oh should it be injected?, lets google that...

and so on...

[breathe]

The code Angular invites you to write is complex.

- But Angular does more than that!

... and that exactly is the problem.

Most of the times you don't need Angular, and most of the times you don't even
need jQuery anymore, why don't we go back to the basic stuff?, native things have
become super easy to use, fast, and there is ton of information of it around.

### Meet Widget

```javascript
'use strict';
//Extend it
class HTMLTestWidget extends NanoWidget {

  //lets define how it should look using or _getHTML or _getElement :)
  _getHTML () {
    //maybe an svg? or video? or whatever you want.
    return `
      <div class="my custom native element classes">
        Custom HTML Content
        <input type="text" class="my-value" value="my value before click">
        <button class="my-button">Click me!</button>
      </div>
    `;
  }

  //kickstart it
  constructor () {
    super(); //call papa for element creation

    //do whatever you want with your element DOM node
    this.myValueEl = this.element.querySelector('.my-value');
    this.testButtonEl = this.element.querySelector('.my-button');

    //I like to have bindings on the same place
    this._bindEvents();
  }

  _bindEvents () {
    this.testButtonEl.addEventListener('click', this._clickHandler.bind(this));

    //maybe a socket one?
    //socket.on('new-value-from-backend', this_newValueHandler.bind(this));
  }

  _clickHandler (ev){
    console.log('Click catched!');
    //native stuff can happen :)
    this.myValueEl.value = 'my value AFTER click';
  }

};
```

And thats a simple UI element that you can later use like:

```javascript
myHTMLWidget = new HTMLTestWidget();
myHTMLWidget.render(document.body);
```

And you have a functional UI element build only using native stuff, that you can
bend to your bidding.

>- AHA! I SEE MAAAAGIIIIIIIC YOU FILTHY LIER!!!!! WTF IS THIS SHIT!

```
_getHTML () {
  return `
    <div class="my custom native element classes">
      Custom HTML Content
      <input type="text" class="my-value" value="my value before click">
      <button class="my-button">Click me!</button>
    </div>
  `;
}
```

ok lets see the magic:
```javascript
class NanoWidget extends includes(NanoCustomEventSupport, NanoNodeSupport) {

  constructor (conf) {
    super();

    let _defaults = {
      active : false,
      disabled : false,
      __destroyed : false
    };

    Object.assign(_defaults, conf);
    Object.assign(this, _defaults);

    if (!this.element) {
      this.element = this._getElement(); //LOOK HERE
    }

    if (this.class) {
      for (let className of this.class.split(' ')) {
        this.element.classList.add(className);
      }
    }
  }

  _getElement () {
    let elementHolder = document.createElement('div');
    htmlContent = this.html || this._getHTML().trim(); //THEN HERE
    if (elementHolder.childNodes.length > 1) {
      return elementHolder.childNodes;
    }
    return elementHolder.firstChild;
  }

  //...
```

Lets get real, UI should be able to communicate and react to stuff and be flexible
on how to render stuff, and extensible and work outside the TODO example.

Yep, and we need to tackle that problem, because we need to make our code extensible.
Enter Modules

## Meet a Module

```javascript
//New Module
class ColorChangeSupport {
  changeColor (newColor) {
    this.element.style.color = newColor;
  }
}

//Extend NanoWidget
class ColorChangingWidget extends includes(NanoWidget, ColorChangeSupport){};

//Instanciate your new Widget
let myColorChangingWidget = new ColorChangingWidget({
  html : '<div>My color changing widget</div>' //remember? htmlContent = this.html || this._getHTML().trim(); //THEN HERE
});
myColorChangingWidget.render(document.body); // sugar for: targetElement.appendChild
myColorChangingWidget.changeColor('#0F0'); // use your module
```
As you may thing `Module`s are a classes with no constructor. Because We should
rely on NanoWidget's constructor.

Now you can add that method to your new widgets.

So then we can start thinking about stuff like: `StateSupport`,
`HandlebarsTemplateSupport`, etc. whatever your UI thing needs, as you need it.

No reason to include support for stuff you don't need, and when you need it, you
can create a simple class with a nice API and attach that to your `Widgets`.

## Low on Magic guaranteed!!
>I want to have another approach for composition, but this works for now.

We have magic in between and as with all the code in this lib I pretend to keep it
simple, happens in the `includes` function:

```javascript
'use strict';

function includes(...modules) {
  let desc, _Mix = class {};

  //if extending NeoWidget
  if ( modules.filter((module)=>{return module.name === 'NanoWidget';}).length ) {
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
```
What it does is simple, it serve as the `mixin` mechanism but makes a really big
tradeoff, it specifically relies on the `NanoWidget` constructor logic, this is to
allow extension of `NanoWidget` on class declaration. The function creates a `class`
on the fly, and if it detects is pretended to extend `NanoWidget` it explicitly
extends from it. I have to check because `NanoWidget` also uses it because, I need to
include `NanoNodeSupport` and `NanoCustomEventSupport` to it on declaration.

## What? `NanoNodeSupport` and `NanoCustomEventSupport` you say?

As stated sooner or later we need to add complexity to our code, because we need
it to do stuff

(and this is why I love `Widget`)

First, `Events` are a really big part of UIs and yes we need them, and we kind of
have them, but having a pluggable event system is way simpler, enter
`NanoCustomEventSupport`.

## `NanoCustomEventSupport`

This is a basic port of azendal's `CustomEventSupport`, it lets you attach `Events`
to your `Widgets` so you can do stuff like:

```javascript
colorChangerControl.bind('color-changed', function(ev){
  this.color = ev.data.color;
});

//somewhere else on the `ColorChangerControl` class declaration

this.dispatch('color-changed',{
  data: newColor
});

```

Also you can extend from them if you want no UI stuff just the event system.

Second, node support, UI's representation is natively a tree (DOM tree), so
it makes sense that we use another tree to represent our app architecture, think:

```
Top Bar
  -Site Menu
  -Login Controls
```

```javascript
class TopBar extend NanoWidget {
  constructor (conf) {
    super(conf);

    this.appendChild(new NanoWidget({
      name: 'siteMenu'
    }));
    this.siteMenu.render(this.element);

    this.appendChild(new LoginControlsWidget({
      name: 'loginControls'
    }));
    this.loginControls.render(this.element);
  }
}

let myTopBar = new TopBar();

//BONUS! you can drive your UI with the console.
myTopBar.loginControls.activate();
```

The magic?
```javascript
appendChild (child) {
  //[...]
  this.children.push(child);
  if(child.name){ //if named? add it as its named
    this[child.name] = child;
  }
  child.setParent(this);
  return child;
}
```

So thats why `CustomEventSupport` and `NodeSupport` are needed, the main difference
with azendals ones, its that it does not support Class level events.

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

### `.remove(child)`
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
