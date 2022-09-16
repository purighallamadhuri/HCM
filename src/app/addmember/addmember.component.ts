import { Component, OnInit, TemplateRef } from '@angular/core';
import { MemberService } from '../service/member.service';
import { PhysicianService } from '../service/physician.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AssignPhysician, Get_User, User } from '../Models/Users';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe} from "@angular/common";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
  modalRef?: BsModalRef;
  register:FormGroup= new FormGroup({});
  member:FormGroup= new FormGroup({});
  submitted = false;
  showmemmfield:boolean=false;
   showloginflds:Boolean=true;
   //hide:boolean=false;
  constructor(private router:Router,
    private formbuilder: FormBuilder,
    private memberService:MemberService,
    private toaster:ToastrService,
    private datePipe:DatePipe,
    private modalService: BsModalService,
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
    this.member = this.formbuilder.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      dob:['',Validators.required],
      address:['',Validators.required],
      state:['',Validators.required],
      EmailId:['',Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      Physician:[0,Validators.required],

    })
    this.GetAllPhysicians()
  }
  result:any
  AssignPhysician(assignphysician:any){

  }
  SelectChange(event:any){
    let idx = event.target.value;
    console.log('id:', idx);
    this.member.controls['Physician'].clearValidators();
  }
  GetAllPhysicians(){
    this.physicianService.getAllPhysicians().subscribe(
      response => {
        this.PhysicianDetails = response
        console.log(this.PhysicianDetails)
      }
    )
  }
  //openModal(template: TemplateRef<any>,book:any) {}
// onSubmit(){
//   this.submitted=true;
//   console.log(this.userdetails);
//   if (!this.register.invalid) {
//     console.log(this.register.value)
//     console.log(this.userdetails);
//     this.memberService.AddUser(this.userdetails).subscribe(
//       response=>
//       {
//         this.getuserdetails=response[0];
//         console.log(this.getuserdetails.memberId);
//         if(response[0] != null){
//           console.log(response[0]);
//           this.toaster.warning("User already exists in the system", "Information");
//           this.router.navigate(['assign/' + this.getuserdetails]);
//           //this.router.navigate(['assign'], { state: { example: this.userdetails.MemberId } });
//           //window.confirm("User already exists in the system");
//           //this.openModal(#template,response[0].MemberId);
//         }
//         else{
//           this.toaster.success("Registration Successful!!", "Success");
//         }
//         // this.toaster.success("Registration Successful!!", "Success");
//         // this.router.navigate(['login']);
//       },
//       error =>{
//         this.toaster.error("Registration Failed!!", "Failed");
//       }
//     )
//   }
//   // else{
//   //   alert('invalid');
//   // }

// }
Save(){
  this.submitted=true;
if (!this.member.invalid) {
  console.log(this.userdetails);
  this.memberService.AddUser(this.userdetails).subscribe(
    response=>
    {
      console.log(response);
      this.toaster.success("Registration Success!!", "Success");
      this.router.navigate(['searchmember']);
    },
    error =>{
      console.log("error")
      this.toaster.error("Registration Failed!!", "Failed");
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
      console.log(this.result.result);
      if(this.result.result == "Entered user already exists in the system"){
        this.toaster.error(this.result.result, "Failed");
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
Logout(){
  localStorage.removeItem("Token");
  localStorage.removeItem("userrole");
  localStorage.removeItem("memberid");
  localStorage.removeItem("UserName");
  this.router.navigate(['login']);
}
OpenMemberFields(data:any){
console.log(data.target.value);

  //this.hide=true;
  this.register.get("firstname")?.setValidators([Validators.required,Validators.minLength(5), Validators.min(1)]);
this.register.get("firstname")?.updateValueAndValidity();
this.register.get("lastname")?.setValidators([Validators.required,Validators.minLength(5), Validators.min(1)]);
this.register.get("lastname")?.updateValueAndValidity();

this.register.get("dob")?.setValidators([Validators.required, Validators.min(1)]);
this.register.get("dob")?.updateValueAndValidity();

this.register.get("address")?.setValidators([Validators.required, Validators.min(1)]);
this.register.get("address")?.updateValueAndValidity();

this.register.get("state")?.setValidators([Validators.required, Validators.min(1)]);
this.register.get("state")?.updateValueAndValidity();

this.register.get("Email")?.setValidators([Validators.required, Validators.min(1)]);
this.register.get("Email")?.updateValueAndValidity();


}

Signin(){
  this.router.navigate(['login']);
}
Cancel(){
  this.register.reset();
  window.location.reload();
  //this.router.navigate(['register']);
}

}
