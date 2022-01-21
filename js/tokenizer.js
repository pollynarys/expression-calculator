'use strict';

/**
 * Split expression to tokens
 * @param {string} expression
 * @returns {string[]} - List of tokens
 */
export default function tokenize (expression) {
    const chars = expression.replace(/ /g, '');
    const tokens = [];

    let numberBuffer = [];
    for (let char of chars) {
        if (['(', ')', '+', '-', '*', '/', '^'].includes(char)) {
            if (['+', '-'].includes(char)) {
                if (numberBuffer.length) {
                    // Got operator char after number
                    // Push number from buffer and current char to tokens stack
                    tokens.push(numberBuffer.join(''), char);
                    numberBuffer.length = 0; // Clean number buffer
                    continue;
                }

                if (!tokens.length) {
                    // Empty tokens stack
                    // It means we got first char as unary operator
                    // Push it to number buffer
                    numberBuffer.push(char);
                    continue;
                }

                // Check prev char
                const prevChar = tokens.pop();
                if (prevChar === '(') {
                    // Previous token is start quote
                    // It means we got current char as unary operator
                    // Push it in number buffer
                    numberBuffer.push(char);
                    tokens.push(prevChar); // Push back previous token
                    continue;
                } else {
                    tokens.push(prevChar); // Push back previous token
                }
            }

            if (numberBuffer.length) {
                // Caught not number char, push number buffer to list of tokens
                tokens.push(numberBuffer.join(''));
                numberBuffer.length = 0; // Clean number buffer
            }

            tokens.push(char);
        }

        if (!isNaN(char)) {
            // Char is number, push it to number buffer
            numberBuffer.push(char);
        }
    }

    if (numberBuffer.length) {
        // Got non-empty number buffer, push it to tokens list
        tokens.push(numberBuffer.join(''));
    }

    return tokens;
}
