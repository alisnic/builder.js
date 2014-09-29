Builder = require("./builder.js").Builder
assert  = require("assert")

nsXml = (str)->
  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n#{str}"

describe "Builder", ->
  it "can create a simple tag", ->
    assert.equal Builder.build("foo"), "<foo></foo>"

  it "adds attributes to the tag", ->
    assert.equal Builder.build("foo", {foo: "bar"}),
      "<foo foo=\"bar\"></foo>"

  it "escapes attribute values", ->
    assert.equal Builder.build("foo", {foo: "bar&<>\""}),
      "<foo foo=\"bar&amp;&lt;&gt;&quot;\"></foo>"

  it "can have a body", ->
    assert.equal Builder.build("foo", "hello"), "<foo>hello</foo>"

  it "can have both a body and attributes", ->
    assert.equal Builder.build("foo", {moo: "zoo"}, "hello"),
      "<foo moo=\"zoo\">hello</foo>"

  it "can be nested", ->
    xml = Builder.build "foo", ->
      @tag "bar", 1
      @tag "bar", 2

    assert.equal xml, "<foo><bar>1</bar><bar>2</bar></foo>"

  it "works well as a templating language", ->
    renderTodos = (list)->
      Builder.build 'ul', ->
        for item in list
          @tag 'li', item.name

    expected = "<ul><li>first</li><li>second</li></ul>"
    assert.equal renderTodos([{name: 'first'}, {name: 'second'}]), expected

  it "can generate the xml with the version output", ->
    assert.equal new Builder({writeVersion: true}).build("foo"), nsXml("<foo></foo>")


