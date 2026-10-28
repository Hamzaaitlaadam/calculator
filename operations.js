function add(num1,num2){
    return num1 + num2;
}

function subtract(num1,num2){
    return num1 - num2;
}

function multiply(num1,num2){
    return num1 * num2;
}

function divide(num1,num2){
    if(num2 === 0) return `Nice try, you can't divide by zero!`;

    return num1/num2;
}

function operate(operator,num1,num2){
    let result;
    
    if(!Number.isFinite(num1) || !Number.isFinite(num2)) return `Invalid Number.`;
    
    switch(operator){
        case "+":
            result = add(num1,num2);
            break;
        case "-":
            result = subtract(num1,num2);
            break;
        case "*":
            result = multiply(num1,num2);
            break;
        case "/":
            result = divide(num1,num2);
            break;
        default:
               return `Invalid Operator`;             
    }
     
    if( typeof result === "string") return result;

    if(!Number.isFinite(result)) return `Invalid Calculation!`;

    return Math.round(result * 1e8)/ 1e8;
}

console.log(operate("/","10",6));