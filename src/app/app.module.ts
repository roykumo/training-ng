import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RekeningModule } from './rekening/rekening.module';
import { TransferModule } from './transfer/transfer.module';
import { AccordionModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { RouterModule, Route } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RekeningComponent } from './rekening/rekening.component';
import { ProfilComponent } from './profil/profil.component';
import { SaldoComponent } from './saldo/saldo.component';
import { MutasiComponent } from './mutasi/mutasi.component';

import { ProgressIndicatorService } from './progress-indicator.service';

const appRouting: Route[] = [
  { path: 'rekening', component: RekeningComponent },
  { path: 'profil', component: ProfilComponent },
  /*{ path: 'saldo', component: SaldoComponent },
  { path: 'mutasi', component: MutasiComponent },*/
  { path: '**', component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    HomeComponent,
    TopBarComponent,
    ProfilComponent,
    SaldoComponent,
    MutasiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    DropdownModule.forRoot(),
    RouterModule.forRoot(appRouting),
    RekeningModule,
    TransferModule
  ],
  providers: [ProgressIndicatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
