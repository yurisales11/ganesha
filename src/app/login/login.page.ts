import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  login: string = '';
  senha: string = '';
  erro: string = ''; // Para armazenar mensagem de erro

  constructor(private router: Router, private toastController: ToastController) {}

  // Método de login
  async loginUser() {
    // Recupera os dados dos usuários armazenados no localStorage
    const usuarios: any[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Busca o usuário no array de usuários
    const usuario = usuarios.find(user => user.login === this.login);

    // Verifica se o usuário foi encontrado
    if (usuario) {
      // Se a senha estiver correta
      if (usuario.senha === this.senha) {
        // Exibe uma mensagem de sucesso e redireciona para a página desejada
        this.showToast('Login bem-sucedido!', 'success');
        this.router.navigate(['/teste']);
      } else {
        // Se a senha estiver incorreta
        this.erro = 'Senha incorreta!';
        this.showToast('Senha incorreta!', 'danger');
      }
    } else {
      // Se o usuário não for encontrado
      this.erro = 'Usuário não encontrado!';
      this.showToast('Usuário não encontrado!', 'danger');
    }
  }

  // Função para exibir o toast
  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}
