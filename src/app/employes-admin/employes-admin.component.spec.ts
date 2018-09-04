import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesAdminComponent } from './employes-admin.component';

describe('EmployesAdminComponent', () => {
  let component: EmployesAdminComponent;
  let fixture: ComponentFixture<EmployesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
