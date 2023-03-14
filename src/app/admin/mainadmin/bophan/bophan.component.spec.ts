import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BophanComponent } from './bophan.component';

describe('BophanComponent', () => {
  let component: BophanComponent;
  let fixture: ComponentFixture<BophanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BophanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BophanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
