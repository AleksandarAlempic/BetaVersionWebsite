

let number1 = document.getElementById("button1");
let number2 = document.getElementById("button2");
let number3 = document.getElementById("button3");
let number4 = document.getElementById("button4");
let number5 = document.getElementById("button5");
let number6 = document.getElementById("button6");
let number7 = document.getElementById("button7");
let number8 = document.getElementById("button8");
let number9 = document.getElementById("button9");

let plusButton = document.getElementById("buttonPlus");
let minusButton = document.getElementById("buttonMinus");
let multipleButton = document.getElementById("buttonMultiple");
let buttonDiv = document.getElementById("buttonDiv");


let state = {
    firstNumber: "",
    secondNumber: "",
    operation: null, // 'plus', 'minus', 'multiply', 'divide', 'sqrt'
    numberInMonitor: "",
    fullstopTriggered: false,
    equalTriggered: false
    };

    function clearMonitor() {
        document.getElementById("Monitor").value = "";
        state = {
        firstNumber: "",
        secondNumber: "",
        operation: null,
        numberInMonitor: "",
        fullstopTriggered: false,
        equalTriggered: false,
        };
    }

function getNumberFromCalculator(number) {
    if (state.operation === null & state.secondNumber === "") {
    // Ako operacija još nije postavljena, korisnik unosi prvi broj.
        if (state.fullstopTriggered) {
            // Ako je aktivirana decimalna tačka, dodaj broj na kraj trenutnog unosa.

            if(state.numberInMonitor.includes(".")){
                state.numberInMonitor = state.numberInMonitor +  number;
                document.getElementById("Monitor").value = state.numberInMonitor;
            }
            else{
                state.numberInMonitor = state.firstNumber + '.' +  number;
                document.getElementById("Monitor").value = state.numberInMonitor;
            }
         
        } else {
            // Ako nije, ili se dodaje broj na prazan string (prvi unos), 
            // ili dodajemo broj na već postojeći string (npr. "12" postaje "123").
            state.numberInMonitor = state.firstNumber === "" ? number : state.firstNumber + '' + number;
            state.firstNumber = state.firstNumber + '' + number;
            document.getElementById("Monitor").value = state.numberInMonitor;
        }
        // Nakon unosa, prvi broj uvek treba da bude numerička vrednost, pa ga parsiramo.
        state.firstNumber = parseFloat(state.numberInMonitor);
        document.getElementById("Monitor").value = state.numberInMonitor;
    } else {
        // Ako je operacija već postavljena, korisnik unosi drugi broj.
        
        if (state.fullstopTriggered) {
          
            // Ako je aktivirana decimalna tačka, dodajemo tačku pre novog broja.
            state.secondNumber = state.secondNumber + "" + number;
        } else {
            // Ako nije, proveravamo da li je drugi broj prazan. Ako jeste, unosimo novi broj,
            // a ako nije, dodajemo ga na postojeći broj (npr. "45" postaje "456").
            state.secondNumber = state.secondNumber === "" ? number : state.secondNumber + "" + number;
        }
        state.secondNumber = parseFloat(state.secondNumber);
        // Ažuriramo sadržaj monitora, prikazujući prvi broj, operaciju i drugi broj.
        state.numberInMonitor = state.firstNumber + " " + getOperationSymbol() + " " + state.secondNumber;
        document.getElementById("Monitor").value = state.numberInMonitor;
    }
    }
    
    function getOperationSymbol() {
    switch (state.operation) {
    case 'plus': return "+";
    case 'minus': return "-";
    case 'multiply': return "*";
    case 'fullstop': return state.operation;
    case 'divide': return ":";
    default: return ""; // Ako nije postavljena nijedna operacija, vraća prazan string.
    }
    }


function minusFunction() {
     
    state.operation = 'minus';
    state.fullstopTriggered = false;

     if(state.firstNumber === "" & !state.equalTriggered){
        document.getElementById("Monitor").value = state.numberInMonitor + " - ";
     }

     else if (state.secondNumber != ""){
        state.numberInMonitor = parseFloat(state.numberInMonitor) - state.secondNumber;
        document.getElementById("Monitor").value = state.numberInMonitor + " -";
        state.firstNumber = state.numberInMonitor;
        state.secondNumber = "";
     }
     
     else if (state.equalTriggered){
        state.firstNumber = state.numberInMonitor;
        document.getElementById("Monitor").value = state.numberInMonitor + " - ";
     }
     else{
        document.getElementById("Monitor").value = state.firstNumber + " - ";
     }    
}

function plusFunction11() {

    state.operation = 'plus';
    state.fullstopTriggered = false;
  
     if(state.firstNumber === "" & !state.equalTriggered){
        document.getElementById("Monitor").value = state.numberInMonitor + " + ";
     }
     else if (state.secondNumber != ""){
        state.numberInMonitor = parseFloat(state.numberInMonitor) + state.secondNumber;
        document.getElementById("Monitor").value = state.numberInMonitor + " +";
        state.firstNumber = state.numberInMonitor;
        state.secondNumber = "";
     }
     else if (state.equalTriggered){
        state.firstNumber = state.numberInMonitor;
        document.getElementById("Monitor").value = state.numberInMonitor + " + ";
     }
     else{
        document.getElementById("Monitor").value = state.firstNumber + " + ";
     }
}

