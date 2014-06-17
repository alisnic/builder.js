builder.js
=============

Builder is a small library to build XML/HTML. It uses the DOM to do that, hence the size.
It's inspired by the Nokogiri XML builder.

```coffee
Builder("foo", "true").toString()                #=> <foo>true</foo>
Builder("foo", {fancy: "yes"}).toString()        #=> <foo fancy="yes"></foo>
Builder("foo", {zoo: "moo"}, "hello").toString() #=> <foo zoo="moo">hello</foo>
```

The body can be a function to nest other tags:

```coffee
xml = Bulder "foo", ->
  @tag "bar", "one"
  @tag "bar", "two"

xml.toString() #=> "<foo><bar>one</bar><bar>two</bar></foo>"
```

Using Builder as a templating langugage:

```coffee
renderTodos = (list)->
  el = Builder 'ul', ->
    for item in list
      @li item.name

  el.toString()

renderTodos [{name: 'first'}, {name: 'second'}]
```

