import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from './service/member.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HCM';
  private UnsubcsribeAll = new Subject();
  loginDetails:any
  userType:any
  userName:any
  constructor(private router:Router,private memberService:MemberService
    ) { }
    ngOnInit(): void {
      //this.HideNavMenu();
      this.memberService.updateSite.pipe(takeUntil(this.UnsubcsribeAll)).subscribe((r: any) => {
        this.loginDetails = localStorage.getItem("memberid");
        //console.log("Digital");
        console.log(this.loginDetails);
        this.userName = localStorage.getItem("UserName");
        this.userType = localStorage.getItem("userrole");
       });
     }
     ngOnDestroy(){
       this.UnsubcsribeAll.next(false);
       this.UnsubcsribeAll.complete();
     }
  Logout(){
    localStorage.removeItem("Token");
    localStorage.removeItem("userrole");
    localStorage.removeItem("memberid");
    localStorage.removeItem("UserName");
    this.router.navigate(['login']);
    this.memberService.updateSite.next(true);
  }
}
