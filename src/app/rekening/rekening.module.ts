import { NgModule } from '@angular/core';
import {DropdownModule} from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { RekeningComponent } from './rekening.component';
import { SaldoRekeningComponent } from './saldo-rekening/saldo-rekening.component';
import { MutasiRekeningComponent } from './mutasi-rekening/mutasi-rekening.component';
import { DaftarRekeningComponent } from './daftar-rekening/daftar-rekening.component';
import { RouterModule, Route } from '@angular/router';
import { DetailRekeningComponent } from './detail-rekening/detail-rekening.component';
import { PilihanRekeningComponent } from './pilihan-rekening/pilihan-rekening.component';
import { RekeningService } from './rekening.service';

const rekeningRouting: Route[] = [
  { path: 'saldo-rekening', component: SaldoRekeningComponent },
  { path: 'mutasi-rekening', component: MutasiRekeningComponent },
  { path: 'daftar-rekening', component: DaftarRekeningComponent },
  { path: 'detail-rekening', component: DetailRekeningComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rekeningRouting),
    DropdownModule.forRoot()
  ],
  declarations: [RekeningComponent, SaldoRekeningComponent, MutasiRekeningComponent, DaftarRekeningComponent, DetailRekeningComponent, PilihanRekeningComponent],
  exports: [
    PilihanRekeningComponent
  ],
  providers: [
    RekeningService
  ]
})
export class RekeningModule { }
