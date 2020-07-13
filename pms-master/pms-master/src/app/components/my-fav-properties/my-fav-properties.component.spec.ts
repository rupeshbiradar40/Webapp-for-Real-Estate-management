import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavPropertiesComponent } from './my-fav-properties.component';

describe('MyFavPropertiesComponent', () => {
  let component: MyFavPropertiesComponent;
  let fixture: ComponentFixture<MyFavPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFavPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
