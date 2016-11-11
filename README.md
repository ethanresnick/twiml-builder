# Twiml Builder

A simple function for creating [Twiml](https://www.twilio.com/docs/api/twiml)
documents. Using this function lets you build up your document as data (rather
than as a string), and it handles pesky things like XML character escaping and
adding the XML document header for you.

For example:

```js
var twiml = require('twiml-builder');

twiml(
  ['Say', {voice: 'woman'}, 'Please leave a message after the tone.'],
  ['Record', {maxLength: 20}]
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
