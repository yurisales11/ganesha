import { Component } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  email: string = '';
  senha: string = '';
  login: string = ''; // Nome do usuário
  confirmarSenha: string = '';

  constructor(
    private registroService: RegistroService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async apresentarToast(mensagem: string, cor: string = 'danger') {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: cor,
      position: 'top',
    });
    await toast.present();
  }

  async cadastrar() {
    // Verifica se as senhas coincidem
    if (this.senha !== this.confirmarSenha) {
      this.apresentarToast('As senhas não coincidem!');
      return;
    }

    try {
      // Chama o serviço para registrar o usuário com o email e senha
      await this.registroService.registrar(this.email, this.senha);

      // Salva os dados no localStorage
      localStorage.setItem('usuarioNome', this.login); // Salva o nome do usuário
      localStorage.setItem('usuarioEmail', this.email); // Salva o e-mail do usuário
      localStorage.setItem('usuarioSenha', this.senha); // Não recomendado para produção

      // Exibe mensagem de sucesso
      this.apresentarToast('Usuário cadastrado com sucesso!', 'success');

      // Redireciona para a página de investidor
      this.router.navigate(['/investidor']);
    } catch (erro) {
      // Exibe mensagem de erro em caso de falha no registro
      this.apresentarToast('Erro ao cadastrar: ' + erro);
    }
  }
}
