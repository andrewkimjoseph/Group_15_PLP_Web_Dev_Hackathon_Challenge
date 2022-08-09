let username = "";
let emailAddress = "";
let password = "";

function createAccount(){
    let name = document.getElementById('username').value;  
    let email = document.getElementById('email').value; 
    let pass = document.getElementById('password').value;

    if (typeof name,email,pass === 'undefined' || name,email,pass === null || name,email,pass === ""){
        alert("One or More Credentials Missing, Cannot Be Left Blank");
    } else {
        username = name;
        emailAddress = email;
        password = pass;
        alert('Account Created Successfully!')
        document.getElementById("create-form").style.display = "none";
        document.getElementById("login-form").style.display = "flex";
        document.getElementById("login-form").style.flexDirection ="column";
        document.getElementById("login-form").style.alignItems ="center";
        document.getElementById("login-form").style.justifyContent ="space-between";     
    }
}

function login(){
    let name = document.getElementById('enteredusername').value;  
    let email = document.getElementById('enteredemail').value;
    let pass = document.getElementById('enteredpassword').value;

    if (name == username && email == emailAddress && pass == password){
        alert('Credentials Entered Successfully, Click OK to Continue to To-Do List Website')
        window.location.href = "../todolist/index.html";
    } else {
        alert("Input Value(s) Does Not Match / One or More Credentials Missing");
    }
}

function fillLoginDetails (){
    let name = document.getElementById('enteredusername');
    name.value = username;  
    let email = document.getElementById('enteredemail');
    email.value = emailAddress;
    let pass = document.getElementById('enteredpassword');
    pass.value = password;
}
