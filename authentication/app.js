// VARIABLES TO STORE DETAILS
let username = "";
let emailAddress = "";
let password = "";

function createAccount(){
    // CREATES ACCOUNTS 
    let name = document.getElementById('username').value;  // GETS DETAILS ENTERED
    let email = document.getElementById('email').value; // GETS DETAILS ENTERED
    let pass = document.getElementById('password').value; // GETS DETAILS ENTERED

    // CHECK TO ENSURE THAT ALL FIELDS ARE WELL FILLED
    if (typeof name,email,pass === 'undefined' || name,email,pass === null || name,email,pass === ""){
        alert("One or More Credentials Missing, Cannot Be Left Blank");
    } else {
        username = name;
        emailAddress = email;
        password = pass;
        alert('Account Created Successfully!')
        document.getElementById("create-form").style.display = "none"; // HIDES THE CREATE FORM DIV
        document.getElementById("login-form").style.display = "flex";
        document.getElementById("login-form").style.flexDirection ="column";
        document.getElementById("login-form").style.alignItems ="center";
        document.getElementById("login-form").style.justifyContent ="space-between";     
    }
}

function login(){
    // TRIGGERED WHEN LOGIN BUTTON IS CLICKED
    let name = document.getElementById('enteredusername').value;  
    let email = document.getElementById('enteredemail').value;
    let pass = document.getElementById('enteredpassword').value;

    if (name == username && email == emailAddress && pass == password){
        alert('Credentials Entered Successfully, Click OK to Continue to To-Do List Website')
        window.location.href = "../todolist/index.html"; // OPEN TO DO LIST
    } else {
        alert("Input Value(s) Does Not Match / One or More Credentials Missing"); // MESSAGE IF THE DETAILS DO NOT MATCH
    }
}

function fillLoginDetails (){
    // SMALL FUNCTION FOR CONVENIENCE
    // TRIGGERED WHEN YOU CLICK "FILL IN SAVED DETAILS FUNCTION"
    let name = document.getElementById('enteredusername');
    name.value = username;  // FILLS NAME
    let email = document.getElementById('enteredemail');
    email.value = emailAddress; // FILLS EMAIL
    let pass = document.getElementById('enteredpassword');
    pass.value = password; // FILLS PASSWORD
}
