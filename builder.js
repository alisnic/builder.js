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

exports.Builder = function (name, attrs, body) {
  var writer = new XMLWriter();
  writer.startDocument('1.0', 'UTF-8');
  new Tag(writer, name, attrs, body);
  writer.endDocument();
  return writer.toString();
};

