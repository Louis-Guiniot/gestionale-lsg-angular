import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvaComponent } from './iva.component';

describe('IvaComponent', () => {
  let component: IvaComponent;
  let fixture: ComponentFixture<IvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
