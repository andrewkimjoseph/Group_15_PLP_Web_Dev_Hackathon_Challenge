const defaultPassword = "0000";
let startingBalance = 10000;
let atmTransactions = [];
let today = new Date();
       
function loggedIn(){
    window.location.href = 'atm.html';
}
function loggedOut(){
    window.location.href = 'main.html';
}
function login(){
    let enteredPassword = document.getElementById('password').value;
    if (enteredPassword == defaultPassword){
        alert("Password Correct!");
        return loggedIn();
    } else {
        alert("Password Not Entered or Incorrect!");
        enteredPassword.value = '';
    }
}

function showPassword(){
    let displayAreaPassword = document.getElementById('show-password');
    let textNode = "HELLO, THE DEFAULT PASSWORD IS:  " + defaultPassword;
    displayAreaPassword.innerHTML = textNode;

}

function showBalance(){
    let displayAreaBalance = document.getElementById('balance');
    let textNode = 'BALANCE: ' + startingBalance.toLocaleString("en-US");
    displayAreaBalance.innerHTML = textNode;
}

function withdraw(){
    let moneyOut = parseInt(document.getElementById('moneyout').value);
    if (isNaN(moneyOut)){
        alert('You Need to Enter a Valid Figure');
    } else {
        if (moneyOut < 0){
            alert('You Cannot Withdraw An Amount Less Than Zero(0)');
            document.getElementById('moneyout').value = '';
        } else if (moneyOut < 1000){
            alert('In Our System, You Cannot Withdraw An Amount Lesser Than 1000');
            document.getElementById('moneyout').value = '';
        } else if (moneyOut > startingBalance){
            alert('You Cannot Withdraw An Amount Larger Than Your Current Balance\n\nCurrent Balance is: ' + startingBalance.toLocaleString("en-US"));
            document.getElementById('moneyout').value = '';
        } else {
            confirmMessage = 'Are You Sure You Want to Withdraw ' + moneyOut;
            if (window.confirm(confirmMessage)){
                startingBalance -= moneyOut;
                alert('Withdrawal Successful');
                transactionNote = 'TYPE: WITHDRAWAL, AMOUNT: ' + moneyOut;
                atmTransactions.push(transactionNote);
                document.getElementById('moneyout').value = '';
                let balanceButton = document.getElementById('balanceButton');
                balanceButton.click();
            } else {
                alert("Operation Cancelled");
                document.getElementById('moneyout').value = '';
            }
        }
    }

}

function deposit(){
    let moneyIn = parseInt(document.getElementById('moneyin').value);
    if (isNaN(moneyIn)){
        alert('You Need to Enter a Valid Figure');
    } else {
        if (moneyIn <= 0){
            alert('Very Funny, You Cannot Deposit Nothing or a Negative Figure, Can You?');
            document.getElementById('moneyin').value = '';
        } else {
            confirmMessage = 'Are You Sure You Want to Deposit ' + moneyIn + '?';
            if (window.confirm(confirmMessage)){
                startingBalance += moneyIn;
                alert('Deposit Successful, Click to Refresh Balance');
                transactionNote = 'TYPE: DEPOSIT, AMOUNT: ' + moneyIn;
                atmTransactions.push(transactionNote);
                document.getElementById('moneyin').value = '';
                let balanceButton = document.getElementById('balanceButton');
                balanceButton.click();
            } else {
                alert("Operation Cancelled");
            }
        }
    }
}

function exit() {
    confirmMessage = 'Are You Sure You Want to Exit The System?';
    downloadMessage = 'Do You Wish To Download Your Transactions?';
    if (window.confirm(confirmMessage)){
        if (window.confirm(downloadMessage)){
            let downloadLink = document.createElement("a");
            let transactionNotes = atmTransactions.join('\n');
            downloadLink.href = window.URL.createObjectURL(new Blob([transactionNotes], {type: "text/plain"}));
            downloadLink.download = "transactionsReceipt.txt";
            downloadLink.click();

        }
        alert('SYSTEM CLOSING, LAST VISITED ON' + '\n' + today);
        return loggedOut();
    }
}

