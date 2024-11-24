import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private contasSubject = new BehaviorSubject<any[]>([]); // Substitua o tipo `any[]` pelo tipo real das contas
  contas$ = this.contasSubject.asObservable();

  constructor() {}

  setContas(contas: any[]) {
    this.contasSubject.next(contas);
  }

  getContas() {
    return this.contasSubject.value;
  }
}
