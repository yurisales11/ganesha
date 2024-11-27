import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuarioNome: string = ''; // Altere para 'usuarioNome'
  usuarioSenha: string = ''; // Altere para 'usuarioSenha'
  erro: string = ''; // Para armazenar mensagem de erro

  constructor(private router: Router, private toastController: ToastController) {}

  // Método de login
  async loginUser() {
    // Recupera os dados do usuário armazenados no localStorage
    const usuarioNome = localStorage.getItem('usuarioNome');
    const usuarioSenha = localStorage.getItem('usuarioSenha');

    // Verifica se o nome de usuário e senha estão corretos
    if (usuarioNome && usuarioSenha) {
      if (this.usuarioNome === usuarioNome && this.usuarioSenha === usuarioSenha) {
        // Exibe uma mensagem de sucesso e redireciona para a página desejada
        this.showToast('Login bem-sucedido!', 'success');
        this.router.navigate(['/teste']); // Substitua '/teste' pela rota que deseja
      } else {
        // Se a senha estiver incorreta
        this.erro = 'Senha incorreta!';
        this.showToast('Senha ou login incorretos!', 'danger');
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
      position: 'top',
    });
    toast.present();
  }
}
