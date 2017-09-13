# Breton conjugator

A verb conjugation library for the [Breton language](https://en.wikipedia.org/wiki/Breton_language) implemented in JavaScript.

It implements the [Universal Module Definition](https://github.com/umdjs/umd) pattern so it _should_ be broadly compatible.

It is much probably not correct from every verb. This is a rewrite of an old script of mine I stumbled upon recently, but I need to check with serious references.

## API

This API is very small, as it comprises only one function, named `conjugate`. Pass it an infinitive form of a verb and it returns an objects describing the conjugation:

```javascript
const conjugator = require('breton-conjugator');

var conjugation = conjugator.conjugate('bezañ');
```

returns

```javascript
{
	result: {
		type: [ "irregular" ],
		forms: {
			regular: false,
			infinitive: "bezañ",
			pastParticiple: "bet",
			root: "(irregular)",
			present: {
				p1s: "on",
				p2s: "out",
				p3s: "eo",
				p1p: "omp",
				p2p: "oc’h",
				p3p: "int",
				imp: "eur"
			},
			imperfect: {
				p1s: "oan",
				p2s: "oas",
				p3s: "oa",
				p1p: "oamp",
				p2p: "oac’h",
				p3p: "oant",
				imp: "oad"
			},
			preterite: {
				p1s: "boen",
				p2s: "boes",
				p3s: "boe",
				p1p: "boemp",
				p2p: "boec’h",
				p3p: "boent",
				imp: "boed"
			},
			future: {
				p1s: "vin",
				p2s: "vi",
				p3s: "vo",
				p1p: "vimp",
				p2p: "viot",
				p3p: "vint",
				imp: "vior"
			},
			presentConditional: {
				p1s: "befen",
				p2s: "befes",
				p3s: "befe",
				p1p: "befemp",
				p2p: "befec’h",
				p3p: "befent",
				imp: "befed"
			},
			pastConditional: {
				p1s: "bijen",
				p2s: "bijes",
				p3s: "bije",
				p1p: "bijemp",
				p2p: "bijec’h",
				p3p: "bijent",
				imp: "bijed"
			},
			imperative: {
				p2s: "bez",
				p1p: "bezomp",
				p2p: "bezit"
			}
		}
	}
}
```