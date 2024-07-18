import { createInterface } from 'readline';
import { calculateTaxes } from './tax/taxCalculator.mjs';

async function run () {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let jsonInputString = "";

    rl.on('line', (line) => {
        // Reads lines until a well-formed complete JSON is provided
        jsonInputString = jsonInputString.concat(" ", line);
        let jsonInput;
        try {
            jsonInput = JSON.parse(jsonInputString);
        } catch (e) {
            // If parsing the JSON throws an error, ignore and wait for another line
            return;
        }

        try {

            // Calculates taxes async and prints result on stdout
            calculateTaxes(jsonInput).then (
                taxesResult => console.log(JSON.stringify(taxesResult))
            );

        } catch (e) {
            console.error("Application encountered an error. Closing", e);
            process.exit();
        }
        
        // Reset JSON Input if there is another batch of operations to calculate
        jsonInputString = "";
    });

    rl.once ('close', () => {
        return 0;
    });
}
  
run().then(
    () => { return 0; },
    err => {
        if (err.response) {
            console.log(err.response.status, err.response.headers, err.response.data);
        } else {
            console.log(err);
        }
    }
);
