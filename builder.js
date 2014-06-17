;(function (exports, doc) {
  "use strict"
  var HTML_TAGS = [
    "a","abbr","address","area","article","aside","audio","b","base","bdi",
    "bdo","blockquote","body","br","canvas","caption","cite","code","col",
    "colgroup","command","datalist","dd","del","details","dfn","dialog","div",
    "dl","dt","em","embed","fieldset","figcaption","figure","footer","form",
    "h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i",
    "iframe","img","input","ins","kbd","keygen","label","legend","li","link",
    "map","mark","menu","meta","meter","nav","noscript","object","ol",
    "optgroup","option","output","p","param","pre","progress","q","rp","rt",
    "ruby","s","samp","script","section","select","small","source","span",
    "strong","style","sub","summary","sup","table","tbody","td","textarea",
    "tfoot","th","thead","time","title","tr","track","u","ul","var","video",
    "wbr"
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

  for (var tag in HTML_TAGS) {
    Tag.prototype[tag] = function (attrs, body) {
      return this.tag(tag, attrs, body);
    }
  }

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
