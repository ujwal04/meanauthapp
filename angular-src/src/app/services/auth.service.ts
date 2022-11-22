import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';


const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // token: string;
  authToken:any;
  user:any;
  httpClient: any;


  constructor(private http:HttpClient) { }

  registerUser(user) {
    // console.log(user+"user");
    // console.log(this.authToken);
    let headers={};
    if(this.authToken){
      headers = new HttpHeaders({'Authorization': this.authToken, 'Content-Type': 'application/json'});
    }
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
  }

  authenticateUser(user) {
    // console.log(user["username"]+"user");
    // console.log(this.authToken);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // console.log(headers);

    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
  }

  getProfile(){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('http://localhost:3000/users/profile', {headers: headers});
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  // private tokenNotExpired(){
  //   const jwtService: JwtHelperService = new JwtHelperService();
  //   const item: string = jwtService.tokenGetter();
  //   return item != null && !jwtService.isTokenExpired(item);
  // }
  isTokenExpired(){
    const isExpired=helper.isTokenExpired(this.authToken);
    if(isExpired==true){
      // console.log(true);
      return true;
    }else{
      // console.log(false);
      return false;
    }
  }
  loggedIn() {
    if(this.isTokenExpired()==false){
      return true;
    }
  }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
