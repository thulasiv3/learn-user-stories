import { BankType, AccountType } from './types';

/**
 * This class implements a bank that can
 * maintain accounts and create new accounts
 * as well as manage balance related actions such as deposits and withdrawals
 */

export class Bank implements BankType {
    private accounts: AccountType[] = [];
    private usernames: string[] = [];

    /**
     * The constructor initialized the bank with accounts and usernames
     * @param accounts - array of accounts
     * @param usernames - array of usernames
     */
    public constructor(accounts: AccountType[], usernames: string[]) {
        this.accounts = accounts;
        this.usernames = usernames;
    }

    /**
     * 
     * @param id - account id
     * @returns - true if account id exists, false otherwise
     */
    private findAccountById(id: number): AccountType | undefined {
        return this.accounts.find(account => account.id === id);
    }

    /**
     * 
     * @param accountNumber - account number
     * @returns - true if account number is greater than 10 digits (invalid), false otherwise
     */

    private isAccountNumberInvalid(accountNumber: number): boolean {
        return accountNumber.toString().length !== 10;
    }

    /**
     * 
     * @param username - username
     * @returns - true if username is in the usernames list (verified), false otherwise
     */
    private isUsernameExists(username: string): boolean {
        return this.usernames.includes(username);
    }

    /**
     * 
     * @param username 
     * @param age 
     * @param accountNumber 
     * @returns a new account with a ten-digit unique id and zero balance
     */
    createAccount(username: string, age: number, accountNumber: number): AccountType {
        if(this.isAccountNumberInvalid(accountNumber)) {
            throw new Error('Invalid account number');
        }
        if(!this.isUsernameExists(username)) {
            throw new Error('User not found');
        }
        if(age < 18) {
            throw new Error('User is under 18');
        }
        if(this.findAccountById(accountNumber)) {
            throw new Error('Account already exists');
        }
        const account: AccountType = {
            id: accountNumber,
            balance: 0
        };
        this.accounts.push(account);
        return account;
    }

    /**
     * 
     * @param accountNumber- account number for deposit
     * @param depositValue- amount of money to be deposited
     * @returns void
     */

    depositMoney(accountNumber: number, depositValue: number): void{
        if(this.isAccountNumberInvalid(accountNumber)) {
            throw new Error('Invalid account number');
        }

        if(depositValue < 1){
            throw new Error('Invalid deposit amount');
        }

        const account = this.findAccountById(accountNumber);
        if(account){
            account.balance += depositValue;
            console.log("Money has been deposited. Current balance is: " + account.balance);
        }else{
            throw new Error('Account does not exist');
        }

    }

    /**
     * 
     * @param accountNumber- account number for withdrawal
     * @param withdrawValue- amount of money to be withdrawn
     * @returns void
     */
    withdrawMoney(accountNumber: number, withdrawValue: number): void{
        if(this.isAccountNumberInvalid(accountNumber)) {
            throw new Error('Invalid account number');
        }

        const account = this.findAccountById(accountNumber);
        if(account){
            if(withdrawValue < 1 || withdrawValue > account.balance){
                throw new Error('Invalid deposit amount');
            }
            account.balance -= withdrawValue;
            console.log("Money has been withdrawn. Current balance is: " + account.balance);
        }else{
            throw new Error('Account does not exist');
        }

    }

    /**
     * 
     * @param accountNumber- account number to check balance
     * @returns account balance as a number
     */
    checkBalance(accountNumber: number): number{
        if(this.isAccountNumberInvalid(accountNumber)) {
            throw new Error('Invalid account number');
        }

        const account = this.findAccountById(accountNumber);
        if(account){
            return account.balance;
        }else{
            throw new Error('Account does not exist');
        }
        
    }

}