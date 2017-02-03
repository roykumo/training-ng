import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rekening } from '../rekening.model';
import { RekeningService } from '../rekening.service';

@Component({
  selector: 'pilihan-rekening',
  templateUrl: './pilihan-rekening.component.html',
  styleUrls: ['./pilihan-rekening.component.css']
})
export class PilihanRekeningComponent implements OnInit {

  @Input()
  rekeningId: string;

  @Output()
  rekeningSelection = new EventEmitter<Rekening>();
  //rekeningSelection: EventEmitter<Rekening> = 


  rekening: Rekening;

  listRekening: Rekening[];

  constructor(private rekeningService: RekeningService) {
    rekeningService.ambilDataRekening().then(hasil => this.listRekening = hasil).catch(this.handleError);
  }

  private handleError(errors: any) : void{
    console.log("Error: "+errors);
  }

  ngOnInit() {
    /*this.listRekening = [
      new Rekening('1', '001', 'Rek 1'),
      new Rekening('2', '002', 'Rek 2')
    ];*/

  }

  onRekeningSelection(rekening: Rekening) {
    console.log('selected : '+rekening.nomer);
    this.rekening = rekening;
    this.rekeningSelection.emit(rekening);
    //this.rekeningSelection.emit(rekening);
  }  

  /*onChange(deviceValue) {
      console.log('change : '+deviceValue);
      this.rekeningSelection.emit(deviceValue);
  }*/
}
