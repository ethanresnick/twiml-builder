import * as chai from "chai";
import { Say, Play, Record, Dial, Sip, default as sut } from "../src/index";

const {expect} = chai;

describe("twiml generation utility", () => {
  it('should generate an empty response when given no arguments', function() {
    var result = sut();
    expect(result).to.equal('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
  });

  it('should support single nodes with string children and no attributes', function() {
    var result = sut(['Say', 'some text']);
    expect(result).to.equal('<?xml version="1.0" encoding="UTF-8"?><Response><Say>some text</Say></Response>');
  });

  it('should support tags with no content', function() {
    var result = sut(['Hangup']);
    expect(result).to.equal('<?xml version="1.0" encoding="UTF-8"?><Response><Hangup></Hangup></Response>');
  })

  it('should support tags with no content but with attributes', function() {
    var result = sut(['Record', {maxLength: 20}]);
    expect(result).to.equal('<?xml version="1.0" encoding="UTF-8"?><Response><Record maxLength="20"></Record></Response>');
  })


  it('should support multiple sibling nodes, with attributes', function() {
    var result = sut(
      ['Say', {voice:'woman', language:'en-gb'}, 'hello world'],
      ['Play', 'foobar']
    );

    var test = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<Response>',
        '<Say voice="woman" language="en-gb">hello world</Say>',
        '<Play>foobar</Play>',
      '</Response>'
    ].join('');

    expect(result).to.equal(test);
  });

  it('should allow for nesting nodes, with multiple nested nodes as siblings', function() {
    var result = sut(
      ['Say', { voice:'woman', language:'es' }, 'hola mundo'],
      ['Gather', { timeout:15, finishOnKey:'#' },
        ['Play', 'foobar'],
        ['Say', { voice:'woman'}, 'this is some hardcore nesting action']],
      ['Play', 'foobar']
    )

    var test = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<Response>',
      '<Say voice="woman" language="es">hola mundo</Say>',
      '<Gather timeout="15" finishOnKey="#">',
        '<Play>foobar</Play>',
        '<Say voice="woman">this is some hardcore nesting action</Say>',
      '</Gather>',
      '<Play>foobar</Play>',
      '</Response>'
    ].join('');

    expect(result).to.equal(test);
  });

  it('should allow a SIP node with "header" query string', function() {
    var result = sut(
      ['Say', { voice:'woman', language:'en-gb' }, 'Routing to SIP.'],
      ['Dial',
        ['Sip', { username:'admin', password: 123 }, 'sip:jack@example.com?mycustomheader=foo&myotherheader=bar']]);

    var test = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<Response>',
      '<Say voice="woman" language="en-gb">Routing to SIP.</Say>',
      '<Dial>',
        '<Sip username="admin" password="123">sip:jack@example.com?mycustomheader=foo&amp;myotherheader=bar</Sip>',
      '</Dial>',
      '</Response>'
    ].join('');

    expect(result).to.equal(test);
  });

  it('should escape XML special characters', function() {
    var result = sut(
      ['Say', { voice:'woman', language:'&<>' }, '& < > " \' &'],
      ['Dial',
        ['Sip', { username:'admin', password: 123 }, 'sip:jack@example.com?mycustomheader=foo&myotherheader=bar']]
    );

    var test = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<Response>',
      '<Say voice="woman" language="&amp;&lt;&gt;">&amp; &lt; &gt; &quot; &apos; &amp;</Say>',
      '<Dial>',
        '<Sip username="admin" password="123">sip:jack@example.com?mycustomheader=foo&amp;myotherheader=bar</Sip>',
      '</Dial>',
      '</Response>'
    ].join('');

    expect(result).to.equal(test);
  });

  it('should support using helper functions named after each element', function() {
    var result = sut(
      Say({ voice:'woman', language:'&<>' }, 'test'),
      Dial(
        Sip({ username:'admin', password: 123 }, 'test2')),
      Record({maxLength: 20})
    );

    var test = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<Response>',
      '<Say voice="woman" language="&amp;&lt;&gt;">test</Say>',
      '<Dial>',
        '<Sip username="admin" password="123">test2</Sip>',
      '</Dial>',
      '<Record maxLength="20"></Record>',
      '</Response>'
    ].join('');

    expect(result).to.equal(test);
  })

  it('should allow an enqueue a task', function() {
    var result = sut(
      ['Enqueue',
        ['Task', { priority:'10', timeout:'30' }, JSON.stringify({selected_language:"en"})]]
    )

    var test = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<Response>',
      '<Enqueue>',
        '<Task priority="10" timeout="30">{&quot;selected_language&quot;:&quot;en&quot;}</Task>',
      '</Enqueue>',
      '</Response>'
    ].join('');

    expect(result).to.equal(test);
  });
});
