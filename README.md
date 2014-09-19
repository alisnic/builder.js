builder.js
=============

```coffee
Builder("foo", "true")                #=> <?xml version="1.0" encoding="UTF-8"?>\n<foo>true</foo>
Builder("foo", {fancy: "yes"})        #=> ...<foo fancy="yes"></foo>
Builder("foo", {zoo: "moo"}, "hello") #=> ...<foo zoo="moo">hello</foo>
```

The body can be a function to nest other tags:

```coffee
xml = Builder "foo", ->
  @tag "bar", "one"
  @tag "bar", "two"

xml #=> "...<foo><bar>one</bar><bar>two</bar></foo>"
```

