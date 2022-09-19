import { Component, OnInit, TemplateRef } from '@angular/core';
import { MemberService } from '../service/member.service';
import { PhysicianService } from '../service/physician.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AssignPhysician, Get_User, User } from '../Models/Users';

import { DatePipe} from "@angular/common";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
  text ='Member Registration';
  register:FormGroup= new FormGroup({});
  member:FormGroup= new FormGroup({});
  submitted = false;
  showmemmfield:boolean=false;
   showloginflds:Boolean=true;
  constructor(private router:Router,
    private formbuilder: FormBuilder,
    private memberService:MemberService,
    private toaster:ToastrService,
    private datePipe:DatePipe,
    private physicianService:PhysicianService
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
    UserType:2
  }
  getuserdetails : Get_User = {
    memberId:'',
    firstName:'',
    lastName:'',
    userName:'',
    dob:new Date(),
    address:'',
    state:'',
    email:'',
    physicianId:0,
    password:'',
    createdDate:new Date(),
    modifiedDate: new Date(),
    userType:2
  }
  assignphysician: AssignPhysician={
  MemberId:'',
  PhysicianId:0
 }
 PhysicianDetails: any
  ngOnInit(): void {
    this.register = this.formbuilder.group({
      UserName: ['', [Validators.required,Validators.minLength(5)]],
      password:['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$")]],
    })
    //,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    this.member = this.formbuilder.group({
      firstname: ['',[Validators.required,Validators.minLength(5)]],
      lastname: ['',[Validators.required,Validators.minLength(5)]],
      dob:['',[Validators.required]],
      address:['',[Validators.required,Validators.maxLength(100)]],
      state:['',[Validators.required]],
      EmailId:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Physician:[0,[Validators.required]],
    })
    this.GetAllPhysicians()
  }
  result:any
  AssignPhysician(assignphysician:any){

  }
  SelectChange(event:any){
    let idx = event.target.value;
    this.member.controls['Physician'].clearValidators();
  }
  GetAllPhysicians(){
    this.physicianService.getAllPhysicians().subscribe(
      response => {
        this.PhysicianDetails = response;
      }
    )
  }
Save(){
  this.submitted=true;
if (!this.member.invalid) {
  console.log(this.userdetails)
  this.memberService.AddUser(this.userdetails).subscribe(
    response=>
    {
      this.toaster.success("Registration Successful!!", "Success");
      this.router.navigate(['searchmember']);
    },
    error =>{
      this.toaster.error("Registration Failed!!", "Failed");
    }
  )
}
}
onSubmit(){
this.submitted=true;
if (!this.register.invalid) {
  this.memberService.CheckUserExists(this.userdetails).subscribe(
    response=>
    {
      this.result=response;
      console.log(this.result)
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
      this.toaster.error("Registration Failed!!", "Failed");
    }
  )
}
}
Logout(){
  localStorage.removeItem("Token");
  localStorage.removeItem("userrole");
  localStorage.removeItem("memberid");
  localStorage.removeItem("UserName");
  this.router.navigate(['login']);
}
Signin(){
  this.router.navigate(['login']);
}
Cancel(){
  this.register.reset();
  window.location.reload();
}

}
