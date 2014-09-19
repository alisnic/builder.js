builder.js
=============

Builder is a small library built to create DOM objects. This has several applications
like programmatic templates or building XMLs.
(you got it right, Builder is a pretty interface slapped on top of
document.createElement)

```coffee
Builder("foo", "true").toString()                #=> <foo>true</foo>
Builder("foo", {fancy: "yes"}).toString()        #=> <foo fancy="yes"></foo>
Builder("foo", {zoo: "moo"}, "hello").toString() #=> <foo zoo="moo">hello</foo>
```

The body can be a function to nest other tags:

```coffee
xml = Builder "foo", ->
  @tag "bar", "one"
  @tag "bar", "two"

xml.toString() #=> "<foo><bar>one</bar><bar>two</bar></foo>"
```

Using Builder as a templating language:

```coffee
renderTodos = (list)->
  el = Builder 'ul', ->
    for item in list
      @li item.name

  el.toString()

renderTodos [{name: 'first'}, {name: 'second'}] #=> <ul><li>first</li><li>second</li></ul>
```

