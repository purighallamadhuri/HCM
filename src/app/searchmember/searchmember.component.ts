import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { SearchMembers } from '../Models/Users';
import { Router } from '@angular/router';
import { MemberService } from '../service/member.service';
import { PhysicianService } from '../service/physician.service';

@Component({
  selector: 'app-searchmember',
  templateUrl: './searchmember.component.html',
  styleUrls: ['./searchmember.component.css']
})
export class SearchmemberComponent implements OnInit {
  search:FormGroup= new FormGroup({});
  submitted:Boolean=false
  notTheSame:Boolean=false
  PhysicianDetails:any
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private memberService:MemberService,
    private physicianService:PhysicianService
    ) { }
  // public static checkBothfielshavedata(formGroup: FormGroup): ValidationErrors | null {
  //     const Firstname = formGroup.get('FirstName')?.value;
  //     const Lastname = formGroup.get('LastName')?.value;
      
  //     if ((Firstname != "" && Lastname == "") || (Firstname == "" && Lastname != "")) {
  //         return {
  //             notTheSame: true
  //         };
  //     }
  //     return null;
  // }
  searchMemberResult : any
  searchmembers:SearchMembers={
    MemberId: '',
    FirstName:'',
    LastName:'',
    PhysicianId:0,
    ClaimId:''
  }
  ngOnInit(): void {
    this.GetAllPhysicians();
    // this.search.controls['ClaimId'].setValue("");
    // this.search = this.formbuilder.group({
    //   FirstName: ['', [Validators.required]],
    //   LastName:['',[Validators.required]],
    //   ClaimId:['']
    // },
    // {
    //   Validators: SearchmemberComponent.checkBothfielshavedata
    // });
    
  }
  GetAllPhysicians(){
    this.physicianService.getAllPhysicians().subscribe(
      response => {
        this.PhysicianDetails = response;
        console.log(this.PhysicianDetails)
      }
    )
  }
  Cancel(){
    this.search.reset();
    //this.router.navigate(['searchmember']);
  }
  onSubmit(){
    console.log(this.searchmembers)
    this.submitted=true;
    this.memberService.MemberSearch(this.searchmembers).subscribe(
      response => {
        console.log(response);
        this.searchMemberResult = response;
      }
    )
  }

}
