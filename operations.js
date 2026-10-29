function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) return `Nice try, you can't divide by zero!`;

    return num1 / num2;
}

function operate(operator, num1, num2) {
    let result;

    if (!Number.isFinite(num1) || !Number.isFinite(num2)) return `Invalid Number.`;

    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
        default:
            return `Invalid Operator`;
    }

    if (typeof result === "string") return result;

    if (!Number.isFinite(result)) return `Invalid Calculation!`;

    return Math.round(result * 1e8) / 1e8;
}

let firstNumber = null;
let operator = null;
let currentInput = "";
let hasError = false;


function handleOperator(nextOperator) {

    if (hasError) return;

    if (currentInput === "") {
        if (operator !== null) {
            operator = nextOperator;
        }
        return;
    }

    if (operator === null) {
        firstNumber = Number(currentInput);
    } else {
    
        let result = operate(operator, firstNumber, Number(currentInput));

        if (typeof result === "string") {
            currentInput = result;
            firstNumber = null;
            operator = null;
            hasError = true;
            return;
        }

        firstNumber = result;
    }

    operator = nextOperator;
    currentInput = "";
}

function handleNumber(digit){

    if (hasError) {
        currentInput = "";
        firstNumber = null;
        operator = null;
        hasError = false;
    }
    currentInput += digit;
}

function handleEquals() {

    if (operator === null || currentInput === "") return;

    let result = operate(
        operator,
        firstNumber,
        Number(currentInput)
    );

   
    currentInput = String(result);

   
    firstNumber = null;
    operator = null;
}
