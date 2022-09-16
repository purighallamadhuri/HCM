import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule,FormBuilder }   from '@angular/forms';
import { RouterModule} from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AddmemberComponent } from './addmember/addmember.component';
import { MemberclaimComponent } from './memberclaim/memberclaim.component';
import { DatePipe} from "@angular/common";
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegistercompComponent } from './registercomp/registercomp.component';
import { SearchmemberComponent } from './searchmember/searchmember.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddmemberComponent,
    MemberclaimComponent,
    RegistercompComponent,
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
       {path:'addmember',component : AddmemberComponent},
       {path:'memberclaim',component : MemberclaimComponent},
       {path:'register',component : RegistercompComponent},
       {path:'searchmember',component : SearchmemberComponent},
       {path:'searchmember/:Id',component : SearchmemberComponent}
    ]),
  ],
   providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,HttpClientModule,DatePipe,FormBuilder],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
