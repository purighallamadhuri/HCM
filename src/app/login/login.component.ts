import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../Models/Users';
import { MemberService } from '../service/member.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  text='Sign In';
  fglogin:FormGroup= new FormGroup({});
  submitted :boolean= false;
 
  loginuser:Login[] = [];
  loggedinuser : Login = {
    UserName:'',
    Password:''
  }
  tokenPayload:any
  token: any;
  currlogUser: any
  constructor(private router: Router,
    private memberService:MemberService,
    private toaster:ToastrService,
    private jwtHelper: JwtHelperService,
    private formbuilder: FormBuilder
    ) { }
  
  ngOnInit(): void {
    this.RemoveSessionVariables();
    this.fglogin = this.formbuilder.group({
      loginusername : ['', [Validators.required]],
      loginpassword:['',[Validators.required]]
    })
  }

  GetTokenDecoded(token:string) {
    this.tokenPayload = this.jwtHelper.decodeToken(this.token.token);
     localStorage.setItem('userrole',this.tokenPayload.User_Type);
     localStorage.setItem('memberid',this.tokenPayload.sub);
     localStorage.setItem('UserName',this.tokenPayload.UserName);
     this.memberService.updateSite.next(true);
  }
 RemoveSessionVariables(){
  localStorage.removeItem("Token");
    localStorage.removeItem("userrole");
    localStorage.removeItem("memberid");
    localStorage.removeItem("UserName");
    localStorage.removeItem("SearchCriteria") 
      localStorage.removeItem("SearchCriteriaData")
    this.router.navigate(['login']);
    this.memberService.updateSite.next(true);
 }
  onSubmit(){
    this.submitted = true;
    if (!this.fglogin.invalid) {
    if(this.loggedinuser.UserName != '' && this.loggedinuser.Password != ''){
      this.memberService.UserLogin(this.loggedinuser).subscribe(
        response=>
        {
          this.token = response;
          localStorage.setItem("Token", this.token.token);
          this.GetTokenDecoded(this.token.token);
          if(localStorage.getItem("userrole") == "1")
          {
            this.router.navigate(['searchmember']);
          }
          else{
            this.router.navigate(['searchmember']);
          }
          this.toaster.success("Login Successful!!", "Success");
        },
        error =>{
          this.toaster.error("Invalid Credentials!!", "Failed");
        }
      )
    }
  }
    
  }
  Register(){
this.router.navigate(['register'])
  }
}
