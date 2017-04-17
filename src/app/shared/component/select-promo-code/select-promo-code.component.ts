import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { LookupValue } from '../../model/lookup-value';
import { LookupValueService } from '../../service/lookup-value.service';

declare let $: any;

@Component({
  selector: 'app-select-promo-code',
  templateUrl: './select-promo-code.component.html',
  styleUrls: ['./select-promo-code.component.css']
})
export class SelectPromoCodeComponent implements OnInit, AfterViewInit {
  @Input()
  promo: number;

  @Output()
  promoChange = new EventEmitter();

  constructor(private lookupValueService: LookupValueService) { }

  listPromo: LookupValue[];

  ngOnInit() {
    this.lookupValueService.getPromoCode().subscribe(
        respon  => {                      
          console.log('respon: '+JSON.stringify(respon));

          if(respon==null){
            alert('error');
          }else{
            if(respon.responseCode!='0'){
              alert('failed get transaction type');
            }else{
              this.listPromo = JSON.parse(respon.responseDescription);
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
    $('#promoCode').on(
        'change',
        (e) => {
          this.promo = $(e.target).val();
          this.promoChange.emit($(e.target).val());
        }
    );
  }
}
