import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductbestComponent } from './productbest.component';

describe('ProductbestComponent', () => {
  let component: ProductbestComponent;
  let fixture: ComponentFixture<ProductbestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductbestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductbestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
