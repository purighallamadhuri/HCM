import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule} from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AddmemberComponent } from './addmember/addmember.component';
import { MemberclaimComponent } from './memberclaim/memberclaim.component';
import { DatePipe} from "@angular/common";
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegistercompComponent } from './registercomp/registercomp.component';
import { AssignphysicianComponent } from './assignphysician/assignphysician.component';
import { SearchmemberComponent } from './searchmember/searchmember.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddmemberComponent,
    MemberclaimComponent,
    RegistercompComponent,
    AssignphysicianComponent,
    SearchmemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {path:'',component : LoginComponent},
       {path:'login',component : LoginComponent},
       {path:'oldreg',component : RegisterComponent},
       {path:'addmember',component : AddmemberComponent},
       {path:'memberclaim/:memberid',component : MemberclaimComponent},
       {path:'register',component : RegistercompComponent},
       {path:'assign',component : AssignphysicianComponent},
       {path:'searchmember',component : SearchmemberComponent}
    ]),
  ],
   providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,HttpClientModule,DatePipe],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
