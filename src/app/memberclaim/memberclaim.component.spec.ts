import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MemberclaimComponent } from './memberclaim.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule,FormBuilder,FormControl }   from '@angular/forms';
import { DatePipe} from "@angular/common";

describe('MemberclaimComponent', () => {
  let component: MemberclaimComponent;
  let fixture: ComponentFixture<MemberclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberclaimComponent ],
      imports:[
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers:[FormBuilder,FormControl,DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
