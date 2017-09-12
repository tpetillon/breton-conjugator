'use strict';

// Module export pattern from
// https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([
            './irregular-roots',
            './irregular-verbs'
        ], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require(
            './irregular-roots',
            './irregular-verbs'));
    } else {
        // Browser globals (root is window)
        root.bretonConjugator = factory();
  }
}(this, function (irregularRoots, irregularVerbs) {

    const tenses = [
        'present',
        'imperfect',
        'preterite',
        'future',
        'presentConditional',
        'pastConditional',
        'imperative'
    ];

    const persons = [ 'p1s', 'p2s', 'p3s', 'p1p', 'p2p', 'p3p', 'imp' ];

    const infinitiveEndings = [ 'añ', 'iñ', 'al', 'at', 'et', 'out', 'el', 'er' ];

    const conjugatedEndings = {
        'present' : {
            'p1s' : 'an',
            'p2s' : 'ez',
            'p3s' : '',
            'p1p' : 'omp',
            'p2p' : 'it',
            'p3p' : 'ont',
            'imp' : 'er'
        },
        'imperfect' : {
            'p1s' : 'en',
            'p2s' : 'es',
            'p3s' : 'e',
            'p1p' : 'emp',
            'p2p' : 'ec’h',
            'p3p' : 'ent',
            'imp' : 'er'
        },
        'preterite' : {
            'p1s' : 'is',
            'p2s' : 'out',
            'p3s' : 'as',
            'p1p' : 'jomp',
            'p2p' : 'joc’h',
            'p3p' : 'jont',
            'imp' : 'jod'
        },
        'future' : {
            'p1s' : 'in',
            'p2s' : 'i',
            'p3s' : 'o',
            'p1p' : 'imp',
            'p2p' : 'ot',
            'p3p' : 'int',
            'imp' : 'or'
        },
        'presentConditional' : {
            'p1s' : 'fen',
            'p2s' : 'fes',
            'p3s' : 'fe',
            'p1p' : 'femp',
            'p2p' : 'fec’h',
            'p3p' : 'fent',
            'imp' : 'fed'
        },
        'pastConditional' : {
            'p1s' : 'jen',
            'p2s' : 'jes',
            'p3s' : 'je',
            'p1p' : 'jemp',
            'p2p' : 'jec’h',
            'p3p' : 'jent',
            'imp' : 'jed'
        },
        'imperative' : {
            'p2s' : '',
            'p1p' : 'omp',
            'p2p' : 'it'
        }
    };

    var bretonConjugator = {};

    bretonConjugator.conjugate = function(verb) {
        if (typeof verb !== 'string') {
            return { error: 'Input must be of type string' };
        }
        if (verb === '') {
            return { error: 'Input must not be empty' };
        }

        var cleanedInput = verb.trim().toLocaleLowerCase().replace('\'', '’');

        if (!/^[a-z\u00E0-\u00FC’]+$/.test(cleanedInput)) {
            return { error: 'Input must only contain letters' };
        }

        if (irregularVerbs[cleanedInput] !== undefined) {
            return {
                result: {
                    type: [ 'irregular' ],
                    forms: irregularVerbs[cleanedInput]
                }
            };
        }

        var verb = cleanedInput;
        var root = undefined;
        var type = [];

        if (irregularRoots[verb] !== undefined) {
            root = irregularRoots[verb];
            type = [ 'irregular root' ];
        } else {
            for (var i = 0; i < infinitiveEndings.length; i++) {
                var ending = infinitiveEndings[i];
                var matches = verb.match('^(.+)' + ending + '$');
                if (matches) {
                    root = matches[1];
                    type = [ 'regular', '"-' + ending + '" ending' ];

                    if (ending == 'iñ') {
                        root = root.replace(/^(.*)e(.?)$/, '$1o$2');
                        type.push('last "e" changed to "o"');
                    }

                    break;
                }
            }
        }

        if (root === undefined) {
            root = verb;
            type = [ 'regular', 'no ending' ];
        }

        if (root !== undefined) {
            type.push('automatic');

            var result = { type: type, forms: {} };

            for (var t = 0; t < tenses.length; t++) {
                var tense = tenses[t];
                var tenseForms = {};
                for (var p = 0; p < persons.length; p++) {
                    var person = persons[p];
                    var ending = conjugatedEndings[tense][person];
                    if (ending !== undefined) {
                        tenseForms[person] = root + ending;
                    }
                }
                result.forms[tense] = tenseForms;
            }

            result.forms['infinitive'] = verb;
            result.forms['pastParticiple'] = root + 'et';

            return { result: result };
        }

        return {
            error: 'Cannot conjugate "' + cleanedInput + '": not recognised as a Breton verb'
        };
    };

    return bretonConjugator;
}));