// state.numberInMonitor = parseFloat(numberInMonitor) + state.secondNumber;
//         document.getElementById("Monitor").value = state.numberInMonitor;

function multiple(){

    state.operation = 'multiply';
    state.fullstopTriggered = false;
    
     if(state.firstNumber === "" & !state.equalTriggered){
        document.getElementById("Monitor").value = state.numberInMonitor + " * ";
     }
     else if (state.secondNumber != ""){
        state.numberInMonitor = parseFloat(state.numberInMonitor) * state.secondNumber;
        document.getElementById("Monitor").value = state.numberInMonitor + " *";
        state.firstNumber = state.numberInMonitor;
        state.secondNumber = "";
     }
     else if (state.equalTriggered){
        state.firstNumber = state.numberInMonitor;
        document.getElementById("Monitor").value = state.numberInMonitor + " * ";
     }
     else{
        document.getElementById("Monitor").value = state.firstNumber + " * ";
     }
}

function divide(){

    state.operation = 'divide';
    state.fullstopTriggered = false;
    
     if(state.firstNumber === "" & !state.equalTriggered){
        document.getElementById("Monitor").value = state.numberInMonitor + " : ";
     }
     else if (state.equalTriggered){
        state.firstNumber = state.numberInMonitor;
        document.getElementById("Monitor").value = state.numberInMonitor + " : ";
     }
     else if (state.secondNumber != ""){
        state.numberInMonitor = parseFloat(state.numberInMonitor) / state.secondNumber;
        document.getElementById("Monitor").value = state.numberInMonitor + " :";
        state.firstNumber = state.numberInMonitor;
        state.secondNumber = "";
     }
  
     else{
        document.getElementById("Monitor").value = state.numberInMonitor + " : ";
     }
}

function sqrt(){

    state.operation = 'sqrt';
    state.fullstopTriggered = false;

    if (state.numberInMonitor === ""){
        state.numberInMonitor = 0;
        document.getElementById("Monitor").value = state.numberInMonitor;
    }
    else{
        state.numberInMonitor = Math.sqrt(state.numberInMonitor);
        document.getElementById("Monitor").value =  state.numberInMonitor;
    }

}

function fullStop(){

    state.fullstopTriggered = true;
   
     if(state.firstNumber === ""|| state.numberInMonitor === ""){
        document.getElementById("Monitor").value = "0.";
        state.numberInMonitor = "0.";
        state.firstNumber = state.numberInMonitor;
     }
     else if(state.secondNumber != "" || state.secondNumber === 0){
        state.numberInMonitor = state.numberInMonitor +  ".";
        state.secondNumber = state.secondNumber +  ".";
        document.getElementById("Monitor").value =  state.numberInMonitor;
     }
     else {
        state.numberInMonitor = state.numberInMonitor + ".";
        document.getElementById("Monitor").value =  state.firstNumber + ".";
     }
}


function testFunction(){ // If I leave a EqualFunction as name and make onClick with this name nothing happens - Same problem is with Plus() - I changed to PlusFunction11() - then it's triggered.
    state.equalTriggered = true;
    document.getElementById("Monitor").value = state.numberInMonitor;
    if(state.operation === "minus"){
        if(state.firstNumber === ""){
            state.numberInMonitor = parseFloat(numberInMonitor) - state.secondNumber;
            document.getElementById("Monitor").value = state.numberInMonitor
        }
        else{
            state.numberInMonitor = state.firstNumber - state.secondNumber;
            document.getElementById("Monitor").value = state.numberInMonitor;
            state.firstNumber = "";
            state.secondNumber = "";
            // minusTriggered = false;
        } 
    }
    else if (state.operation === "plus"){
        if(state.firstNumber === ""){
            state.numberInMonitor = parseFloat(numberInMonitor) + state.secondNumber;
            document.getElementById("Monitor").value = state.numberInMonitor
        }
        else{
            state.numberInMonitor = state.firstNumber + state.secondNumber;
            document.getElementById("Monitor").value = state.numberInMonitor;
            state.firstNumber = "";
            state.secondNumber = "";
            // plusTriggered = false;
        } 
    }
    else if (state.operation === "multiply"){
        if(state.firstNumber === ""){
            state.numberInMonitor = parseFloat(numberInMonitor) + state.SecondNumber;
            document.getElementById("Monitor").value = state.numberInMonitor
        }
        else{
            state.numberInMonitor = state.firstNumber * state.secondNumber;
            document.getElementById("Monitor").value = state.numberInMonitor;
            state.firstNumber = "";
            state.secondNumber = "";
            // plusTriggered = false;
        } 
    }
    else if (state.operation === "divide"){
        if(state.firstNumber === ""){
            state.numberInMonitor = parseInt(numberInMonitor) + state.secondNumber;
            document.getElementById("Monitor").value = state.numberInMonitor
        }
        else{
            state.numberInMonitor = state.firstNumber / state.secondNumber;
            document.getElementById("Monitor").value = state.numberInMonitor;
            state.firstNumber = "";
            state.secondNumber = "";
            // plusTriggered = false;
        } 
    }
    else{

    }
    document.getElementById("Monitor").value = state.numberInMonitor;
}

