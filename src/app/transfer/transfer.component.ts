import { Component, OnInit } from '@angular/core';
import { Rekening } from '../rekening/rekening.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferService } from './transfer.service';
import { Transfer } from './transfer.model';
import { CommonResponse } from '../shared/model/common-response.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  rekeningSumber: Rekening;
  rekeningTujuan: Rekening;
  nilai: number;
  berita: string;
  debugData: string;

  constructor(private transferService: TransferService) {
    
  }

  ngOnInit() {
    
  }

  onSubmit() {
    console.log('submit...');
    this.debugData = (this.rekeningSumber ? this.rekeningSumber.nomer : '') + ' - ' + (this.rekeningTujuan ? this.rekeningTujuan.nomer : '') + ' - ' + this.nilai + ' - ' + this.berita;
    console.log(this.debugData);

    if(this.rekeningSumber && this.rekeningTujuan && this.nilai && this.berita){
      let res: CommonResponse;
      let error: string;
      console.log('transfering...');
      let transfer: Transfer = new Transfer(this.rekeningSumber, this.rekeningTujuan, this.nilai, this.berita);
      this.transferService.doTransfer(transfer).subscribe(
                     respon  => {
                       //res = respon
                       console.log('response : '+respon);
                     },
                     err =>  error = <any>err);
      console.log('res: '+res);
      console.log('error: '+error);
    }else{
      console.log('no data transfer');
    }

  }

  onRekeningSumberSelection(event: Rekening) {
    this.rekeningSumber = event;
    console.log('selected rekening sumber : '+this.rekeningSumber.nomer+ '-' +this.rekeningSumber.nama);
  }

  onRekeningTujuanSelection(event: Rekening) {
    this.rekeningTujuan = event;
    console.log('selected rekening tujuan : '+this.rekeningTujuan.nomer+ '-' +this.rekeningTujuan.nama);
  }

  get debugDataRuntime(){
    return (this.rekeningSumber ? this.rekeningSumber.nomer : '') + ' - ' + (this.rekeningTujuan ? this.rekeningTujuan.nomer : '') + ' - ' + this.nilai + ' - ' + this.berita;
  }
}
