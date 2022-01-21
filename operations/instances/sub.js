'use strict';

/**
 * Subtraction operation
 */
export default {
    /**
     * @returns {number}
     */
    getPriority() {
        return 1;
    },

    /**
     *
     * @param operand1
     * @param operand2
     * @returns {number}
     */
    calc(operand1, operand2) {
        return Number(operand1) - Number(operand2);
    }
}
