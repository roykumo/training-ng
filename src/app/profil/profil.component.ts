import { Component, OnInit } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from "rxjs";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }


  /*getPdf(){
    $scope.getPdf = function(){
    $http.get('/api/reports/pdf', {responseType: 'arraybuffer'})
      .success(function (data) {
        var file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
    }
  }*/
}


