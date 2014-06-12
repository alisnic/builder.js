xmlbuilder.js
=============

XML Builder is a small library to build XML/HTML. It uses the DOM to do that, hence the size.
It's inspired by the Nokogiri XML builder.

```coffee
XMLBuilder.t("foo").toString()                        #=> <foo></foo>
XMLBuilder.t("foo", "true").toString()                #=> <foo>true</foo>
XMLBuilder.t("foo", {fancy: "yes"}).toString()        #=> <foo fancy="yes"></foo>
XMLBuilder.t("foo", {zoo: "moo"}, "hello").toString() #=> <foo zoo="moo">hello</foo>
```

The body can be a function to nest other tags: 

```coffee
xml = XMLBuilder.t "foo", (foo)->
  foo.t "bar", "one"
  foo.t "bar", "two"
  
xml.toString() #=> "<foo><bar>one</bar><bar>two</bar></foo>"
```

