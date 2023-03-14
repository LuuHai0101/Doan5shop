import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhachhangthanhtoanComponent } from './khachhangthanhtoan.component';

describe('KhachhangthanhtoanComponent', () => {
  let component: KhachhangthanhtoanComponent;
  let fixture: ComponentFixture<KhachhangthanhtoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhachhangthanhtoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhachhangthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
