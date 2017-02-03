import { Injectable } from '@angular/core';
import { Transfer } from './transfer.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from "rxjs";
import { CommonResponse } from '../common-response.model';

@Injectable()
export class TransferService {

  url = 'http://localhost:8780/5aSecServer/ng/transfer';

  constructor(private http: Http) { }

  doTransfer(tranfer: Transfer): Observable<string>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log('posting to '+this.url);

    return this.http.post(this.url, tranfer, options)
                    .map((res: Response) => JSON.stringify(res.json()))
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
