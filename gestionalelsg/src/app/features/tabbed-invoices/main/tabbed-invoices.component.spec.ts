import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedInvoicesComponent } from './tabbed-invoices.component';

describe('TabbedInvoicesComponent', () => {
  let component: TabbedInvoicesComponent;
  let fixture: ComponentFixture<TabbedInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabbedInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
