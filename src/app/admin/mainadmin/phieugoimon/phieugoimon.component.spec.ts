import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieugoimonComponent } from './phieugoimon.component';

describe('PhieugoimonComponent', () => {
  let component: PhieugoimonComponent;
  let fixture: ComponentFixture<PhieugoimonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieugoimonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieugoimonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
