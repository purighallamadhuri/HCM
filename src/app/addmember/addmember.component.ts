import { Component, OnInit, TemplateRef } from '@angular/core';
import { MemberService } from '../service/member.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AssignPhysician, User } from '../Models/Users';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalcompComponent } from '../modalcomp/modalcomp.component';
import { DatePipe} from "@angular/common";

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
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
  //emailpattern: string="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$";
  emailpattern: string="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  todaydate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(private datePipe:DatePipe,private router:Router,private modalService: BsModalService,private memberService:MemberService,private toaster:ToastrService) { }
  //modalRef?: BsModalRef;
  modalRef: BsModalRef<ModalcompComponent> | null = null;
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
  assignphysician: AssignPhysician={
    MemberId : '',
    PhysicianId: 0
  }
  openModal(template: TemplateRef<any>,book:any) {
    this.modalRef = this.modalService.show(book);
  }
  ngOnInit(): void {
  }
  AssignPhysician(assignphysician: any){

  }
  Logout(){
    localStorage.removeItem("Token");
    localStorage.removeItem("UserName");
    localStorage.removeItem("userrole");
    localStorage.removeItem("memberid");
    this.router.navigate(['login']);
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
    this.router.navigate(['addmember']);
  }
  onSubmit(){
    console.log(this.userdetails);
    
    if(this.userdetails.UserType == 2)
    {
    if(this.userdetails.UserName != '' && this.userdetails.Password != '' && this.userdetails.FirstName != '' && this.userdetails.LastName != '' && this.userdetails.Email != ''){
      console.log("HI");
      console.log(this.userdetails);
      this.memberService.AddUser(this.userdetails).subscribe(
        response=>
        {
          console.log(response);
          if(response[0] != null){
            //this.toaster.warning("User already exists in the system", "Information");
            window.confirm("User already exists in the system")
            //this.openModal(#template,response[0].MemberId);
          }
          else{
            this.toaster.success("Registration Successful!!", "Success");
          }
          //this.toaster.success("Registration Successful!!", "Success");
          //this.router.navigate(['login']);
        },
        error =>{
          this.toaster.error("Registration Failed!!", "Failed");
        }
      )
    }
  }
  else if(this.userdetails.UserType == 1){
    console.log(this.userdetails);
    this.memberService.AddUser(this.userdetails).subscribe(
      response=>
      {
        this.toaster.success("Registration Successful!!", "Success");
      },
      error =>{
        this.toaster.error("Registration Failed!!", "Failed");
      }
    )
  }
    this.submitted=true;
    
  }

}
