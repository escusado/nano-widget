# nano-widget
An es6 UI element API

# Intro

NanoWidget is a personal interpretation of [azendal's Widget](https://github.com/azendal/neon/blob/master/stdlib/widget.js)
for es6.

# The problem

Widget lib depends on neon.js, as es6 now supports a native `class` definition
using Widget had became a little of a challenge for me, given the changing
technology paradigm and coding styles, I've adapted Widgets philosophy into my
current coding requirements.

- Reduce dependency (Use native es6 as much as possible).
- Simpler API (For my liking there were elements of it that I rarely used e.g. `NodeSupport.prototype.nextSibling`).
- Get rid of the multiline workaround for defining HTML

# The Widget Way
## My personal philosophy on how UI should be coded, skip to the code if not on the mood.

TL;DR; We need a native non-magical way of interacting with UI elements (mostly DOM).

Of first let me rant a little and get that out of the way:

- Complexity is not only expensive its really boring.
- Your framework should be part of the solution not part of the problem. (sometimes it's a constraint, I know).
- If you think Angular is ok, and don't understand why stupid coders like me "just don't get it", please leave.
- Ooooook!, ok, Angular IS ok. (sheesh!) but please don't tell me that "1-project-learning-curve" is a good thing.
- There is always a learning curve sorry.
- UI can be fun again, really!
- This is not new.
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

So, most of the time you don't need Angular, and most of the times you don't even
need jQuery anymore, why don't we go back to the basic stuff, native things have
become super easy to use, fast, and there is ton of information of it around.

```javascript
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
```
