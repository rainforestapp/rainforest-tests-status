
build: components index.js rainforest-build-status.css
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean
