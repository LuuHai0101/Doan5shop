import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckcartComponent } from './checkcart.component';

describe('CheckcartComponent', () => {
  let component: CheckcartComponent;
  let fixture: ComponentFixture<CheckcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
