import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDateComponent } from './delete-date.component';

describe('DeleteDateComponent', () => {
  let component: DeleteDateComponent;
  let fixture: ComponentFixture<DeleteDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
