import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/Users';
import { MemberService } from '../service/member.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { DatePipe} from "@angular/common";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  passwordpattern: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$";
  submitted = false;
  dropdownSelected:string =''
  usernamename: string = ''
  passwords: string = ''
  first_name :string =''
  last_name:string =''
  compaddress:string=''
  dateofbirth:string=''
  state: string=''
  mememail:string=''
  showMemberfields: Boolean = false;
  emailpattern: string="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$";
  todaydate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(private router:Router,private memberService:MemberService,
    private toaster:ToastrService,private datePipe:DatePipe) { }
 users: User[]=[];
  userdetails : User = {
    MemberId:'',
    FirstName:'',
    LastName:'',
    UserName:'',
    DOB:new Date(),
    Address:'',
    State:'',
    Email:'',
    PhysicianId:0,
    Password:'',
    CreatedDate:new Date(),
    ModifiedDate: new Date(),
    UserType:0
  }

  ngOnInit(): void {
  }
onSubmit(){
  console.log(this.userdetails);
  if (this.form.invalid) {
    console.log("Invalid");
    return;
  }
  if(this.userdetails.UserType == 2)
  {
  if(this.userdetails.UserName != '' && this.userdetails.Password != '' && this.userdetails.FirstName != '' && this.userdetails.LastName != '' && this.userdetails.Email != ''){
    console.log("HI");
    console.log(this.userdetails);
    this.memberService.AddUser(this.userdetails).subscribe(
      response=>
      {
        this.toaster.success("Registration Successful!!", "Success");
        this.router.navigate(['login']);
      },
      error =>{
        this.toaster.error("Registration Failed!!", "Failed");
      }
    )
  }
  else{
    window.alert("Validations failed");
  }
}
else if(this.userdetails.UserType == 1){
  if(this.userdetails.UserName != '' && this.userdetails.Password != '' && this.userdetails.UserType)
  {
  console.log(this.userdetails);
  this.memberService.AddUser(this.userdetails).subscribe(
    response=>
    {
      this.toaster.success("Registration Successful!!", "Success");
      this.router.navigate(['login']);
    },
    error =>{
      this.toaster.error("Registration Failed!!", "Failed");
    }
  )
  }
  else{
    window.alert("Validations failed");
  }
}
  this.submitted=true;
  
}
OpenMemberFields(value:any){
  console.log(value)
  if(value == 2){
  this.showMemberfields = true;
  }
  else{
    this.showMemberfields = false;
  }
}
Signin(){
  this.router.navigate(['login'])
}
Cancel(){
  this.submitted=false;
  this.userdetails.UserName='';
  this.userdetails.Password='';
  this.userdetails.FirstName='';
  this.userdetails.LastName='';
  this.userdetails.DOB=new Date();
  this.userdetails.Address='';
  this.userdetails.Email='';
  this.userdetails.PhysicianId=0;
  this.userdetails.UserType=0;
  this.userdetails.State='';
  this.router.navigate(['register']);
}
}
