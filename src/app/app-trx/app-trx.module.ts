import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { PopoverModule } from 'ng2-bootstrap/popover';

import { HomeComponent } from '../home/home.component';

import { CustomerComponent } from './customer/customer.component';
import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './customer/customer-update/customer-update.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SelectTrxTypeComponent } from '../shared/component/select-trx-type/select-trx-type.component';
import { SelectPromoCodeComponent } from '../shared/component/select-promo-code/select-promo-code.component';
import { DatePickerComponent } from '../shared/component/date-picker/date-picker.component';

import { CustomerService } from '../shared/service/customer.service';
import { LookupValueService } from '../shared/service/lookup-value.service';
import { TransactionService } from '../shared/service/transaction.service';
import { TransactionCreateComponent } from './transaction/transaction-create/transaction-create.component';
import { TransactionUpdateComponent } from './transaction/transaction-update/transaction-update.component';
import { AuthService } from '../shared/auth/auth.service';
import { CanActivateViaAuthGuard } from '../shared/auth/CanActivateViaAuthGuard';


const appTrxRouting: Route[] = [
  { path: 'trx/customer', component: CustomerComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'trx/customer/create', component: CustomerCreateComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'trx/customer/update/:id', component: CustomerUpdateComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'trx/transaction', component: TransactionComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'trx/transaction/create/:customer', component: TransactionCreateComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'trx/transaction/update/:trx', component: TransactionUpdateComponent, canActivate: [CanActivateViaAuthGuard] }
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appTrxRouting),
    FormsModule,
    DatepickerModule.forRoot(),
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule,
    ButtonsModule.forRoot(),
    PopoverModule.forRoot()
  ],
  declarations: [
    CustomerComponent, 
    CustomerCreateComponent, 
    CustomerUpdateComponent, 
    TransactionComponent, 
    TransactionCreateComponent,
    SelectTrxTypeComponent,
    SelectPromoCodeComponent,
    DatePickerComponent,
    TransactionUpdateComponent
    ],
  providers: [
    CustomerService,
    LookupValueService,
    TransactionService,
    AuthService,
    CanActivateViaAuthGuard
  ]
})
export class AppTrxModule { }
