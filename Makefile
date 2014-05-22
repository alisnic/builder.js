min:
	uglifyjs xmlbuilder.js > xmlbuilder.min.js --mangle

spec:
	node xmlbuilder_spec.js
