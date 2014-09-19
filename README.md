builder.js
=============

```coffee
Builder.build("foo", "true")                #=> <?xml version="1.0" encoding="UTF-8"?>\n<foo>true</foo>
Builder.build("foo", {fancy: "yes"})        #=> ...<foo fancy="yes"></foo>
Builder.build("foo", {zoo: "moo"}, "hello") #=> ...<foo zoo="moo">hello</foo>
```

The body can be a function to nest other tags:

```coffee
xml = Builder.build "foo", ->
  @tag "bar", "one"
  @tag "bar", "two"

xml #=> "...<foo><bar>one</bar><bar>two</bar></foo>"
```

To generate the xml without the xml version tag, you need to initialize the
builder with a special options:

```coffee
new Builder(writeVersion: false).build("foo", "true") #=> <foo>true</foo>
```
