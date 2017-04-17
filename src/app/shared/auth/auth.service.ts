import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public isLoggedIn(){
    var sessionId = localStorage.getItem("sessionId");
    if(sessionId===null || sessionId === ""){
      return true;
    }else{
      return true;
    }
  }
}
