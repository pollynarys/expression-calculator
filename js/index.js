'use strict';

import tokenize from './tokenizer.js';
import parseExpression from './expressionParser.js';

let app = new Vue({
    el: '#app',
    data: {
        expression: '',
        result: '',
        accuracy: '',
    },

    methods: {
        calculate: function () {
            // Split expression to tokens

            const tokens = tokenize(this.expression);
            console.log('Tokens list: ', tokens);

            // Parse expression and calculate it
            const result = parseExpression(tokens);
            console.log('Result: ', result);

            // Determining the precision of a number
            const accuracy = x => ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0));

            if (accuracy(result) > 2) {
                this.result = Number(result).toFixed(3) + "...";
                this.accuracy = '' + Number(result);
            } else {
                this.result = Number(result);
            }
        }
    }
})
