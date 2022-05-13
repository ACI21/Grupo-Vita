import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDoctorsComponent } from './show-doctors.component';

describe('ShowDoctorsComponent', () => {
  let component: ShowDoctorsComponent;
  let fixture: ComponentFixture<ShowDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
