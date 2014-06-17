min:
	uglifyjs builder.js > builder.min.js --mangle

spec:
	node builder_spec.js
