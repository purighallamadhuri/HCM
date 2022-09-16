import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MemberClaims } from '../Models/claims';
import { ClaimsService } from '../service/claims.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { DatePipe} from "@angular/common";

@Component({
  selector: 'app-membercomp',
  templateUrl: './memberclaim.component.html',
  styleUrls: ['./memberclaim.component.css']
})
export class MemberclaimComponent implements OnInit {
  MemberId:any
  addclaim:FormGroup= new FormGroup({});
  submitted: Boolean =false;
  constructor(
    private router:Router,
    private toaster:ToastrService,
    private activatedRoute:ActivatedRoute,
    private claimsService:ClaimsService,
    private formbuilder: FormBuilder,
    private datePipe:DatePipe
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  MemberSearchData:any=[]
  todaydate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  ngOnInit(): void {
    //this.MemberId = this.activatedRoute.snapshot.params['memberid'];
    
    console.log(this.MemberId);
    this.MemberSearchData=localStorage.getItem("Searchcheckeddata");
    this.MemberSearchData=JSON.parse(this.MemberSearchData);
    this.MemberId = this.MemberSearchData[0].MemberId;
    console.log(this.MemberSearchData)
    this.GetClaimTypes();
    this.addclaim = this.formbuilder.group({
      ClaimType : ['', [Validators.required]],
      ClaimAmount:['',[Validators.required,Validators.pattern("^[1-9][0-9]*$")]],
      ClaimDate:['',[Validators.required]],
      Remarks:['',[Validators.required]]
    })
  }
  MemberIdList:any=[]
  MemSubmitClaimData:any=[]
  FinalSubmitData:any=[]
  claimTypes:any
  memberClaims: MemberClaims={
    claimId:0,
    //memberId:this.activatedRoute.snapshot.params['memberid'],
    memberId:'',
    claimType:'',
    claimAmount:0,
    claimDate: new Date(),
    remarks:''
  }
  GetClaimTypes(){
    this.claimsService.getAllClaimTypes().subscribe(
      response=> {
        console.log(response);
        this.claimTypes = response;
      }
    )
  }
  Cancel(){
    this.addclaim.reset();
    //window.location.reload();
    this.router.navigate(['searchmember']);
  }
  Save(){
    this.submitted = true;
    if (!this.addclaim.invalid) {
    console.log(this.memberClaims);
    for(var list of this.MemberSearchData){
      this.MemberIdList.push(list.MemberId)
      console.log(this.MemberIdList)
    }
    //var i=0
    for(let i=0; i<this.MemberIdList.length;i++ ){
      console.log(this.MemberIdList[i])
      this.memberClaims.memberId=this.MemberIdList[i]
      //i = i + 1;
      // this.MemSubmitClaimData=[];
      // console.log(this.MemSubmitClaimData)
      // console.log(this.memberClaims);
      // this.MemSubmitClaimData.push(this.memberClaims)
      // console.log(this.MemSubmitClaimData)
      // this.FinalSubmitData.push(this.MemSubmitClaimData);
      this.claimsService.AddMemberClaims(this.memberClaims).subscribe(
      response=> {
        this.toaster.success("Claim Submitted Successfully.", "Success");
        //this.router.navigate(['searchmember'])
        this.router.navigate(['searchmember']);
      },
      error=>{
        this.toaster.error("Claim Submission Failed.", "Failed");
      }
    )
    }
    console.log(this.FinalSubmitData)
    
    // this.claimsService.AddMemberClaims(this.memberClaims).subscribe(
    //   response=> {
    //     this.toaster.success("Claim Submitted Successfully.", "Success");
    //     this.router.navigate(['searchmember'])
    //   },
    //   error=>{
    //     this.toaster.error("Claim Submission Failed.", "Failed");
    //   }
    // )
    }
  }
}
