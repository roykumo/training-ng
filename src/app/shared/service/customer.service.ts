import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { Customer } from '../model/customer';
import { CommonResponse } from '../../shared/model/common-response.model';

@Injectable()
export class CustomerService {

  urlCreate = 'http://localhost:8180/family-server/ng/customer/create/';
  urlGetList = 'http://localhost:8180/family-server/ng/customer/getAll';
  urlGet = 'http://localhost:8180/family-server/ng/customer/';
  urlUpdate = 'http://localhost:8180/family-server/ng/customer/update/';

  constructor(private http: Http) { }

  create(customer: Customer): Observable<CommonResponse>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log('posting to '+this.urlCreate);

    return this.http.post(this.urlCreate, customer, options)
                    .map((res: Response) => {
                      return res.json();
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(customer: Customer): Observable<CommonResponse>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log('posting to '+this.urlUpdate);

    return this.http.post(this.urlUpdate, customer, options)
                    .map((res: Response) => {
                      return res.json();
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getList(): Observable<CommonResponse>{
    console.log('get '+this.urlGetList);

    return this.http.get(this.urlGetList)
                    .map((res: Response) => {
                      return res.json();
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get(id): Observable<CommonResponse>{
    console.log('get '+this.urlGet+id);

    return this.http.get(this.urlGet+id)
                    .map((res: Response) => {
                      return res.json();
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
