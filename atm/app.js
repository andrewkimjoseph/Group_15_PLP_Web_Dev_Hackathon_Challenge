// GLOBAL VARIABLE TO STORE DIFFERENT, RELEVANT DATA
const defaultPassword = "0000"; // FOR CONVENIENCE, WE'VE SET A DEFAULT PASSWORD THAT YOU CAN VIEW ON THE BROWSER
let startingBalance = 10000; // OUR SYSTEM GIVES YOU KES. 10,000 AS THE STARTING VALUE
let atmTransactions = []; // STORE ALL TRANSACTIONS AND IS USEFUL WHEN CREATING THE TRANSACTION RECEIPT FOR DOWNLOAD
let today = new Date(); // AN INSTANCE OF THE DATE() OBJECT, FOR DATE/TIME INFO AS THE TASK REQUIRES
       
function loggedIn(){
    // WHEN THE LOG IN BUTTON IS CLICKED
    // THIS FUNCTION IS TRIGGERED
    window.location.href = './system/index.html';
}
function loggedOut(){
    // TRIGGERED WHEN EXIT PROCESS IS COMPLETE
    // BASICALLY TAKES YOU BACK TO THE PASSWORD PAGE
    window.location.href = '../index.html';
}
function login(){
    // CHECKS IF ENTERED PASSWORD MATCHES SAVED PASSWORD
    let enteredPassword = document.getElementById('password').value;
    if (enteredPassword == defaultPassword){
        alert("Password Entered Correctly, Click OK to Access System");
        return loggedIn(); // IF SUCCESSFULLY, LOG IN HAPPENS
    } else {
        alert("Password Not Entered or Incorrect!");
        enteredPassword.value = ''; // HELPS TO RESET THE VALUE TO BLANK FOR CLEANER INPUT FILES
    }
}

function showPassword(){
    // FOR CONVENIENCE, OUR SYSTEM SHOWS YOU THE DEFAULT PASSWORD
    // WHEN THIS BUTTON IS CLICKED
    let displayAreaPassword = document.getElementById('show-password');
    displayAreaPassword.style.backgroundColor = "#9ED2C6";
    displayAreaPassword.style.fontSize = "1.5rem";
    let textNode = "HELLO, THE DEFAULT PASSWORD IS: " + defaultPassword;
    displayAreaPassword.innerHTML = textNode;

}

function showBalance(){
    // BUTTON THAT WRITES BALANCE IN THE #balance DIV
    let displayAreaBalance = document.getElementById('balance');
    let textNode = 'BALANCE: ' + startingBalance.toLocaleString("en-US");
    displayAreaBalance.innerHTML = textNode;
}

function withdraw(){
    // TRIGGERED WHEN WITHDRAW IS CLICKED
    let moneyOut = parseInt(document.getElementById('moneyout').value);
    // WE NEED TO CHECK IF:
    // 1. THE VALUE ENTERED IS NAN - MEANING THAT THE USER DID NOT ENTER ANYTHING
    // 2. THE VALUE ENTERED IS LESS THAN 0 - CANNOT WITHDRAW A NEGATIVE VALUE
    // 3. THE VALUE ENTERED IS LESS THAN 1000 - OUR SYSTEM SETS A WITHDRAWAL LIMIT OF KES. 1000 PER WITHDRAWAL
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
            // IF ALL IS WELL
            // A CONFIRMATION MESSAGE SHOWS
            confirmMessage = 'Are You Sure You Want to Withdraw ' + moneyOut + '?';
            if (window.confirm(confirmMessage)){
                startingBalance -= moneyOut; // WITHDRAWN AMOUNT IS DEDUCTED FROM BALANCE
                alert('Withdrawal Successful');
                transactionNote = 'TYPE: WITHDRAWAL, AMOUNT: ' + moneyOut;
                // HERE, WE UPDATE THE atmTransactions ARRAY TO INCLUDE NEW TRANSACTION, LIKE THIS
                // TYPE: WITHDRAWAL, AMOUNT: 10000
                atmTransactions.push(transactionNote);
                document.getElementById('moneyout').value = '';
                let balanceButton = document.getElementById('balanceButton');
                balanceButton.click(); // BALANCE BUTTON CLICKED TO REFRESH BALANCE 
            } else {
                alert("Operation Cancelled");
                document.getElementById('moneyout').value = '';
            }
        }
    }

}

function deposit(){
    // TRIGGERED WHEN DEPOSIT IS CLICKED
    let moneyIn = parseInt(document.getElementById('moneyin').value);
    // WE NEED TO CHECK IF:
    // 1. THE VALUE ENTERED IS NAN - MEANING THAT THE USER DID NOT ENTER ANYTHING
    // 2. THE VALUE ENTERED IS LESS THAN OR EQUAL TO ZER0 - JOKES ON THE USER, CANNOT HAPPEN
    if (isNaN(moneyIn)){
        alert('You Need to Enter a Valid Figure');
    } else {
        if (moneyIn <= 0){
            alert('Very Funny, You Cannot Deposit Nothing or a Negative Figure, or Can You?');
            document.getElementById('moneyin').value = '';
        } else {
            confirmMessage = 'Are You Sure You Want to Deposit ' + moneyIn + '?';
            if (window.confirm(confirmMessage)){
                startingBalance += moneyIn;
                alert('Deposit Successful');
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
    // TRIGGERED WHEN EXIT BUTTON IS CLICKED
    confirmMessage = 'Are You Sure You Want to Exit The System?';
    downloadMessage = 'Do You Wish To Download Your Transactions?';
    if (window.confirm(confirmMessage)){
        // IF THE USER WANT TO EXIT, THEY GET THE NEXT QUESTION ABOUT DOWNLOADING TRANSACTIONS
        if (window.confirm(downloadMessage)){
            // HERE IS WHERE THE DOWNLOAD MAGIC HAPPENS
            // WE NEED AN <a> ELEMENT TO CREATE A DOWNLOAD LINK
            let downloadLink = document.createElement("a");
            let transactionNotes = atmTransactions.join('\n'); // HERE WE PUT ALL THE TRANSACTIONS FROM THE ARRAY INTO A LIST
            // NOW, WE USE A BLOB OBJECT TO CREATE A FILE
            downloadLink.href = window.URL.createObjectURL(new Blob([transactionNotes], {type: "text/plain"}));
            downloadLink.download = "transactionsReceipt.txt";
            downloadLink.click(); // AUTOMATICALLY CLICKS THE BUTTON TO DOWNLOAD FILE
            alert('Download Complete, Check Default Download Location for Transaction Text File.')
        }
        alert('SYSTEM CLOSING, LAST VISITED ON' + '\n' + today);
        return loggedOut(); // GOES BACK TO MAIN PAGE
    }
}

