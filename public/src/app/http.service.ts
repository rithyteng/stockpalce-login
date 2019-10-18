import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {* as bcrypt} from "bcrypt";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  cart: Array<Object>=[]; //setting array here so components can grab it
  numOfItems: Number;
  total: Number;

  register(user){
    // let hashed= bcrypt.hash(user.password);
    // console.log(hashed, "this is the hashed pw")
    // console.log(user, "this is the user info")
    return this._http.post('/register', user)
  }
  sell(item){
    return this._http.post('/create', item);
  }
  getAll(){
    return this._http.get('/all');
  }
  finditem(){
    return this._http.get('/myitem');
  }
  one_item(id){
    return this._http.get(`/one/${id}`);
  }

  findview(id){
    console.log(id,'In httpservice ts');
    return this._http.get(`/views/${id}`);
  }

  login(user){
    console.log(user,'testing User Infor');
    return this._http.post('/login',user)
  }
  checkValid(){
    console.log('Testing Valid In HTTPservice')
    return this._http.get('/validate')
  }
  logout(){
    return this._http.get('/logout')
  }

}

