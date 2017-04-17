import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter  } from '@angular/core';
import { LookupValue } from '../../model/lookup-value';
import { LookupValueService } from '../../service/lookup-value.service';

declare let $: any;

@Component({
  selector: 'app-select-trx-type',
  templateUrl: './select-trx-type.component.html',
  styleUrls: ['./select-trx-type.component.css']
})
export class SelectTrxTypeComponent implements OnInit, AfterViewInit  {
  @Input()
  transactionType: number;

  @Output()
  transactionTypeChange = new EventEmitter();

  constructor(private lookupValueService: LookupValueService) { }

  listTrxType: LookupValue[];

  ngOnInit() {
    this.lookupValueService.getTransactionType().subscribe(
                    respon  => {                      
                      console.log('respon: '+JSON.stringify(respon));

                      if(respon==null){
                        alert('error');
                      }else{
                        if(respon.responseCode!='0'){
                          alert('failed get transaction type');
                        }else{
                          this.listTrxType = JSON.parse(respon.responseDescription);
                        }
                      }
                      
                    },
                    err =>  {
                      console.log('error: '+err);
                      alert('error: '+JSON.stringify(err));
                    }
    );
  }
  
  ngAfterViewInit(){
    $('select').select2();
    $('#transactionType').on(
        'change',
        (e) => {
          this.transactionType = $(e.target).val();
          this.transactionTypeChange.emit($(e.target).val());
        }
    );
  };
}
