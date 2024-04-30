
const form = document.querySelector("form"); 

const nameInput = document.querySelector('input[name="name"]');
const validationMessageForName = document.getElementById("nameValidation");

const emailInput = document.querySelector('input[name="email"]');
const validationMessageForEmail = document.getElementById("emailValidation");
const validationMessageForEmailRegex = document.getElementById("emailValidationHiddenRegex");

const bodyInput = document.querySelector('textarea[name="textarea"]');
const validationMessageForBody = document.getElementById("bodyValidation");

const regexPattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$";

let validated = false;
let validatedMail = false;
let validatedBody = false;

const validateInputsName = () => {
    if(nameInput.value === ""){
        validationMessageForName.classList.remove("hidden");
        validated = false;
    }
    else{
        validationMessageForName.classList.add("hidden");
        validated = true;
    }  
}

const validateInputsBody = () => {
    if(bodyInput.value === ""){
        validationMessageForBody.classList.remove("hidden");
        validatedBody = false;
    }
    else{
        validationMessageForBody.classList.add("hidden");
        validatedBody = true;
    }  
}

const regexEmail= () => {
    if(!emailInput.value.match(regexPattern)){
        validationMessageForEmailRegex.classList.remove("hiddenRegex");
        validatedMail = false;
    }
    else{
        validationMessageForEmailRegex.classList.add("hiddenRegex");
        validatedMail = true;
    }
}

const validateInputsEmail= () => {
    if(emailInput.value === ""){
        validationMessageForEmail.classList.remove("hidden");
        validationMessageForEmailRegex.classList.add("hiddenRegex");
        validatedMail = false;
    }
    else{
        validationMessageForEmail.classList.add("hidden");
        validatedMail = true;
    }
}

function sendEmail(){
    if(validated && validatedMail && validatedBody){
        form.action = "https://formspree.io/f/mbjerdar";
        form.method = "POST";
        form.submit();
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

form.addEventListener("submit", (e) => {
      e.preventDefault();
      validateInputsName();
      validateInputsBody();
      regexEmail();
      validateInputsEmail();
      sendEmail();
});




