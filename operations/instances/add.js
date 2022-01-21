'use strict';

/**
 * Addition operation
 */
export default {
    /**
     * Get priority of operation
     * @returns {number}
     */
    getPriority() {
        return 1;
    },

    /**
     * Calculate operation
     * @param operand1
     * @param operand2
     * @returns {number}
     */
    calc(operand1, operand2) {
        return Number(operand1) + Number(operand2);
    }
}
