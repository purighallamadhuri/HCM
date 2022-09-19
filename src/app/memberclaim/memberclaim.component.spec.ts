import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MemberclaimComponent } from './memberclaim.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule,FormBuilder,FormControl }   from '@angular/forms';
import { DatePipe} from "@angular/common";
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('MemberclaimComponent', () => {
  let component: MemberclaimComponent;
  let fixture: ComponentFixture<MemberclaimComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberclaimComponent ],
      imports:[
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        
      ],
      providers:[FormBuilder,FormControl,DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form')) ;
    el = de.nativeElement;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as text `Claim Submission`',() =>
  {
    expect(component.text).toEqual('Claim Submission');
  });

  it('should set submitted to true`',() =>
  {
    component.Save();
    expect(component.submitted).toBeTruthy();
  });

  it('should call save method',() => {
    fixture.detectChanges();
    spyOn(component,'Save');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.Save).toHaveBeenCalledTimes(0);
  });

  it('should call cancel method',() => {
    fixture.detectChanges();
    spyOn(component,'Cancel');
   el=fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
   el.click();
   expect(component.Cancel).toHaveBeenCalled();
  });

  it('form should be invalid`',() =>
  {
    component.addclaim.controls['ClaimType'].setValue('');
    component.addclaim.controls['ClaimAmount'].setValue('');
    component.addclaim.controls['ClaimDate'].setValue('');
    component.addclaim.controls['Remarks'].setValue('');
    expect(component.addclaim.valid).toBeFalsy();
  });

  it('form should be invalid`',() =>
  {
    component.addclaim.controls['ClaimType'].setValue('1');
    component.addclaim.controls['ClaimAmount'].setValue('100');
    component.addclaim.controls['ClaimDate'].setValue('2022-09-07T19:46:24.56');
    component.addclaim.controls['Remarks'].setValue('abcd');
    expect(component.addclaim.valid).toBeTruthy();
  });

});
