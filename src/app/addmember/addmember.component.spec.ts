import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule,FormBuilder,FormControl }   from '@angular/forms';
import { AddmemberComponent } from './addmember.component';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe} from "@angular/common";
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddmemberComponent', () => {
  let component: AddmemberComponent;
  let fixture: ComponentFixture<AddmemberComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmemberComponent ],
      imports:[
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule
      ],
      providers:[FormBuilder,DatePipe,FormControl]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form')) ;
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as text `Member Registration`',() =>
  {
    expect(component.text).toEqual('Member Registration');
  });

  it('should set submitted to true`',() =>
  {
    component.Save();
    expect(component.submitted).toBeTruthy();
  });

  it('should call save method',() => {
    fixture.detectChanges();
    spyOn(component,'Save');
   el=fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
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
    component.register.controls['UserName'].setValue('');
    component.register.controls['password'].setValue('');
    component.member.controls['firstname'].setValue('');
    component.member.controls['lastname'].setValue('');
    component.member.controls['dob'].setValue('');
    component.member.controls['address'].setValue('');
    component.member.controls['state'].setValue('');
    component.member.controls['EmailId'].setValue('');
    component.member.controls['Physician'].setValue('');
    expect(component.register.valid).toBeFalsy();
    expect(component.member.valid).toBeFalsy();
  });

  it('form should be valid`',() =>
  {
    component.register.controls['UserName'].setValue('sairam');
    component.register.controls['password'].setValue('Sai@1234');
    component.member.controls['firstname'].setValue('sairam');
    component.member.controls['lastname'].setValue('sairam');
    component.member.controls['dob'].setValue('2022-09-07T19:46:24.56');
    component.member.controls['address'].setValue('safilguda');
    component.member.controls['state'].setValue('2');
    component.member.controls['EmailId'].setValue('sairam@gmail.com');
    component.member.controls['Physician'].setValue(1);
    expect(component.register.valid).toBeTruthy();
    expect(component.member.valid).toBeTruthy();
  });
});
