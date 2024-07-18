import { Operation } from "../src/operation/operation.mjs";
import { OperationHistory } from "../src/operation/operationHistory.mjs";

describe("OperationHistory tests", () => {

    test('should round Average Price to 2 decimal', async () => {
        const op1 = new Operation({"operation": "buy", "unit-cost": 20.00, "quantity": 10});
        const op2 = new Operation({"operation": "buy", "unit-cost": 10.00, "quantity": 5});

        const opHistory = new OperationHistory();
        opHistory.processOperation(op1);
        opHistory.processOperation(op2);
    
        expect(opHistory.getAveragePrice()).toEqual(16.67);
    });

    test('should throw error on unknown operation', async () => {
        const op1 = new Operation({"operation": "split", "unit-cost": 10.00, "quantity": 10});

        const opHistory = new OperationHistory();
        const t = () => {
            opHistory.processOperation(op1);
        };
    
        expect(t).toThrow(Error);
    });

    test('should reset average price after sell all quantity', async () => {
        const op1 = new Operation({"operation": "buy", "unit-cost": 20.00, "quantity": 10});
        const op2 = new Operation({"operation": "sell", "unit-cost": 21.00, "quantity": 10});

        const opHistory = new OperationHistory();
        opHistory.processOperation(op1);
        opHistory.processOperation(op2);
    
        expect(opHistory.getAveragePrice()).toEqual(0);
    });
});