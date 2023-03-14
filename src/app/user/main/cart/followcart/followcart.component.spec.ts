import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowcartComponent } from './followcart.component';

describe('FollowcartComponent', () => {
  let component: FollowcartComponent;
  let fixture: ComponentFixture<FollowcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
