import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalamComponent } from './calam.component';

describe('CalamComponent', () => {
  let component: CalamComponent;
  let fixture: ComponentFixture<CalamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
