import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingHomeComponent } from './camping-home.component';

describe('CampingHomeComponent', () => {
  let component: CampingHomeComponent;
  let fixture: ComponentFixture<CampingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
