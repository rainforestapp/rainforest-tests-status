
build: components lib/index.js lib/rainforest-tests-status.css
	@component build --dev --out public/build

components: component.json
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean
