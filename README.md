# Decently Smart Target

[![npm version](https://badge.fury.io/js/decently-smart-target.svg)](https://badge.fury.io/js/decently-smart-target)

> [Read "Open link in a new window" on Medium.com](https://medium.com/@ryan.burnette/open-link-in-a-new-window-732d5bc48f8c)

This is a browser JavaScript library for setting up basic "open in new window"
logic for links. If the link is internal, don't open in a new window. If the
link is external, open in a new window.

Call without arguments to run on all links currently on the page, or pass in a
Node or NodeList to be more explicit.

Whether a link is "local" or not is determined by default by looking at the
current host. You can also pass in which hosts to consider local.

A callback can be provided as a third argument if you want to modify the
function that sets the link to open in a new window. By default, the target
attribute is set to \_blank.

## Usage

### Simple

The simplest usage is to include the library from a CDN and run it on the page.
This calls the function on all links currently on the page.

```javascript
<script src="https://unpkg.com/decently-smart-target/index.js"></script>
<script>decentlySmartTarget()</script>
```

### Still Simple

Use it as a module. Configure your implementation.

The first argument is a Node or NodeList. The second argument is a list of
hosts which are considered local. The third argument is the callback function
which edits the target attribute.

This example basically shows the default functionality while demonstrating all
available options. Setting `rel` to `noopener noreferrer` is a good idea, but
this library does not enforce that opinion.

```javascript
var decentlySmartTarget = require('decently-smart-target');

// custom hosts to consider local, these won't get setTargetBlank() called on them
var hosts = [
  'localhost:8080'
];

// a custom function to set the target to blank
function setTargetBlank(el) {
  el.setAttribute('target','_blank');
  // see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target
  el.setAttribute('rel','noopener noreferrer');
}

decentlySmartTarget(document.querySelectorAll('a'),hosts,setTargetBlank);
```

### Browser Support

- Uses [Document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) if called without first argument
- Uses [String.prototype.startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith), polyfill as neccessary
