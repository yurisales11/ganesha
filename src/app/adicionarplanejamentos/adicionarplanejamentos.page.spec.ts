import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarplanejamentosPage } from './adicionarplanejamentos.page';

describe('AdicionarplanejamentosPage', () => {
  let component: AdicionarplanejamentosPage;
  let fixture: ComponentFixture<AdicionarplanejamentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarplanejamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
