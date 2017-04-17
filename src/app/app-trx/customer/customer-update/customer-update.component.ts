import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../shared/model/customer';
import { CustomerService } from '../../../shared/service/customer.service';
import { CommonResponse } from '../../../shared/model/common-response.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  id: number;
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  lineId: string;
  status: string = 'loading...';

  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('load customer...');
    this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       this.customerService.get(this.id).subscribe(
                    respon  => {                      
                      console.log('respon: '+JSON.stringify(respon));

                      if(respon==null){
                        alert('error');
                        this.router.navigate(['trx/customer']);
                      }else{
                        var customer: Customer = JSON.parse(respon.responseDescription);
                        this.name = customer.name;
                        this.address = customer.address;
                        this.phone1 = customer.phone1;
                        this.phone2 = customer.phone2;
                        this.lineId = customer.lineId;
                        
                        this.status = '';
                        //alert('respon:'+JSON.stringify(respon))
                      }

                    },
                    err =>  {
                      console.log('error: '+err);
                      alert('error: '+JSON.stringify(err));
                      this.router.navigate(['trx/customer']);
                    }
        );
    });
  }

  onSubmit(){
    var customer = new Customer();
    customer.id = this.id;
    customer.name = this.name;
    customer.address = this.address;
    customer.phone1 = this.phone1;
    customer.phone2 = this.phone2;
    customer.lineId = this.lineId;

    let res: CommonResponse;
    let error: string;
    console.log('updating customer...\n'+JSON.stringify(customer));
    this.customerService.update(customer).subscribe(
                    respon  => {                      
                      console.log('respon: '+JSON.stringify(respon));

                      if(respon==null || respon.responseCode != '0'){
                        console.log(JSON.stringify(respon));
                        alert('error');
                      }else{
                        alert('respon:'+JSON.stringify(respon))
                      }

                      this.router.navigate(['trx/customer']);
                    },
                    err =>  {
                      error = <any>err
                      console.log('error: '+error);
                      alert('error: '+JSON.stringify(error));
                    }
    );

  }

  onCancel(){
    this.router.navigate(['trx/customer']);
  }

  onTrx(){
    this.router.navigate(['trx/customer']);
    this.router.navigate(['trx/transaction/create',this.id]);
  }

}
