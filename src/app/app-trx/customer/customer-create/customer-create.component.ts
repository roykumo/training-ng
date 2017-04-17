import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../shared/model/customer';
import { CustomerService } from '../../../shared/service/customer.service';
import { CommonResponse } from '../../../shared/model/common-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  name: string;
  address: string;
  phone1: string;
  phone2: string;
  lineId: string;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    var customer = new Customer();
    customer.name = this.name;
    customer.address = this.address;
    customer.phone1 = this.phone1;
    customer.phone2 = this.phone2;
    customer.lineId = this.lineId;

    let res: CommonResponse;
    let error: string;
    console.log('creating customer...');
    this.customerService.create(customer).subscribe(
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

}
