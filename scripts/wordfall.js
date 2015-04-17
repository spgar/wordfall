
/* global Scoreboard, WordList */

$(document).ready(function() {

    'use strict';

    var activeWord = null;
    var scoreboard = new Scoreboard($('#divScore')[0], $('#divLevel')[0], $('#divHealth')[0], resetGame);
    var wordList = new WordList();

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Add a new word into the game and sets up a timer for the next word.
    function addNewWord() {
        // Add the word with two spans. The first has been matches, the second is unmatched.
        var wordToAdd = wordList.getRandomWord(scoreboard.calcCurrentWordDifficulty());
        var matchedSpan = $('<span></span>').addClass('lettersMatched');
        var unmatchedSpan = $('<span>' + wordToAdd + '</span>').addClass('lettersNotMatched');
        var divToAdd = $('<div></div>').addClass('word');
        divToAdd.append(matchedSpan);
        divToAdd.append(unmatchedSpan);
        $('#allWords').append(divToAdd);

        // Set a random start left position.
        var randomLeftStartPosition = randomInt(0, $('body').width() - divToAdd.width());
        $(divToAdd).css({left: randomLeftStartPosition});

        // Attach data for speed and next drop time for use in applyGravity().
        $(divToAdd).data('speed', scoreboard.calcWordSpeed());
        $(divToAdd).data('nextDropTime', new Date().getTime() + $(divToAdd).data('speed'));

        setTimeout(addNewWord, scoreboard.calcWordDelay());
    }

    // Remove all of the current words and reset the scoreboard.
    function resetGame() {
        $('.word').each(function() {
            this.remove();
        });

        scoreboard.reset();
    }

    // Apply gravity to each word.
    function applyGravity() {
        $('.word').each(function() {
            var dateNow = new Date();
            if (dateNow.getTime() >= $(this).data('nextDropTime')) {
                // Drop the word down
                $(this).data('nextDropTime', dateNow.getTime() + $(this).data('speed'));
                $(this).css({top: $(this).position().top + 1});

                // If this takes us off the bottom then remove the word and take away some health.
                if ($(this).position().top + $(this).height() > $('body').height()) {
                    activeWord = null;
                    scoreboard.setHealth(scoreboard.getHealth() - 10);
                    this.remove();
                }
            }
        });
    }

    // How many points is this word worth?
    function scoreWord(word) {
        return $($(word).children()[0]).html().length + $($(word).children()[1]).html().length;
    }

    // Get the unmatched section of this word.
    function getUnmatched(word) {
        return $($(word).children()[1]).html();
    }

    // Move one letter from the unmatched span to the matched span.
    // Brings along a space if there's an appropriate one.
    function moveUnmatchedToMatched(word) {
        var matched = $($(word).children()[0]);
        var unmatched = $($(word).children()[1]);

        matched.html(matched.html() + unmatched.html()[0]);
        unmatched.html(unmatched.html().slice(1, unmatched.html().length));

        // If there's a space then we're going to move that over also.
        if (unmatched.html().length >= 2 && unmatched.html()[0] === ' ') {
            matched.html(matched.html() + ' ');
            unmatched.html(unmatched.html().slice(1, unmatched.html().length));
        }
    }

    // Handle a keypress:
    // start a new word if there's no active word and a match
    // advance the active word
    // take some health away if the press misses
    function processKeyPress(keyPressed) {
        var keyPressHit = false;

        if (activeWord === null) {
            // If one or more words starts with keyPressed then find the one closest to the bottom.
            var newActiveWord = null;
            var newActiveWordTop = -1;

            $('.word').each(function() {
                if (getUnmatched(this)[0] === keyPressed && $(this).position().top > newActiveWordTop) {
                    newActiveWord = this;
                    newActiveWordTop = $(this).position().top;
                }
            });

            // We've got a new active word, so set it up.
            if (newActiveWord !== null) {
                activeWord = newActiveWord;
                $(activeWord).addClass('activeWord');
                moveUnmatchedToMatched(activeWord);
                keyPressHit = true;
            }
        } else {
            // Check to see if the keypress matches the current target letter on the active word.
            if (keyPressed === getUnmatched(activeWord)[0]) {
                moveUnmatchedToMatched(activeWord);
                keyPressHit = true;
                if (getUnmatched(activeWord).length === 0) {
                    // If the word is complete, then bump up the score and clear activeWord.
                    scoreboard.incrementWordsFinished();
                    scoreboard.setScore(scoreboard.getScore() + scoreWord(activeWord));
                    activeWord.remove();
                    activeWord = null;
                }
            }
        }

        // If the key pressed didn't match anything, then take away some health.
        if (!keyPressHit) {
            scoreboard.setHealth(scoreboard.getHealth() - 1);
        }
    }

    $(document).keyup(function(event) {
        // Escape will cancel the current word. keyup() because ESC doesn't work with keypress() in Chrome?
        if (activeWord !== null && event.keyCode === 27) {
            var matched = $(activeWord).children()[0];
            var unmatched = $(activeWord).children()[1];

            $(activeWord).removeClass('activeWord');
            $(unmatched).html($(matched).html() + $(unmatched).html());
            $(matched).html('');
            activeWord = null;
        } /*else if (event.keyCode === 32) {
            // Super secret cheat code.
            $('.word').each(function() {
                scoreboard.incrementWordsFinished();
                this.remove();
            });
        }*/
    });

    $(document).keypress(function(event) {
        // We only deal with lowercase letters.
        var keyPressed = String.fromCharCode(event.charCode);
        if (/^[a-zA-Z]/.test(keyPressed)) {
            processKeyPress(keyPressed.toLowerCase());
        }
    });

    // Reset the scoreboard and initialize some timers.
    scoreboard.reset();
    window.setTimeout(addNewWord, 1000);
    window.setInterval(applyGravity, 1);
});