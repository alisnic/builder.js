if (typeof require !== "undefined") {
  require('./bdd.js')
  XMLBuilder = require('./xmlbuilder.js').XMLBuilder
}

describe('XMLBuilder', function () {
  it('can create a simple tag', function () {
    assert.equal(XMLBuilder.t('foo').toString(), '<foo></foo>')
  })

  it('adds attributes to the tag', function () {
    assert.equal(XMLBuilder.t('foo', {foo: 'bar'}).toString(),
                 '<foo foo="bar"></foo>')
  })

  xit('escapes attribute values', function () {
    assert.equal(XMLBuilder.t('foo', {foo: "bar&<>\"'"}).toString(),
                 '<foo foo="bar&amp;&lt;&gt;&quot;&apos;"></foo>')
  })

  it('can have a body', function () {
    assert.equal(XMLBuilder.t('foo', "hello").toString(),
                 '<foo>hello</foo>')
  })

  it('can have both a body and attributes', function () {
    assert.equal(XMLBuilder.t('foo', {moo: 'zoo'}, "hello").toString(),
                 '<foo moo="zoo">hello</foo>')
  })

  it('can be nested', function () {
    var xml = XMLBuilder.t("foo", function (foo) {
      foo.t("bar", 1)
      foo.t("bar", 2)
    })

    assert.equal(xml.toString(), "<foo><bar>1</bar><bar>2</bar></foo>")
  })
})
