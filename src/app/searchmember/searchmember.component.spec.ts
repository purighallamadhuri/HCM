import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, FormBuilder, Validators, ValidationErrors,FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchmemberComponent } from './searchmember.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SearchmemberComponent', () => {
  let component: SearchmemberComponent;
  let fixture: ComponentFixture<SearchmemberComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchmemberComponent ],
      imports:[
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers:[FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form')) ;
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as text `Member Search`',() =>
  {
    expect(component.text).toEqual('Member Search');
  });

  it('should set submitted to true`',() =>
  {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should call save method',() => {
    fixture.detectChanges();
    spyOn(component,'onSubmit');
   el=fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
   el.click();
   expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call cancel method',() => {
    fixture.detectChanges();
    spyOn(component,'Cancel');
   el=fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
   el.click();
   expect(component.Cancel).toHaveBeenCalled();
  });

  it('form should be valid`',() =>
  {
    component.search.controls['Memberid'].setValue('');
    component.search.controls['FirstName'].setValue('');
    component.search.controls['LastName'].setValue('');
    component.search.controls['ClaimId'].setValue('');
    expect(component.search.valid).toBeTruthy();
  });
});
