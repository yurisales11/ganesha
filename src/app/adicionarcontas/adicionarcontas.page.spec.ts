import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarcontasPage } from './adicionarcontas.page';

describe('AdicionarcontasPage', () => {
  let component: AdicionarcontasPage;
  let fixture: ComponentFixture<AdicionarcontasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarcontasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
