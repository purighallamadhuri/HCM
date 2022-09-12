import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../Models/Users';
import { MemberService } from '../service/member.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordpattern: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$";
  submitted = false;
  usernamename: string = ''
  passwords: string = ''
  loginuser:Login[] = [];
  loggedinuser : Login = {
    UserName:'',
    Password:''
  }
  tokenPayload:any
  token: any;
  constructor(private router: Router,private memberService:MemberService,private toaster:ToastrService,private jwtHelper: JwtHelperService) { }
  

  ngOnInit(): void {
  }

  GetTokenDecoded(token:string) {
    console.log(this.jwtHelper.decodeToken(this.token.token))
    this.tokenPayload = this.jwtHelper.decodeToken(this.token.token);
    console.log(this.tokenPayload);
    console.log(this.tokenPayload.User_Type)
    // this.userRole=this.tokenPayload.UserRole 
    // this.username=this.tokenPayload.UserName 
     localStorage.setItem('userrole',this.tokenPayload.User_Type);
     localStorage.setItem('memberid',this.tokenPayload.sub);
     localStorage.setItem('UserName',this.tokenPayload.UserName);
     this.memberService.updateSite.next(true);
    // localStorage.setItem('username',this.username)
  
    // console.log(localStorage.getItem('userrole'))

    // console.log(this.username)
  }

  onSubmit(){
    console.log(this.loggedinuser);
    if(this.loggedinuser.UserName != '' && this.loggedinuser.Password != ''){
      this.memberService.UserLogin(this.loggedinuser).subscribe(
        response=>
        {
          this.token = response;
          //console.log(this.token.token)
          localStorage.setItem("Token", this.token.token);
          this.GetTokenDecoded(this.token.token);
          if(localStorage.getItem("userrole") == "1")
          {
            this.router.navigate(['searchmember']);
          }
          else{
            this.router.navigate(['member']);
          }
          this.toaster.success("Login Successful!!", "Success");
        },
        error =>{
          this.toaster.error("Login Failed!!", "Failed");
        }
      )
    }
    this.submitted = true;
  }
  Register(){
this.router.navigate(['register'])
  }
}
