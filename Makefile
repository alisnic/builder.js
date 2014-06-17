min:
	uglifyjs builder.js > builder.min.js --mangle

spec:
	coffee builder_spec.coffee
