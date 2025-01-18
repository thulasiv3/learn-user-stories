import { Bank } from '../src/bank';

const accounts = [{ id: 1234567890, balance: 5000 },
{ id: 1234567891, balance: 10000 }];

const usernames = ['user1', 'user2', 'user4'];

const bank = new Bank(accounts, usernames);

// Scenario 1: successful account created
const acc = bank.createAccount('user1', 20, 1234567892);
if (acc.id !== 1234567892
    || acc.balance !== 0
    || acc.id.toString().length !== 10) {
    console.log('Scenario 1 failed');
}
else {
    console.log('Scenario 1 passed');
}

try {
    bank.createAccount('user1', 20, 1234567892);
    console.log('Scenario 1 failed');
}
catch(e) {
    console.log('Scenario 1 passed');
}

// scenario 2: unsuccessful account creation due to customer being below 18

try {
    bank.createAccount('user1', 17, 1234567899);
    console.log('Scenario 2 failed');
}
catch(e) {
    console.log('Scenario 2 passed');
}

// Scenario 3: unsuccessful account creation due to invalid username

try {
    bank.createAccount('user3', 20, 1234567888);
    console.log('Scenario 3 failed');
}
catch(e) {
    console.log('Scenario 3 passed');
}


// User story for depositing money

// Scenario 4: Successful money deposit
const account = bank.createAccount('user4', 21, 1234567894);
bank.depositMoney(account.id, 20000);
if(account.balance !== 20000){
    console.log('Scenario 4 failed')
}
else {
    console.log('Scenario 4 passed');
}
// Scenario 5: unsuccessful money deposit due to invalid account number

try{
    bank.depositMoney(1234567895, 830);
    console.log('Scenario 5 failed')
} catch(e){
    console.log('Scenario 5 passed');
}
// Scenario 6: unsuccessful money deposit due to invalid deposit value
try{
    bank.depositMoney(account.id, -374);
    console.log('Scenario 6 failed')
} catch(e){
    console.log('Scenario 6 passed');
}

// User story for withdrawing money

// Scenario 7: Successful money withdrawing
bank.withdrawMoney(account.id, 10000);
if(account.balance !== 10000){
    console.log('Scenario 7 failed')
}
else {
    console.log('Scenario 7 passed');
}
// Scenario 8: unsuccessful money withdrawal due to invalid account number
try{
    bank.withdrawMoney(1234567895, 4178);
    console.log('Scenario 8 failed')
} catch(e){
    console.log('Scenario 8 passed');
}
// Scenario 9: unsuccessful money withdrawal due to invalid withdrawal value
try{
    bank.withdrawMoney(account.id, 21500);
    console.log('Scenario 9 failed')
} catch(e){
    console.log('Scenario 9 passed');
}

// User story for checking balance

// Scenario 10: Successful balance check
const balance = bank.checkBalance(account.id);
if(balance !== 10000){
    console.log('Scenario 10 failed')
}
else {
    console.log('Scenario 10 passed');
}
// Scenario 11: unsuccessful balance due to invalid account number
try{
    bank.checkBalance(1234567895);
    console.log('Scenario 11 failed')
} catch(e){
    console.log('Scenario 11 passed');
}