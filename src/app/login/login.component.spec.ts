import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { JwtHelperService,JWT_OPTIONS  } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule,FormBuilder,FormControl }   from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      providers:[{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },JwtHelperService,FormBuilder,FormControl]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as text `Sign In`',() =>
  {
    expect(component.text).toEqual('Sign In');
  });

  it('should set submitted to true`',() =>
  {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should call onSubmit method',() => {
    fixture.detectChanges();
    spyOn(component,'onSubmit');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.onSubmit).toHaveBeenCalled();
  });

  it('form should be invalid`',() =>
  {
    component.fglogin.controls['loginusername'].setValue('');
    component.fglogin.controls['loginpassword'].setValue('');
    expect(component.fglogin.valid).toBeFalsy();
  });

  it('form should be invalid`',() =>
  {
    component.fglogin.controls['loginusername'].setValue('admin');
    component.fglogin.controls['loginpassword'].setValue('Admin@1234');
    expect(component.fglogin.valid).toBeTruthy();
  });
});
