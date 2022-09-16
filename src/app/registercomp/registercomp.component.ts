import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/Users';
import { MemberService } from '../service/member.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { DatePipe} from "@angular/common";

@Component({
  selector: 'app-registercomp',
  templateUrl: './registercomp.component.html',
  styleUrls: ['./registercomp.component.css']
})
export class RegistercompComponent implements OnInit {
  register:FormGroup= new FormGroup({});
  member:FormGroup= new FormGroup({});
  submitted = false;
   showmemmfield:boolean=false;
   showloginflds:Boolean=true;
  constructor(private router:Router,
    private formbuilder: FormBuilder,
    private memberService:MemberService,
    private toaster:ToastrService,
    private datePipe:DatePipe
    ) { }
    todaydate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
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
result:any
  ngOnInit(): void {

    this.register = this.formbuilder.group({
      UserName: ['', [Validators.required,Validators.minLength(5)]],
      password:['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$")]],
      UserType:[0,Validators.required],
    })
    this.member = this.formbuilder.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      dob:['',Validators.required],
      address:['',Validators.required],
      state:['',Validators.required],
      Email:['',Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
    })
  }
  Save(){
    this.submitted=true;
  if (!this.member.invalid) {
    console.log(this.userdetails);
    this.memberService.AddUser(this.userdetails).subscribe(
      response=>
      {
        this.toaster.success("User Registered Successfully!!", "Success");
        this.router.navigate(['login']);
      },
      error =>{
        this.toaster.error("User Registration Failed!!", "Failed");
      }
    )
  }
}
onSubmit(){
  // this.hide =true;
  // this.showloginflds=false;
  this.submitted=true;
  if (!this.register.invalid) {
    console.log(this.register.value)
    console.log(this.userdetails);
    this.memberService.CheckUserExists(this.userdetails).subscribe(
      response=>
      {
        console.log(response);
        this.result=response;
        console.log(this.result);
        if(this.result == "Entered user already exists in the system"){
          this.toaster.error(this.result, "Failed");
        }
        else{
          this.showmemmfield =true;
          this.showloginflds =false;
          this.submitted=false;
        }
      },
      error =>{
        console.log("error")
        this.toaster.error("Registration Failed!!", "Failed");
      }
    )
  }
  // else{
  //   alert('invalid');
  // }

}

OpenMemberFields(data:any){
console.log(data.target.value);
if(data.target.value==1){
//this.hide=false;
this.register.get("firstname")?.clearValidators();
this.register.get("firstname")?.updateValueAndValidity();
this.register.get("lastname")?.clearValidators();
this.register.get("lastname")?.updateValueAndValidity();

this.register.get("dob")?.clearValidators();
this.register.get("dob")?.updateValueAndValidity();

this.register.get("address")?.clearValidators();
this.register.get("address")?.updateValueAndValidity();

this.register.get("state")?.clearValidators();
this.register.get("state")?.updateValueAndValidity();

this.register.get("Email")?.clearValidators();
this.register.get("Email")?.updateValueAndValidity();
}else{
  //this.hide=true;
  this.register.get("firstname")?.setValidators([Validators.required,Validators.minLength(5)]);
this.register.get("firstname")?.updateValueAndValidity();
this.register.get("lastname")?.setValidators([Validators.required,Validators.minLength(5)]);
this.register.get("lastname")?.updateValueAndValidity();

this.register.get("dob")?.setValidators([Validators.required]);
this.register.get("dob")?.updateValueAndValidity();

this.register.get("address")?.setValidators([Validators.required]);
this.register.get("address")?.updateValueAndValidity();

this.register.get("state")?.setValidators([Validators.required]);
this.register.get("state")?.updateValueAndValidity();

this.register.get("Email")?.setValidators([Validators.required]);
this.register.get("Email")?.updateValueAndValidity();
}

}

Signin(){
  this.router.navigate(['login']);
}
Cancel(){
  this.showmemmfield=false;
  this.showloginflds=true;
  this.register.reset();
  this.member.reset();
  window.location.reload();
  //this.router.navigate(['register']);
}

}
