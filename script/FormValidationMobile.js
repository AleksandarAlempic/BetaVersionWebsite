
const form1 = document.querySelector("form"); 

const nameInput1 = document.querySelector('input[name="name1"]');
const validationMessageForName1 = document.getElementById("nameValidation1");

const emailInput1 = document.querySelector('input[name="email1"]');
const validationMessageForEmail1 = document.getElementById("emailValidation1");
const validationMessageForEmailRegex1 = document.getElementById("emailValidationHiddenRegex1");

const bodyInput1 = document.querySelector('textarea[name="textarea1"]');
const validationMessageForBody1 = document.getElementById("bodyValidation1");

const regexPattern1 ="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$";

let validated1 = false;
let validatedMail1 = false;
let validatedBody1 = false;

const validateInputsName1 = () => {
    if(nameInput1.value === ""){
        validationMessageForName1.classList.remove("hidden");
        validated1 = false;
    }
    else{
        validationMessageForName1.classList.add("hidden");
        validated1 = true;
    }  
}

const validateInputsBody1 = () => {
    if(bodyInput1.value === ""){
        validationMessageForBody1.classList.remove("hidden");
        validatedBody1 = false;
    }
    else{
        validationMessageForBody1.classList.add("hidden");
        validatedBody1 = true;
    }  
}

const regexEmail1= () => {
    if(!emailInput.value.match(regexPattern1)){
        validationMessageForEmailRegex1.classList.remove("hiddenRegex");
        validatedMail1 = false;
    }
    else{
        validationMessageForEmailRegex1.classList.add("hiddenRegex");
        validatedMail1 = true;
    }
}

const validateInputsEmail1= () => {
    if(emailInput1.value === ""){
        validationMessageForEmail1.classList.remove("hidden");
        validationMessageForEmailRegex1.classList.add("hiddenRegex");
        validatedMail1 = false;
    }
    else{
        validationMessageForEmail1.classList.add("hidden");
        validatedMail1 = true;
    }
}

function sendEmail1(){
    if(validated1 && validatedMail1 && validatedBody1){
        form1.action = "https://formspree.io/f/mbjerdar";
        form1.method = "POST";
        form1.submit();
    }
    else{
        console.log('Inputs are not correct');
    }

}

// function sendEmail(){
// Email.send({
// Host : "smtp.elasticemail.com",
// Username : "aleksandar.alempic93@gmail.com",
// Password : "79B64EFB6146214D589EC15D1A55A467F2BF",
// To : 'aleksandar.alempic93@gmail.com',
// From : document.getElementById("email").value,
// Subject : "",
// Body : bodyInput.value,
// }).then(
// message => alert(message)
// );
// }

form1.addEventListener("submit", (e) => {
      e.preventDefault();
      validateInputsName1();
      validateInputsBody1();
      regexEmail1();
      validateInputsEmail1();
      sendEmail1();
});




