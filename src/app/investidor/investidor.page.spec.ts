import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestidorPage } from './investidor.page';

describe('InvestidorPage', () => {
  let component: InvestidorPage;
  let fixture: ComponentFixture<InvestidorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
