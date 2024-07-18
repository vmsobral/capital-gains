# Code Challenge: Capital Gain

Command line application that calculates taxes due from profits and losses of financial stock market operations.

## Requirements
- node v21.7.3
- npm 10.5.0
- docker 24.0.5

## How to Run

1. Enable the `start.sh` script for execution.

```
sudo chmod u+x start.sh
```

2. Execute the script to build the Docker image and execute the container with command line enabled. If a file shall be provided, pass it as a parameter to the script.

```
./start.sh
```

OR

```
./start.sh example.json
```

3. After executing the container, you can run the application by command line. If a file was provided, add `< file.txt` (this should be exactly the file name in this step) at the end of the command. Otherwise, the application will wait for entries on command line.

```
node src/index.js < file.txt
```

OR

```
node src/index.js
```

4. To run the tests, run the following commang (required to enable support for ES modules, since Jest does not support them by default) inside the container.
```
node --experimental-vm-modules node_modules/jest/bin/jest.js
```

4. To run eslint type the following inside the container.
```
npx eslint .
```


## About the Code and Implementation Choices

- Javascript (Node.js) was chosen as the development language for this exercise for it is the language I hold the most recent experience and felt more confortable with, given the time provided. Also, being a simple, multiparadigm, dynamically typed and easily testable language, I felt that I could provide some nice implementation and code structuring, using the existing features. It also had native support for JSON objects.

- One of those features is the use of multiparadigm. The main file `index.js` is structured in a procedural and imperative way, and is responsible for reading the command line and generating the JSON entries for the `taxCalculator`. Is also has event-driven functions for reading and closing an input file, when provided. The `calculateTaxes` function is called asynchronously so that is many operation lists are provided at once, it can process them in parallel, improving performance. The `taxCalculator.mjs` is structured the same and is responsible for iterating through the operations and calling the usecases apropriatelly.

- On the other hand, I chose to structure the rest of the login in a Object Oriented way, thus allowing to separate some business rules and logic as appropriate, create private methods and class parameters and improve the scalability, readability and maintainability of the code.

- The main classes are structured as follows:
1) `Operation`: a class to help structuring the operation inputs provided. I chose to create only `get` methods since the parameters are all inputed on constructor.
2) `OperationHistory`: a class that understand the types of operations and processes it, calculating and registering informations like `averagePrice`, `totalQuantity` and `acumulatedLoss` to be used later on. Thinking on scalability and a possible growth of the application, it can be easily extended to process new operations, such as "split" or "merge", for example.
3) `TaxRules`: holds the business logics of tax calculation. It can also be easily extended to hold new rules and calculations, if required.
4) `OperationType`: enum to help structure and maintain operation types. If a new operation is required, it should be extended with the `OperationHistory` class.

- I chose to use the ES modules syntax (`import { method } from 'module'`) instead of CommonJS syntax (`const util = require('util")`) because it is a more modern, more scalable and more readable syntax.

- The only external library used was Jest for testing.


## Limitations and Improvement Possibilities

- As a dinamically typed language, Javascript does not allow to explicitly define the object types. I considered using Typescript for that and even developed some classes with it, but since I lack more experience with that language and since it also wasn't on the suggested languages list, I chose to stick with vanilla Javascript. Given more time, I would implement the Typescript typing or redo the entire code with a more strongly typed language such as Java or Kotlin.

- On the unit tests, I opted to test only the main flow using the inputs provided by the exercise description and some corner cases, instead of each method/class separately. This is not ideal and can limit the tested code. As a next improvement I would focus on adding a test coverage tool and implement more diverse tests to encompass every flow on each class.

- Since it was said by specification that input JSON were all well-formed, I've implemented little error checking and I believe another improvement would be to create more error handling code.

- I have added an `eslint` file to ensure syntax patterns and avoid error, but I couldn't make it work with Jest, so I left the checking as "warn" status, which must be resolved on a later approach