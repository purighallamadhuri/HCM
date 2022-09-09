import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembercompComponent } from './membercomp.component';

describe('MembercompComponent', () => {
  let component: MembercompComponent;
  let fixture: ComponentFixture<MembercompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembercompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembercompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
