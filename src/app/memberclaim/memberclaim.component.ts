import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-membercomp',
  templateUrl: './memberclaim.component.html',
  styleUrls: ['./memberclaim.component.css']
})
export class MemberclaimComponent implements OnInit {
  MemberId:any
  constructor(
    private router:Router,
    private toaster:ToastrService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.MemberId = this.activatedRoute.snapshot.params['memberid'];
    console.log(this.MemberId);
  }

}
