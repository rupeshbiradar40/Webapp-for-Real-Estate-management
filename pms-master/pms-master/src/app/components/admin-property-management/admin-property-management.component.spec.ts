import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropertyManagementComponent } from './admin-property-management.component';

describe('AdminPropertyManagementComponent', () => {
  let component: AdminPropertyManagementComponent;
  let fixture: ComponentFixture<AdminPropertyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPropertyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPropertyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
