import { Component } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  email: string = '';
  senha: string = '';
  login: string = '';  // Aqui o login será usado como nome do usuário
  confirmarSenha: string = '';

  constructor(private registroService: RegistroService, private router: Router) {}

  async cadastrar() {
    // Verifica se as senhas coincidem
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      // Chama o serviço para registrar o usuário com o email e senha
      await this.registroService.registrar(this.email, this.senha);
      
      // Após o cadastro, salva o nome do usuário (login) e a senha no localStorage
      localStorage.setItem('usuarioNome', this.login);  // Salva o nome do usuário no localStorage
      localStorage.setItem('usuarioSenha', this.senha);  // Salva a senha no localStorage (não recomendado para produção)

      alert('Usuário cadastrado com sucesso!');
      this.router.navigate(['/teste']);  // Redireciona para a página do usuário (ou login)
    } catch (erro) {
      alert('Erro ao cadastrar: ' + erro);
    }
  }
}
