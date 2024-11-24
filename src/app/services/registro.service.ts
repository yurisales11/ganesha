import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private afAuth: AngularFireAuth) { }

  async registrar(login: string, senha: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(login, senha);
      return userCredential;
    } catch (erro) {
      throw new Error();  // Lança erro para o componente tratar
    }
  }
}
