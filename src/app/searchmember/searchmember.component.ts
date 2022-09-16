import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { SearchMembers } from '../Models/Users';
import { Router,ActivatedRoute } from '@angular/router';
import { MemberService } from '../service/member.service';
import { PhysicianService } from '../service/physician.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-searchmember',
  templateUrl: './searchmember.component.html',
  styleUrls: ['./searchmember.component.css']
})
export class SearchmemberComponent implements OnInit {
  search: FormGroup = new FormGroup({});
  submitted: Boolean = false
  notTheSame: Boolean = false
  PhysicianDetails: any
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private memberService: MemberService,
    private physicianService: PhysicianService,
    private toaster: ToastrService,
    private activatedRoute:ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }
  searchMemberResult: any
  searchmembers: SearchMembers = {
    MemberId: '',
    FirstName: '',
    LastName: '',
    PhysicianId: 0,
    ClaimId: ''
  }
  finalSearchData:any= [];
  UserRoleType:any = ''
  showFiledsBasedOnRole:Boolean=false;
  loggedInMemberID:any
  disablefield:Boolean=false;
  localstorageSearchCriteria: any
  localstorageSearchCriteriaData: any
  Id:any
  ngOnInit(): void {
    this.Id = this.activatedRoute.snapshot.params['Id'];
    console.log(this.Id);
    this.GetAllPhysicians();
    this.search = this.formbuilder.group({
      Memberid:[''],
      FirstName: [''],
      LastName: [''],
      ClaimId: ['']
    });
    if(localStorage.getItem("SearchCriteria") != null && localStorage.getItem("SearchCriteriaData") != null){
      this.localstorageSearchCriteria = JSON.parse(localStorage.getItem("SearchCriteria") || '{}')
      this.localstorageSearchCriteriaData = JSON.parse(localStorage.getItem("SearchCriteriaData") || '{}')
      this.searchmembers=this.localstorageSearchCriteria
      this.onSubmit();
      localStorage.removeItem("SearchCriteria") 
      localStorage.setItem("SearchCriteria_New",JSON.stringify(this.localstorageSearchCriteria))
      localStorage.removeItem("SearchCriteriaData")
    }
    this.UserRoleType = localStorage.getItem("userrole");
    if(this.UserRoleType == "1"){
      this.showFiledsBasedOnRole = true;
    }
    else{
      this.loggedInMemberID = localStorage.getItem("memberid");
      this.searchmembers.MemberId = this.loggedInMemberID;
      this.showFiledsBasedOnRole = false;
    }
  }
  GetAllPhysicians() {
    this.physicianService.getAllPhysicians().subscribe(
      response => {
        this.PhysicianDetails = response;
        console.log(this.PhysicianDetails)
      }
    )
  }
  Cancel() {
    localStorage.removeItem("SearchCriteria") 
    localStorage.removeItem("SearchCriteriaData")
    window.location.reload();
    this.search.reset();
  }
  getRow(searchdetails: any){
    //console.log(searchdetails);
  }

  getRowData(searchData: any){
    if(localStorage.getItem("SearchCriteria") == null){
      localStorage.setItem("SearchCriteria",localStorage.getItem("SearchCriteria_New") || '{}')
    }
    this.finalSearchData.push(searchData);
    localStorage.setItem("Searchcheckeddata",JSON.stringify(this.finalSearchData))
  }
  CheckData(){
    if(localStorage.getItem("Searchcheckeddata") == null){
      window.alert("Select atleast one member data to proceed.");
    }
    else{
      this.router.navigate(['memberclaim'])
    }
  }

  onSubmit() {
    localStorage.removeItem("Searchcheckeddata");
    localStorage.setItem("SearchCriteria",JSON.stringify(this.searchmembers))
    if (this.searchmembers.MemberId != '' || this.searchmembers.FirstName != '' || this.searchmembers.LastName != ''
      || this.searchmembers.PhysicianId != 0 || this.searchmembers.ClaimId != '') {
      if ((this.searchmembers.FirstName != '' && this.searchmembers.LastName == '') || (this.searchmembers.FirstName == '' && this.searchmembers.LastName != '')) {
        window.alert("Both First and Last Name is required")
      }
      else {
        this.submitted = true;
        this.memberService.MemberSearch(this.searchmembers).subscribe(
          response => {
            this.searchMemberResult = JSON.parse(JSON.stringify(response));
            if(this.searchMemberResult != null){
              localStorage.setItem("SearchCriteriaData",JSON.stringify(this.searchMemberResult))
            }
            if(this.searchMemberResult == null){
              this.toaster.error("No Results Found!!","Error")
            }
          },error=>
          this.toaster.error("No Results Found!!","Error")
        )
      }
    }
    else {
      window.alert("Atleast 1 input is required");
    }
  }

}
