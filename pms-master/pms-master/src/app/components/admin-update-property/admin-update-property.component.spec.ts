import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdatePropertyComponent } from './admin-update-property.component';

describe('AdminUpdatePropertyComponent', () => {
  let component: AdminUpdatePropertyComponent;
  let fixture: ComponentFixture<AdminUpdatePropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUpdatePropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdatePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
