require "./bdd.js"
Builder = require("./builder.js").Builder

nsXml = (str)->
  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n#{str}"

describe "Builder", ->
  it "can create a simple tag", ->
    assert.equal Builder("foo"), nsXml("<foo></foo>")

  it "adds attributes to the tag", ->
    assert.equal Builder("foo", {foo: "bar"}),
      nsXml("<foo foo=\"bar\"></foo>")

  it "escapes attribute values", ->
    assert.equal Builder("foo", {foo: "bar&<>\""}),
      nsXml("<foo foo=\"bar&amp;&lt;&gt;&quot;\"></foo>")

  it "can have a body", ->
    assert.equal Builder("foo", "hello"), nsXml("<foo>hello</foo>")

  it "can have both a body and attributes", ->
    assert.equal Builder("foo", {moo: "zoo"}, "hello"),
      nsXml("<foo moo=\"zoo\">hello</foo>")

  it "can be nested", ->
    xml = Builder "foo", ->
      @tag "bar", 1
      @tag "bar", 2

    assert.equal xml, nsXml("<foo><bar>1</bar><bar>2</bar></foo>")

  it "works well as a templating language", ->
    renderTodos = (list)->
      Builder 'ul', ->
        for item in list
          @tag 'li', item.name

    expected = nsXml("<ul><li>first</li><li>second</li></ul>")
    assert.equal renderTodos([{name: 'first'}, {name: 'second'}]), expected


