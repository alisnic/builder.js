var XMLWriter = require('xml-writer');

var Tag = function (writer, name, attrs, body) {
  this.writer = writer;
  this.writer.startElement(name);

  var attributes = {};

  if (typeof attrs === "object") {
    attributes = attrs;
  } else {
    if (typeof body === "undefined") {
      body = attrs;
    }
  }

  for (var key in attributes) {
    this.writer.writeAttribute(key, attributes[key]);
  }

  if (typeof body === "function") {
    body.apply(this, [this]);
  } else {
    this.writer.text(body || "");
  }

  this.writer.endElement();
};

Tag.prototype.tag = function (name, attrs, body) {
  new Tag(this.writer, name, attrs, body);
};

var Builder = function (options) {
  this.options = options;
  if (typeof this.options.writeVersion == "undefined") {
    this.options.writeVersion = false;
  }
};

Builder.build = function (name, attrs, body) {
  return new Builder({}).build(name, attrs, body);
};

Builder.prototype.build = function (name, attrs, body) {
  var writer = new XMLWriter();
  if (this.options.writeVersion) writer.startDocument('1.0', 'UTF-8');

  new Tag(writer, name, attrs, body);

  if (this.options.writeVersion) writer.endDocument();
  return writer.toString();
};

exports.Builder = Builder;
if (typeof window !== "undefined") {
  window.Builder = Builder;
}

