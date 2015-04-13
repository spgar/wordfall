
/* exported WordList */

// Utility class to supply random words about animals.
// Scales from animal to adjective + animal to adjective + animal + verb.
var WordList = function() {
    'use strict';

    var animals = [
        'bat',
        'beetle',
        'bird',
        'bison',
        'butterfly',
        'cat',
        'cow',
        'crab',
        'dog',
        'duck',
        'eagle',
        'elephant',
        'ferret',
        'fish',
        'fly',
        'fox',
        'frog',
        'giraffe',
        'goat',
        'gorilla',
        'hamster',
        'horse',
        'iguana',
        'jaguar',
        'jellyfish',
        'kangaroo',
        'koala',
        'lion',
        'lizard',
        'llama',
        'lobster',
        'mole',
        'moose',
        'monkey',
        'moth',
        'mouse',
        'mule',
        'newt',
        'octopus',
        'otter',
        'oyster',
        'panther',
        'pig',
        'piranha',
        'quail',
        'rabbit',
        'rat',
        'scorpion',
        'seal',
        'shark',
        'snail',
        'snake',
        'squid',
        'tiger',
        'turtle',
        'vulture',
        'walrus',
        'wasp',
        'whale',
        'wolf',
        'yak',
        'zebra'
    ];

    var adjectives = [
        'black',
        'blue',
        'brown',
        'green',
        'indigo',
        'orange',
        'pink',
        'purple',
        'red',
        'white',
        'yellow',

        'pale',
        'spotted',
        'striped',

        'big',
        'burly',
        'fancy',
        'fat',
        'feeble',
        'fuzzy',
        'large',
        'pretty',
        'short',
        'skinny',
        'slender',
        'small',
        'tall',
        'tiny',

        'fast',
        'quick',
        'slow',

        'ancient',
        'baby',
        'old',
        'young',

        'afraid',
        'anxious',
        'bored',
        'cruel',
        'dizzy',
        'excited',
        'happy',
        'healthy',
        'jolly',
        'kind',
        'lovely',
        'lucky',
        'macho',
        'nasty',
        'peaceful',
        'poor',
        'rich',
        'sad',
        'scared',
        'tough',
        'wiggly',
        'wild',
        'wise',
        'zany'
    ];

    var verbs = [
        'alerts',
        'attacks',
        'applauds',
        'blinks',
        'bounces',
        'coughs',
        'cries',
        'dances',
        'exists',
        'falls',
        'fetches',
        'fights',
        'grins',
        'hugs',
        'hunts',
        'itches',
        'jogs',
        'jumps',
        'laughs',
        'loves',
        'moves',
        'nests',
        'nods',
        'obeys',
        'plays',
        'points',
        'rests',
        'runs',
        'sings',
        'sleeps',
        'swims',
        'sprints',
        'taps',
        'trips',
        'trots',
        'visits',
        'walks',
        'warns',
    ];

    var getRandomWord = function(difficulty) {
        var animal = animals[Math.floor(Math.random() * animals.length)];
        var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        var verb = verbs[Math.floor(Math.random() * verbs.length)];

        if (difficulty === 1) {
            return animal;
        } else if (difficulty === 2) {
            return adjective + ' ' + animal;
        } else {
            return adjective + ' ' + animal + ' ' + verb;
        }
    };

    return {
        getRandomWord: getRandomWord
    };
};
