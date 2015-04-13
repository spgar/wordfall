
/* exported Scoreboard */

// Keeps track of score, level, health, and number of completed words.
var Scoreboard = function(scoreDiv, levelDiv, healthDiv, callbackGameOver) {
    'use strict';

    // Constants
    var STARTING_HEALTH = 100;
    var HEALTH_GAINED_PER_LEVEL = 5;
    var WORDSFINISHED_PER_LEVEL = 5;

    var WORD_DELAY_BASE = 2000;
    var WORD_DELAY_DECREASE_PER_LEVEL = 150;
    var WORD_SPEED_BASE = 10;
    var LEVELS_PER_DIFFICULTY_INCREASE = 10;

    var score = 0;
    var maxScore = 0;
    var wordsFinishedThisLevel = 0;
    var health = STARTING_HEALTH;
    var level = 1;

    var divScore = scoreDiv;
    var divLevel = levelDiv;
    var divHealth = healthDiv;
    var gameOverCallback = gameOverCallback;

    // Score
    var getScore = function() {
        return score;
    };

    var setScore = function(value) {
        score = value;
        if (score > maxScore) {
            maxScore = score;
        }
        divScore.innerHTML = 'Score: ' + score + ' (max: ' + maxScore + ')';
    };

    // Health
    var getHealth = function() {
        return health;
    };

    var setHealth = function(value) {
        health = value;
        divHealth.innerHTML = 'Health: ' + health;

        if (health <= 0) {
            callbackGameOver();
        }
    };

    // Level
    var setLevel = function(value) {
        level = value;
        divLevel.innerHTML = 'Level: ' + level;
    };

    var incrementWordsFinished = function() {
        wordsFinishedThisLevel += 1;
        if (wordsFinishedThisLevel > WORDSFINISHED_PER_LEVEL) {
            setHealth(health + HEALTH_GAINED_PER_LEVEL);
            level += 1;
            wordsFinishedThisLevel = 0;
        }
    };

    var reset = function() {
        setScore(0);
        setHealth(STARTING_HEALTH);
        setLevel(1);
        wordsFinishedThisLevel = 0;
    };

    // Determine the word difficulty.
    var calcCurrentWordDifficulty = function() {
        return Math.min(Math.floor(level / LEVELS_PER_DIFFICULTY_INCREASE) + 1, 3);
    };

    // How many levels since we've kicked up the difficulty level?
    function calcLevelSinceDifficultyIncrease() {
        return level - ((calcCurrentWordDifficulty() - 1) * LEVELS_PER_DIFFICULTY_INCREASE);
    }

    // How much delay in between words?
    var calcWordDelay = function() {
        return Math.max(300, WORD_DELAY_BASE - (WORD_DELAY_DECREASE_PER_LEVEL * calcLevelSinceDifficultyIncrease()));
    };

    // How fast do words fall?
    var calcWordSpeed = function() {
        return Math.max(1, WORD_SPEED_BASE - calcLevelSinceDifficultyIncrease());
    };

    return {
        incrementWordsFinished: incrementWordsFinished,
        reset: reset,

        getScore: getScore,
        setScore: setScore,

        getHealth: getHealth,
        setHealth: setHealth,

        setLevel: setLevel,

        calcCurrentWordDifficulty: calcCurrentWordDifficulty,
        calcWordDelay: calcWordDelay,
        calcWordSpeed: calcWordSpeed
    };
};