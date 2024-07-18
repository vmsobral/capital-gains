import { OperationType } from "./operationType.mjs";

/**
 * Processes a novel operation and registers the necessary data to calculate
 * taxes on later operations.
 */
export class OperationHistory {
    #averagePrice = 0;
    #totalQuantity = 0;
    #accumulatedLoss = 0;

    getAccumulatedLoss() {
        return this.#accumulatedLoss;
    }

    getAveragePrice() {
        return this.#averagePrice;
    }

    /**
     * Processes an @Operation and updates the historical data
     * 
     * @param operation the @Operation to be processed
     * @returns the PnL of the processed operation, if sale, or 0 otherwise
     */
    processOperation (operation) {
        switch (operation.getType()) {
            case OperationType.BUY:
                return this.#processBuy(operation);
            case OperationType.SELL:
                return this.#processSell(operation);
            default:
                throw new Error("Operation Not Supported");
        }
    }

    #processBuy(operation) {
        // Calculates weighted average price
        const historicalTotalCost = this.#totalQuantity * this.#averagePrice;
        const operationTotalCost = operation.getQuantity() * operation.getUnitCost();
        const totalQuantityAfterOperation = this.#totalQuantity + operation.getQuantity();
        this.#averagePrice = (historicalTotalCost + operationTotalCost) / totalQuantityAfterOperation;
        this.#averagePrice = parseFloat(this.#averagePrice.toFixed(2));

        // Updates new total quantity
        this.#totalQuantity = totalQuantityAfterOperation;

        return 0;
    }

    #processSell(operation) {
        // Calculates the accumulated loss, if any
        const operationTotalCost = operation.getQuantity() * operation.getUnitCost();
        const operationPnL = operationTotalCost - this.#averagePrice * operation.getQuantity();
        const pnLAfterDeductingLosses = this.#accumulatedLoss + operationPnL;
        if (pnLAfterDeductingLosses >= 0) {
            this.#accumulatedLoss = 0;
        } else {
            this.#accumulatedLoss = pnLAfterDeductingLosses;
        }

        // Decreases total quantity by sell amount and resets averagePrice if it reaches 0,
        // so it can be recalculated when there is a new buy
        this.#totalQuantity -= operation.getQuantity();
        if (this.#totalQuantity === 0) {
            this.#averagePrice = 0;
        }

        return pnLAfterDeductingLosses;
    }
}