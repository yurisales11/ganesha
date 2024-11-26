import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarreceitasPage } from './adicionarreceitas.page';

describe('AdicionarreceitasPage', () => {
  let component: AdicionarreceitasPage;
  let fixture: ComponentFixture<AdicionarreceitasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarreceitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
