import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { LookupValue } from '../model/lookup-value';
import { CommonResponse } from '../../shared/model/common-response.model';
import { Transaction } from '../../shared/model/transaction';

@Injectable()
export class TransactionService {

  urlGet = 'http://localhost:8180/family-server/ng/transaction/';
  urlGetList = 'http://localhost:8180/family-server/ng/transaction/getAll';
  urlCreate = 'http://localhost:8180/family-server/ng/transaction/create';
  urlUpdate = 'http://localhost:8180/family-server/ng/transaction/update';

  constructor(private http: Http) { }

  get(id): Observable<CommonResponse>{
    console.log('get '+this.urlGet+id);

    return this.http.get(this.urlGet+id)
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

  create(transaction: Transaction): Observable<CommonResponse>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log('posting to '+this.urlCreate);

    return this.http.post(this.urlCreate, transaction, options)
                    .map((res: Response) => {
                      return res.json();
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(transaction: Transaction): Observable<CommonResponse>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log('posting to '+this.urlUpdate);

    return this.http.post(this.urlUpdate, transaction, options)
                    .map((res: Response) => {
                      return res.json();
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
