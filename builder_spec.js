if (typeof require !== "undefined") {
  require('./bdd.js')
  Builder = require('./builder.js').Builder
}

describe('Builder', function () {
  it('can create a simple tag', function () {
    assert.equal(Builder('foo').toString(), '<foo></foo>')
  })

  it('adds attributes to the tag', function () {
    assert.equal(Builder('foo', {foo: 'bar'}).toString(),
                 '<foo foo="bar"></foo>')
  })

  it('escapes attribute values', function () {
    assert.equal(Builder('foo', {foo: "bar&<>\""}).toString(),
                 '<foo foo="bar&amp;&lt;&gt;&quot;"></foo>')
  })

  it('can have a body', function () {
    assert.equal(Builder('foo', "hello").toString(),
                 '<foo>hello</foo>')
  })

  it('can have both a body and attributes', function () {
    assert.equal(Builder('foo', {moo: 'zoo'}, "hello").toString(),
                 '<foo moo="zoo">hello</foo>')
  })

  it('can be nested', function () {
    var xml = Builder("foo", function () {
      this.tag("bar", 1)
      this.tag("bar", 2)
    })

    assert.equal(xml.toString(), "<foo><bar>1</bar><bar>2</bar></foo>")
  })
})
