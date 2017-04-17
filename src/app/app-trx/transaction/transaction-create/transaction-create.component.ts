import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../shared/model/customer';
import { LookupValue } from '../../../shared/model/lookup-value';
import { Transaction } from '../../../shared/model/transaction';
import { CustomerService } from '../../../shared/service/customer.service';
import { TransactionService } from '../../../shared/service/transaction.service';
import { LookupValueService } from '../../../shared/service/lookup-value.service';
import { CommonResponse } from '../../../shared/model/common-response.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ButtonsModule } from 'ng2-bootstrap/buttons';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {
  ddformat: string = 'DD MMM YYYY';
  labelDateText: string = 'Date';

  status: string;
  listTransactionType: LookupValue[];
  listPromoCode: LookupValue[];

  description: string;
  amount: number;
  quantity: number;
  transactionType: LookupValue;
  transactionTypeId: number;
  customer: Customer = new Customer();
  promoCode: LookupValue;
  promoCodeId: number;
  endDate: Date;
  pickupDate: Date;
  delivery: boolean;  

  constructor(private customerService: CustomerService, private transactionService: TransactionService, private lookupValueService: LookupValueService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.delivery = false;
    console.log('load customer...');
    this.route.params.subscribe(params => {
       this.customer.id = +params['customer']; // (+) converts string 'id' to a number

       this.customerService.get(this.customer.id).subscribe(
                    respon  => {                      
                      console.log('respon: '+JSON.stringify(respon));

                      if(respon==null){
                        alert('error');
                        this.router.navigate(['trx/customer']);
                      }else{
                        var customer: Customer = JSON.parse(respon.responseDescription);
                        this.customer = customer;
                        
                        this.status = '';
                        //alert('respon:'+JSON.stringify(respon))
                      }

                    },
                    err =>  {
                      console.log('error: '+err);
                      alert('error: '+JSON.stringify(err));
                      this.router.navigate(['trx/transaction']);
                    }
        );
    });


    this.lookupValueService.getPromoCode().subscribe(
                    respon  => {                      
                      console.log('respon: '+JSON.stringify(respon));

                      if(respon==null){
                        alert('error');
                      }else{
                        if(respon.responseCode!='0'){
                          alert('failed get promo code');
                        }else{
                          //alert('promocode:\n'+JSON.stringify(JSON.parse(respon.responseDescription)));
                          //alert('respon:'+JSON.stringify(this.customers));
                          this.listPromoCode = JSON.parse(respon.responseDescription);
                        }
                      }
                      
                    },
                    err =>  {
                      console.log('error: '+err);
                      alert('error: '+JSON.stringify(err));
                    }
    );

    this.lookupValueService.getTransactionType().subscribe(
                    respon  => {                      
                      console.log('respon: '+JSON.stringify(respon));

                      if(respon==null){
                        alert('error');
                      }else{
                        if(respon.responseCode!='0'){
                          alert('failed get transaction type');
                        }else{
                          //alert('transaction type:\n'+JSON.stringify(JSON.parse(respon.responseDescription)));
                          //alert('respon:'+JSON.stringify(this.customers));
                          this.listTransactionType = JSON.parse(respon.responseDescription);
                        }
                      }
                      
                    },
                    err =>  {
                      console.log('error: '+err);
                      alert('error: '+JSON.stringify(err));
                    }
    );
  }

  onSubmit(){
    var transaction = new Transaction();
    transaction.amount = this.amount;
    transaction.description = this.description;
    transaction.quantity = this.quantity;
    transaction.customer = this.customer;

    var trx = new LookupValue();
    trx.id = this.transactionTypeId;
    transaction.transactionType = trx;

    var promo = new LookupValue();
    promo.id = this.promoCodeId;
    transaction.promoCode = promo;
    
    transaction.transactionDate = new Date();
    transaction.endDate = this.endDate;
    transaction.pickupDate = this.pickupDate;
    transaction.delivery = this.delivery;

    let res: CommonResponse;
    let error: string;
    console.log('creating transaction...');
    this.transactionService.create(transaction).subscribe(
                    respon  => {                      
                      console.log('respon: '+JSON.stringify(respon));

                      if(respon==null || respon.responseCode != '0'){
                        console.log(JSON.stringify(respon));
                        alert('error');
                      }else{
                        alert('Sukses');
                      }

                      this.router.navigate(['trx/transaction']);
                    },
                    err =>  {
                      error = <any>err
                      console.log('error: '+error);
                      alert('error: '+JSON.stringify(error));
                    }
    );

  }

  onCancel(){
    this.router.navigate(['trx/transaction']);
  }

  dateValChange(val) {
    this.endDate = val;
    
  }

  promoCodeChange(val){
    this.promoCode = val;
  }

  transactionTypeChange(val){
    this.transactionType = val;
  }
}
