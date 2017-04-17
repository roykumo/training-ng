import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { LookupValue } from '../model/lookup-value';
import { CommonResponse } from '../../shared/model/common-response.model';

@Injectable()
export class LookupValueService {
  
  urlGetByCategory = 'http://localhost:8180/family-server/ng/lookupValue/getByCategory/';

  constructor(private http: Http) { }

  getPromoCode(): Observable<CommonResponse>{
    console.log('get '+this.urlGetByCategory+'PROMO');

    return this.http.get(this.urlGetByCategory+'PROMO')
                    .map((res: Response) => {
                      return res.json();
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getTransactionType(): Observable<CommonResponse>{
    console.log('get '+this.urlGetByCategory+'TRX_TYPE');

    return this.http.get(this.urlGetByCategory+'TRX_TYPE')
                    .map((res: Response) => {
                      return res.json();
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
