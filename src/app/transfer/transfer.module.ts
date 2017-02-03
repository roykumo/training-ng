import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferComponent } from './transfer.component';
import { RouterModule, Route } from '@angular/router';
import { RekeningModule } from '../rekening/rekening.module';
import { FormsModule } from '@angular/forms';
import { TransferService } from './transfer.service';

const transferRouting: Route[] = [
  { path: 'transfer', component: TransferComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RekeningModule,
    RouterModule.forChild(transferRouting),
    FormsModule
  ],
  declarations: [
    TransferComponent
  ],
  providers: [
    TransferService
  ]
})
export class TransferModule { }
