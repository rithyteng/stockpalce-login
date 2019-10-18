import { Component, OnInit, ɵɵcontainerRefreshEnd } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _httpService: HttpService,private _route:Router) { }

  title = 'public';
  valid:boolean;
  ngOnInit() {
    this.checkvalid();
  }
  refresh(): void{
    window.location.reload();
  }
  checkvalid(){
    this._httpService.checkValid().subscribe(data=>{
      if(data['message']){
        this.valid=true;
        console.log('OKay')
      }
      else{
        this.valid=false;
        console.log('NOtOKay')
      }
    })
  }
  logout(){
    this._httpService.logout().subscribe(data=>{
      if(data['message']){
        console.log('Log Out Successful')
        this._route.navigate(['']);
        this.refresh();
      }
      else{
        console.log('Errorz')
      }
    })
  }
  
  
}

