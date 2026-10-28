let firstNumber = null;
let waitingForSecondNumber = false;
let operator = null;
let displayValue = "0";

const display = document.getElementById("display");
const data_digit = document.querySelectorAll("[data-digit]");
const data_operator = document.querySelectorAll("[data-operator]");
const data_action = document.querySelectorAll("[data-action]");
const decimalBtn = document.querySelector('[data-action="decimal"]');

function populate(){
    display.textContent = displayValue;
    decimalBtn.disabled =displayValue.includes(".") && waitingForSecondNumber===false ;
}


function getInput(digit){
    if(waitingForSecondNumber === true){
        displayValue=digit;
        waitingForSecondNumber=false;
    }else if(displayValue==="0"){
        displayValue=digit;
      
    }else{
        displayValue =displayValue+digit;
    }
    populate();
    return;
}

function handleOpertor(op){
    
    if(waitingForSecondNumber === false){
        let rtn=true;
        if(firstNumber!==null && operator!== null){
            rtn =calculate();
        }
        if(rtn === false) return ;
        operator=op;
        firstNumber = Number(displayValue);
        waitingForSecondNumber=true;
        populate();
    }else{
        operator=op; 
    }
}
function handlerAction(action){
    switch(action){
        case "clear":
            clear();
        break;
        case "equals":
            equals(); 
        break;
        case "decimal":
            decimal(); 
        break;
        case "backspace":
            backspace();
        break;
    }
}
function backspace(){
    if(waitingForSecondNumber === true){
        populate();
        return;
    }
    let result =displayValue.slice(0,-1);
    if(result===""){
        displayValue="0";
        populate();
        return;
    }
    displayValue = result;
    populate();
    return;
}
function decimal(){
    if(waitingForSecondNumber === true){
        displayValue="0.";
        waitingForSecondNumber =false;
        populate();
        return;
    }else if(displayValue.includes(".")){
        populate();
        return;
    }else{
        displayValue = displayValue+"."
        populate();
        return;
    }
}

function clear(){
    firstNumber = null;
    waitingForSecondNumber = false;
    operator = null;
    displayValue = "0";
    populate();
}
function equals(){
    if(firstNumber ===null || operator===null || waitingForSecondNumber === true)
        return;
    calculate();
}
function calculate(){
    let secondNumber = Number(displayValue);
    let result =operate(operator,firstNumber, secondNumber);

        if(typeof result === 'string'){
            displayValue=String(result);
            firstNumber = null; 
            operator = null;
            waitingForSecondNumber =true ;
            populate();
            return false;
        }
        else{
            displayValue = String(result);
            firstNumber = Number(result);
            operator = null;
            waitingForSecondNumber = true;
            populate();
            return true;
        }
}
data_digit.forEach((button) => {
    button.addEventListener("click", (event) => {
         const digit = event.currentTarget.dataset.digit;
         getInput(digit);
    });
});

data_operator.forEach((button)=>{
    button.addEventListener("click", (event)=>{
        const op=event.currentTarget.dataset.operator;
        handleOpertor(op);
    })
})

data_action.forEach((button)=>{
    button.addEventListener("click",(event)=>{
        const action = event.currentTarget.dataset.action;
        handlerAction(action);
    })
})