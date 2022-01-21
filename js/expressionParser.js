'use strict';

import {getPriority, calc} from './operations';

/**
 * Parse and calculate expression
 * @param {string[]} tokensList - List of tokens of Expression
 * @returns {number} result of expression
 */
export default function calcExpression(tokensList) {
    const numbers = [];
    const letters = [];

    for (let token of tokensList) {
        console.log(`numbers: ${numbers}\nletters: ${letters}\ntoken: ${token}\n`);
        if (!isNaN(token)) {
            // Current token is number
            numbers.push(token);
        } else if (!letters.length) {
            // Current token is quote/operator and we got empty letters stack
            letters.push(token);
        } else if (token === ')') {
            // Current token is end quote, calculate expression in quotes
            let letter = letters.pop();
            while (letter !== '(') {
                // Calculate expression in quotes

                const number2 = numbers.pop()
                const number1 = numbers.pop();

                // Calculate operation, push a result to numbers stack
                numbers.push(calc(letter, number1, number2));

                letter = letters.pop();
            }
        } else if (token === '(') {
            letters.push(token);
        } else {
            // Current token is operator and we have non-empty letters stack
            // We need check priority of last operation in this case

            // Check previous letter
            const prevLetter = letters.pop();

            if (prevLetter === '(') {
                // Got start quote, push it back in letters stack with current token
                letters.push(prevLetter, token);

            } else if (getPriority(prevLetter) >= getPriority(token)) {
                // Got operator token, check priorities

                // calculate previous expression
                const number2 = numbers.pop()
                const number1 = numbers.pop();

                numbers.push(calc(prevLetter, number1, number2));

                // Operation with bigger priority was calculated
                // Push current token in letters stack
                letters.push(token);
            } else {
                // Operation priority of current token is smaller
                // Push it in letters stack
                letters.push(prevLetter, token);
            }
        }
    }

    console.log(`numbers: ${numbers}\nletters: ${letters}\n`);

    // Expression simplified to one operation, lets calculate it

    // Got last 2 numbers from stack
    const number2 = numbers.pop();
    const number1 = numbers.pop();

    // Calculate operation and return result
    return calc(letters.pop(), number1, number2);
}
