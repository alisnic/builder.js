if typeof require isnt "undefined"
  require "./bdd.js"
  Builder = require("./builder.js").Builder

describe "Builder", ->
  it "can create a simple tag", ->
    assert.equal Builder("foo").toString(), "<foo></foo>"

  it "adds attributes to the tag", ->
    assert.equal Builder("foo", {foo: "bar"}).toString(), "<foo foo=\"bar\"></foo>"

  it "escapes attribute values", ->
    assert.equal Builder("foo", {foo: "bar&<>\""}).toString(), "<foo foo=\"bar&amp;&lt;&gt;&quot;\"></foo>"

  it "can have a body", ->
    assert.equal Builder("foo", "hello").toString(), "<foo>hello</foo>"

  it "can have both a body and attributes", ->
    assert.equal Builder("foo", {moo: "zoo"}, "hello").toString(), "<foo moo=\"zoo\">hello</foo>"

  it "can be nested", ->
    xml = Builder "foo", ->
      @tag "bar", 1
      @tag "bar", 2

    assert.equal xml.toString(), "<foo><bar>1</bar><bar>2</bar></foo>"

  it "works well as a templating language", ->
    renderTodos = (list)->
      el = Builder 'ul', ->
        for item in list
          @li item.name

      el.toString()

    expected = "<ul><li>first</li><li>second</li></ul>"
    assert.equal renderTodos([{name: 'first'}, {name: 'second'}]), expected


