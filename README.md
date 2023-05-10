# [decently-smart-target](https://github.com/ryanburnette/decently-smart-target)

Decently Smart Target is a browser JavaScript library designed to intelligently
manage the "open in new window" behavior for links. It distinguishes between
internal and external links, ensuring that internal links open in the same
window, while external links open in a new window.

You can call the library without any arguments to apply the behavior to all
links currently on the page, or pass in a Node or NodeList for more targeted
application.

By default, a link is considered "local" if it shares the same host as the
current page. You can also provide a custom list of hosts to be considered
local.

If you want to modify the function that sets a link to open in a new window, you
can provide a callback as a third argument. The default behavior sets the target
attribute to `_blank`.

## Installation

For quick and easy, call it from a CDN.

```js
<script src="https://unpkg.com/decently-smart-target/index.js"></script>
```

Or use it as a module.

```shell
npm install decently-smart-target@1.0.0
```

```js
var decentlySmartTarget = require('decently-smart-target');
```

## Usage

The first argument is expected to be a Node or NodeList.

The second optional argument is a list of hosts which are considered local. The
third argument is the callback function which edits the target attribute.

Finally, the third optional argument overrides the `setTargetBlank` function
which is called on applicable Nodes. This example shows the default
functionality while demonstrating all available options. Setting `rel` to
`noopener noreferrer` is a good idea, but this library does not enforce that
opinion.

```js
// custom hosts to consider local, these won't get setTargetBlank() called on them
var hosts = ['localhost:8080'];

// a custom function to set the target to blank
function setTargetBlank(el) {
  el.setAttribute('target', '_blank');
  // see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target
  el.setAttribute('rel', 'noopener noreferrer');
}

decentlySmartTarget(document.querySelectorAll('a'), hosts, setTargetBlank);
```
