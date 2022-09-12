import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AssignPhysician } from '../Models/Users';

@Component({
  selector: 'app-assignphysician',
  templateUrl: './assignphysician.component.html',
  styleUrls: ['./assignphysician.component.css']
})
export class AssignphysicianComponent implements OnInit {
  assignphysician:FormGroup= new FormGroup({});
  submitted = false;
  formbuilder: any;
  MemberId:any
  constructor(
    private router:Router,
    private toaster:ToastrService,
    private activatedRoute:ActivatedRoute
    ) { 
      // if (this.router.getCurrentNavigation()?.extras?.state != null) {
      // this.MemberId = this.router.getCurrentNavigation()?.extras.state;
      // console.log(this.MemberId);
      //}
    }

    assignphy:AssignPhysician={
      MemberId:'',
      PhysicianId:0
    }

  ngOnInit(): void {
    this.MemberId = this.activatedRoute.snapshot.params['Memberid'];
    console.log(this.MemberId);
    this.assignphysician = this.formbuilder.group({
      MemberId: ['', [Validators.required]],
      UserType:['',Validators.required],
    })
  }

  Logout(){
    localStorage.removeItem("Token");
    localStorage.removeItem("userrole");
    localStorage.removeItem("memberid");
    localStorage.removeItem("UserName");
    this.router.navigate(['login']);
  }

}
