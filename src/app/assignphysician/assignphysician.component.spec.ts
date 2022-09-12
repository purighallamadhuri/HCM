import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignphysicianComponent } from './assignphysician.component';

describe('AssignphysicianComponent', () => {
  let component: AssignphysicianComponent;
  let fixture: ComponentFixture<AssignphysicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignphysicianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignphysicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
