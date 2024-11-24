import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanejamentosPage } from './planejamentos.page';

describe('PlanejamentosPage', () => {
  let component: PlanejamentosPage;
  let fixture: ComponentFixture<PlanejamentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanejamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
