import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesFoundComponent } from './invoices-found.component';

describe('InvoicesFoundComponent', () => {
  let component: InvoicesFoundComponent;
  let fixture: ComponentFixture<InvoicesFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
