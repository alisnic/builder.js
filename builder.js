;(function (exports, doc) {
  "use strict"
  var HTML_TAGS = [
    "a","audio","b","body","br","canvas","div",
    "fieldset","footer","form","h1","h2","h3","h4","h5","h6","header","hr","i",
    "iframe","img","input","label","li","link","meta","nav","object","ol",
    "optgroup","option","p","script","section","select","span",
    "strong","style","summary","table","tbody","td","textarea","th",
    "thead","title","tr","u","ul","video"
  ];

  var Tag = function (name, attrs, body) {
    this.el = doc.createElement(name);
    this.depth = 0;

    var attributes = {};

    if (typeof attrs === "object") {
      attributes = attrs;
    } else {
      if (typeof body === "undefined") {
        body = attrs;
      }
    }

    for (var key in attributes) {
      this.el.setAttribute(key, attributes[key]);
    }

    if (typeof body === "function") {
      body.apply(this, [this]);
    } else {
      this.el.textContent = body || "";
    }
  };

  HTML_TAGS.forEach(function (tag) {
    Tag.prototype[tag] = function (attrs, body) {
      return this.tag(tag, attrs, body);
    }
  })

  Tag.prototype.tag = function (name, attrs, body) {
    this.el.appendChild(new Tag(name, attrs, body).toDom());
  };

  Tag.prototype.toString = function () {
    return this.el.outerHTML;
  };

  Tag.prototype.toDom = function () {
    return this.el;
  };

  exports.Builder = function (name, attrs, body) {
    return new Tag(name, attrs, body);
  }

})(typeof exports === "undefined" ? window : exports,
   typeof document === "undefined" ? require('jsdom').jsdom() : document);
