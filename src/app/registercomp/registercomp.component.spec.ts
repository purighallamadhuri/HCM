import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistercompComponent } from './registercomp.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule,FormBuilder,FormControl }   from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe} from "@angular/common";
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RegistercompComponent', () => {
  let component: RegistercompComponent;
  let fixture: ComponentFixture<RegistercompComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistercompComponent ],
      imports: [ 
        RouterTestingModule ,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers:[FormBuilder,FormControl,DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistercompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form')) ;
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as text `User Registration`',() =>
  {
    expect(component.text).toEqual('User Registration');
  });

  it('should set submitted to true`',() =>
  {
    component.Save();
    expect(component.submitted).toBeTruthy();
  });

  // it('should call save method',() => {
  //   fixture.detectChanges();
  //   spyOn(component,'Save');
  //  el=fixture.debugElement.query(By.css('button')).nativeElement;
  //  el.click();
  //  expect(component.Save).toHaveBeenCalledTimes(0);
  // });

  it('form should be invalid`',() =>
  {
    component.register.controls['UserName'].setValue('');
    component.register.controls['password'].setValue('');
    component.register.controls['UserType'].setValue(0);
    component.member.controls['firstname'].setValue('');
    component.member.controls['lastname'].setValue('');
    component.member.controls['dob'].setValue('');
    component.member.controls['address'].setValue('');
    component.member.controls['state'].setValue('');
    component.member.controls['Email'].setValue('');
    expect(component.register.valid).toBeFalsy();
    expect(component.member.valid).toBeFalsy();
  });

  it('form should be valid`',() =>
  {
    component.register.controls['UserName'].setValue('sairam');
    component.register.controls['password'].setValue('Sai@1234');
    component.register.controls['UserType'].setValue(1);
    component.member.controls['firstname'].setValue('sairam');
    component.member.controls['lastname'].setValue('sairam');
    component.member.controls['dob'].setValue('2022-09-07T19:46:24.56');
    component.member.controls['address'].setValue('safilguda');
    component.member.controls['state'].setValue('2');
    component.member.controls['Email'].setValue('sairam@gmail.com');
    expect(component.register.valid).toBeTruthy();
    expect(component.member.valid).toBeTruthy();
  });
});
