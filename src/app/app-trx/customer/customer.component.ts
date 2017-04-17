import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../shared/model/customer';
import { CustomerService } from '../../shared/service/customer.service';
import { LookupValueService } from '../../shared/service/lookup-value.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[];
  status: string = 'loading...';

  constructor(private customerService: CustomerService, private router: Router, private lookupValueService: LookupValueService) {
    if(this.data){
      this.length = this.data.length;
    }else{
      this.length = 0;
    }
  }

  ngOnInit() {
    console.log('get list customer...');
    this.customerService.getList().subscribe(
                    respon  => {                      
                      console.log('respon: '+JSON.stringify(respon));

                      if(respon==null){
                        alert('error');
                      }else{
                        if(respon.responseCode!='0'){
                          alert('failed get list customer');
                        }else{
                          this.customers = JSON.parse(respon.responseDescription);
                          //alert('respon:'+JSON.stringify(this.customers));
                        }
                      }
                      
                      this.status = '';
                      this.data = this.customers;
                      this.onChangeTable(this.config);
                    },
                    err =>  {
                      console.log('error: '+err);
                      alert('error: '+JSON.stringify(err));
                    }
    );

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
                        }
                      }
                      
                    },
                    err =>  {
                      console.log('error: '+err);
                      alert('error: '+JSON.stringify(err));
                    }
    );
  }

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Nama', name: 'name', className: ['office-header', 'text-success'], filtering: {filterString: '', placeholder: 'Filter by nama'}},
    {
      title: 'Alamat',
      name: 'address',
      sort: false,
      filtering: {filterString: '', placeholder: 'Filter by alamat'}
    },
    {title: 'Phone 1', name: 'phone1', sort: false},
    {title: 'Phone 2', name: 'phone2', sort: false},
    {title: 'Line ID', className: 'text-warning', name: 'lineId', sort: false}
  ];
  public page:number = 1;
  public itemsPerPage:number = 5;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    //sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any> = this.customers;

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
    //alert(data.row.id+' : '+data.row.name);
    this.router.navigate(['trx/customer/update',data.row.id]);
    //this.router.navigate(['trx/transaction/create',data.row.id]);
  }

}
