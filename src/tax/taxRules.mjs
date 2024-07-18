import { OperationType } from "../operation/operationType.mjs";

/**
 * Class the holds the business rules of tax calculation and has a method for calculating taxes,
 * given a current @Operation and an @OperationHistory
 * 
 * Currently, tax applied are 20% of profit and no taxes are applied if:
 * - The operation is a Buy operation
 * - The total operation value is less than R$ 20.000,00
 * - The operation has a negative result or the total historical accumulated loss is negative
 * 
 * This class can be extended to with more rules, as required, or if the tax policies change.
 */
export class TaxRules {
    // Checks if operation type is Buy, so it should not generate taxes
    static #opIsBuy(op) {
        return op.getType() === OperationType.BUY;
    }

    // Checks if total operation value is less or equal 20k
    static #opValueIsLessThanEqual20k(op) {
        const opTotalValue = op.getUnitCost() * op.getQuantity();
        return opTotalValue <= 20000;
    }

    // Checks whether history has losses accumulated
    static #opIsNegativeOrHasAccumulatedLosses(opHistory) {
        return opHistory.getAccumulatedLoss() < 0;
    }

    // Calculates a 20% tax over profit
    static #generate20percentTaxes(pnLAfterDeductingLosses) {
        return 0.2 * pnLAfterDeductingLosses;
    }

    static calculateTaxes(operation, opHistory, pnLAfterDeductingLosses) {
        if (
            TaxRules.#opIsBuy(operation)
            || TaxRules.#opValueIsLessThanEqual20k(operation)
            || TaxRules.#opIsNegativeOrHasAccumulatedLosses(opHistory)
        ) {
            return 0;
        }

        return this.#generate20percentTaxes(pnLAfterDeductingLosses);
    }
}