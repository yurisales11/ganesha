import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtigosPage } from './artigos.page';

describe('ArtigosPage', () => {
  let component: ArtigosPage;
  let fixture: ComponentFixture<ArtigosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtigosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
