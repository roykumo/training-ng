import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProgressIndicatorService } from './progress-indicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Aplikasi Internet Banking';
  notification : string;
  subscription: Subscription;

  @ViewChild("staticModal") staticModal;

  constructor(private progress : ProgressIndicatorService ) {

  }

  ngOnInit(){
    this.subscription = this.progress.getStatus().subscribe(data => {
      console.log('--------------------data: '+data);
        this.notification = data;
        if(data) {
            this.staticModal.show();
        } else {
            this.staticModal.hide();
        }

    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}