import { Component, OnInit, AfterViewInit } from '@angular/core';
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

declare let $: any;

@Component({
  selector: 'app-transaction-update',
  templateUrl: './transaction-update.component.html',
  styleUrls: ['./transaction-update.component.css']
})
export class TransactionUpdateComponent implements OnInit, AfterViewInit {

  ddformat: string = 'DD MMM YYYY';
  labelDateText: string = 'Date';

  status: string;
  listTransactionType: LookupValue[];
  listPromoCode: LookupValue[];

  id: number;
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
  transactionDate: Date;

  constructor(private customerService: CustomerService, private transactionService: TransactionService, private lookupValueService: LookupValueService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('load transaction...');
    this.route.params.subscribe(params => {
       var id = +params['trx']; // (+) converts string 'id' to a number
       this.id = id;

       this.transactionService.get(id).subscribe(
                    respon  => {                      
                      console.log('respon: '+JSON.stringify(respon));

                      if(respon==null){
                        alert('error');
                        this.router.navigate(['trx/transaction']);
                      }else{
                        var trx: Transaction = JSON.parse(respon.responseDescription);
                        if(trx){
                          this.description=trx.description;
                          this.amount=trx.amount;
                          this.quantity=trx.quantity;
                          this.transactionType=trx.transactionType;
                          this.customer=trx.customer;
                          this.promoCode=trx.promoCode;
                          this.endDate=trx.endDate;
                          this.pickupDate=trx.pickupDate;
                          this.transactionDate = trx.transactionDate;
                          this.delivery=trx.delivery;
                          if(this.promoCode){
                            this.promoCodeId = this.promoCode.id;
                          }

                          if(this.transactionType){
                            this.transactionTypeId = this.transactionType.id;
                          }
                        }else{
                          alert('transaction not found');
                          this.router.navigate(['trx/transaction']);
                        }
                        
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
    transaction.id = this.id;
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
    
    transaction.transactionDate = this.transactionDate;
    transaction.endDate = this.endDate;
    transaction.pickupDate = this.pickupDate;
    transaction.delivery = this.delivery;

    let res: CommonResponse;
    let error: string;
    console.log('creating transaction...');
    this.transactionService.update(transaction).subscribe(
                    respon  => {                      
                      console.log('respon: '+JSON.stringify(respon));

                      if(respon==null || respon.responseCode != '0'){
                        console.log(JSON.stringify(respon));
                        alert('error');
                      }else{
                        alert('respon:'+JSON.stringify(respon))
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
  transactionDateValChange(val) {
    this.transactionDate = val;
    
  }
  pickupDateValChange(val) {
    this.pickupDate = val;
    
  }

  promoCodeChange(val){
    this.promoCode = val;
  }

  transactionTypeChange(val){
    this.transactionType = val;
  }

  ngAfterViewInit(){
    $('select').select2();
  }

}
