import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router } from '@angular/router';
import { CheckboxRequiredValidator } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _httpService: HttpService,private _route:Router) { }

  myshoe:any;
  ngOnInit() {
    this.checkvalid();
    this.query();
  }
  query(){
    this._httpService.finditem().subscribe(data=>{
      if(data['message']){
        console.log(data["items"],"Testing");
        console.log(data['message']);
        console.log('********')
        this.myshoe=data['items'];
      }
      else{
        console.log('NOtOKay')
      }
    })
  }
  checkvalid(){
    this._httpService.checkValid().subscribe(data=>{
      if(data['message']){
        console.log(data);
      }
      else{
        console.log('NOtOKay')
      }
    })
  }
  onsubmit(){
    this._httpService.logout().subscribe(data=>{
      if(data['message']){
        console.log('Log Out Successful')
        this._route.navigate(['login']);
      }
      else{
        console.log('Errorz')
      }
    })
  }
  
}
