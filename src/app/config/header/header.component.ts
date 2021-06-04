import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  message: string;
  phone: any;
  email: any;
  name:any;
  userprofile = false;
  auth_token = sessionStorage.getItem('auth_token');
  constructor(private toastr: ToastrService, private http:HttpClient,
    private router: Router,private crexinservice:CrexinService) {
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization',`Bearer ${this.auth_token}`);
      this.http.get<any>(`https://superuser.crexin.com/api/user/details`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
        console.log(res.user);
        this.name = res.user.fullname;
        this.email = res.user.email;
        this.phone = res.user.phone
        sessionStorage.setItem('name',res.user.fullname)
        sessionStorage.setItem('email',res.user.email)
        sessionStorage.setItem('phone',res.user.phone)
        this.userprofile = true;
      }) 
      // this.crexinservice.userdata().subscribe(res=>{
      //   console.log(res.user);
      //   this.name = res.user.fullname
      //   this.email = res.user.email
      //   this.phone = res.user.phone
      //   this.userprofile = true;
      // });
      // if(sessionStorage.getItem('isloggedin') === 'true'){
      
      // }
      // else{
      //   this.userprofile = false;
      // }
    }
  ngOnInit(): void {
    // if(sessionStorage.getItem('isloggedin') === 'true'){
      // this.crexinservice.userdata().subscribe(res=>{
      //   console.log(res.user);
      //   this.name = res.user.fullname
      //   this.email = res.user.email
      //   this.phone = res.user.phone
      //   this.userprofile = true;
      // });
    // }
    // else{
    //   this.userprofile = false;
    // }
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>(`https://superuser.crexin.com/api/user/details`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res.user);
      this.name = res.user.fullname;
      this.email = res.user.email;
      this.phone = res.user.phone
      sessionStorage.setItem('name',res.user.fullname)
      sessionStorage.setItem('email',res.user.email)
      sessionStorage.setItem('phone',res.user.phone)
      this.userprofile = true;
    })
    
  }
     toggleCollapsed(): void {
       this.collapsed = !this.collapsed;
     }
get userstatus(){
   return sessionStorage.getItem('auth_token');
 } 
get username(){
  return sessionStorage.getItem('name');
}
get userphone(){
 return sessionStorage.getItem('phone');
}
 logout(){
  sessionStorage.clear();
  sessionStorage.clear();
  this.toastr.success(this.message,'Logout Successfully',{
    positionClass:'toast-top-center'
  });
  this.router.navigate(['/']);
 }   
}
