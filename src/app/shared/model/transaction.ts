import { LookupValue } from './lookup-value';
import { Customer } from './customer';

export class Transaction{
    /*constructor(id: number, description: string, amount: number, quantity: number, transactionType: LookupValue, customer: Customer, promoCode: LookupValue, endDate: Date, pickupDate: Date, delivery: boolean, transactionDate: Date) {
        this.id= id;
        this.description=description;
        this.amount=amount;
        this.quantity=quantity;
        this.transactionType=transactionType;
        this.customer=customer;
        this.promoCode=promoCode;
        this.endDate=endDate;
        this.pickupDate=pickupDate;
        this.delivery=delivery;
        this.transactionDate=transactionDate;
        this.transactionTypeDesc=transactionType == null ? "" : this.transactionType.lookupValue;
    }*/

    id: number;
    description: string;
    amount: number;
    quantity: number;
    transactionType: LookupValue;
    customer: Customer;
    promoCode: LookupValue;
    endDate: Date;
    pickupDate: Date;
    delivery: boolean;
    transactionDate: Date;
    transactionTypeDesc: string = "";
    promoCodeDesc: string = "";
    customerDesc: string = "";

    //transactionTypeDesc: string = (this.transactionType === null ? '' : this.transactionType.lookupValue);
    /*getTransactionTypeDesc(){
        return this.transactionType === null ? '' : this.transactionType.lookupValue;
    }*/
}