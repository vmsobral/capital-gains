import { Operation } from "../operation/operation.mjs";
import { OperationHistory } from "../operation/operationHistory.mjs";
import { TaxRules } from "./taxRules.mjs";

/**
 * Receives a JSON containing a single list of operations and iterates over it,
 * calculating taxes for each operation.
 * 
 * @param {*} allOpsJson
 * @returns a list containing the taxes paid for each operation
 */
export async function calculateTaxes (allOpsJson) {

    // Variables created and maintained on each cycle so they will not hold state
    const opHistory = new OperationHistory();
    const taxesResult = [];

    // Iterate through a single list of operations
    for (const opJson of allOpsJson) {

        const operation = new Operation(opJson);
        let pnL = 0;
        try {
            pnL = opHistory.processOperation(operation);
        } catch (e) {
            // Ignores unknown operations
            continue;
        }
        const taxes = TaxRules.calculateTaxes(operation, opHistory, pnL);

        taxesResult.push({"tax": taxes});
    }

    return taxesResult;
}