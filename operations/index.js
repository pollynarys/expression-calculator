'use strict';
import add from './instances/add.js';
import sub from './instances/sub.js';
import mul from './instances/mul.js';
import div from './instances/div.js';
import pow from './instances/pow.js';

// List of supported operations
const operations = {
    '+': add,
    '-': sub,
    '*': mul,
    '/': div,
    '^': pow
}

/**
 * Get priority of operations
 * @param operationSymbol
 * @returns {number} - Priority of operation
 */
export function getPriority(operationSymbol) {
    const operation = operations[operationSymbol];
    if (!operation) throw new Error(`Unknown operation "${operationSymbol}"`);
    return operation.getPriority();
}

/**
 * Calculate operation
 * @param {string} operationSymbol - Symbol of operation
 * @param {number} operand1
 * @param {number} operand2
 * @returns {number} - Result of operation
 */
export function calc(operationSymbol, operand1, operand2) {
    const operation = operations[operationSymbol];
    if (!operation) throw new Error(`Unknown operation "${operationSymbol}"`);
    return operation.calc(operand1, operand2);
}
