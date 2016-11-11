# Twiml Builder

A simple function for creating [Twiml](https://www.twilio.com/docs/api/twiml)
documents, with helper functions for each tag (to give nice autocomplete).

Using this function lets you build up your document as data (rather than as a
string), and it handles pesky things like XML character escaping and adding the
XML document header for you.

For example:

```js
var { Gather, Say, Record, default: twiml } = require('twiml-builder');

twiml(
  Say({voice: 'woman'}, 'Please leave a message after the tone.'),
  Record({maxLength: 20})
);
```

Produces:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="woman">Please leave a message after the tone.</Say>
    <Record maxLength="20"></Record>
</Response>
```

(The output is shown nicely indented above; in reality the function returns a
minified string.)


# Usage

The function takes 0 or more arguments, each of which is an array representing
a tag:

```
twiml(...tags: Tag[])
```

These tags will be rendered as siblings, as in the example above.

Each tag argument is an array where the first element is the tag name; the
second element is a set of attributes (optional); and the remaining elements are
contents that should go inside the tag as siblings. These contents are either
string or number literals, or themselves other tags.

For example:

```js
twiml(
  ['Gather', { timeout:15, finishOnKey:'#' },
    ['Play', 'foobar'],
    ['Say', { voice:'woman'}, 'this is some hardcore nesting action']]
);
```

Produces:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather timeout="15" finishOnKey="#">
        <Play>foobar</Play>
        <Say voice="woman">this is some hardcore nesting action</Say>
    </Gather>
</Response>
```

## Element Helper Functions

For every tag name, there's a helper function with the same name that simply
takes an arbitrary number of arguments, and returns an array where the element's
name is the first entry, and all the arguments provided are the subsequent
entries.

For example, `Gather(a, b, c)` returns `['Gather', a, b, c]`.

This tiny bit of sugar makes the API a bit more concise, and works well with
many editors' autocomplete features.

> Note: for the `Number` element, you'll likely want to import the helper
function using a different name, to prevent it from conflicting with
Javascript's built-in Number function.
