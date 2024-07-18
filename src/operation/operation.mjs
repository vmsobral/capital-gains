export class Operation {
    #type;
    #quantity;
    #unitCost;

    constructor(opJson) {
        this.#type = opJson["operation"];
        this.#quantity = opJson["quantity"];
        this.#unitCost = opJson["unit-cost"];
    }

    getType() {
        return this.#type;
    }

    getQuantity() {
        return this.#quantity;
    }

    getUnitCost() {
        return this.#unitCost;
    }
}