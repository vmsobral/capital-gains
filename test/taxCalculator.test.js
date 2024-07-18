import { readFile } from 'fs';
import { dirname, join } from 'path';
import { calculateTaxes } from '../src/tax/taxCalculator.mjs';
import util from 'util';
import { fileURLToPath } from 'url';

const readFileAsync = util.promisify(readFile);
const __dirname = dirname(fileURLToPath(import.meta.url));

describe("TaxesCalculator tests", () => {

    test('case 1: should return expected output', async () => {
        const file = await readFileAsync(join(__dirname, './resources/case1.json'));
        const json = JSON.parse(file);
    
        const result = await calculateTaxes(json);
    
        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 },
            { tax: 0 }
        ]);
    });

    test('case 2: should return expected output', async () => {
        const file = await readFileAsync(join(__dirname, './resources/case2.json'));
        const json = JSON.parse(file);
    
        const result = await calculateTaxes(json);
    
        expect(result).toEqual([
            { tax: 0 },
            { tax: 10000 },
            { tax: 0 }
        ]);
    });

    test('case 3: should return expected output', async () => {
        const file = await readFileAsync(join(__dirname, './resources/case3.json'));
        const json = JSON.parse(file);
    
        const result = await calculateTaxes(json);
    
        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 },
            { tax: 1000 }
        ]);
    });

    test('case 4: should return expected output', async () => {
        const file = await readFileAsync(join(__dirname, './resources/case4.json'));
        const json = JSON.parse(file);
    
        const result = await calculateTaxes(json);
    
        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 },
            { tax: 0 }
        ]);
    });

    test('case 5: should return expected output', async () => {
        const file = await readFileAsync(join(__dirname, './resources/case5.json'));
        const json = JSON.parse(file);
    
        const result = await calculateTaxes(json);
    
        expect(result).toEqual([
            { tax: 0 },
            { tax: 0 },
            { tax: 0 },
            { tax: 10000 }
        ]);
    });

    test('case 6: should return expected output', async () => {
        const file = await readFileAsync(join(__dirname, './resources/case6.json'));
        const json = JSON.parse(file);
    
        const result = await calculateTaxes(json);
    
        expect(result).toEqual([
            {"tax": 0.00},
            {"tax": 0.00},
            {"tax": 0.00},
            {"tax": 0.00},
            {"tax": 3000.00}
        ]);
    });

    test('case 7: should return expected output', async () => {
        const file = await readFileAsync(join(__dirname, './resources/case7.json'));
        const json = JSON.parse(file);
    
        const result = await calculateTaxes(json);
    
        expect(result).toEqual([
            {"tax":0.00},
            {"tax":0.00},
            {"tax":0.00},
            {"tax":0.00},
            {"tax":3000.00},
            {"tax":0.00},
            {"tax":0.00},
            {"tax":3700.00},
            {"tax":0.00}
        ]);
    });

    test('case 8: should return expected output', async () => {
        const file = await readFileAsync(join(__dirname, './resources/case8.json'));
        const json = JSON.parse(file);
    
        const result = await calculateTaxes(json);
    
        expect(result).toEqual([
            {"tax":0.00},
            {"tax":80000.00},
            {"tax":0.00},
            {"tax":60000.00}
        ]);
    });
});