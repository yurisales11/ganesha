import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  constructor(private router: Router, private toastController: ToastController) {}

  // Variáveis do formulário
  pais: string = '';
  telefone: string = '';
  email: string | null = '';
  usuarioNome: string | null = '';
  investorProfile: string | null = '';
  fotoAvatar: string | null = '';
// Variáveis do formulário

usuarioNomeEditando: string | null = ''; // Nome durante a edição
editandoNome: boolean = false; // Controle de edição do nome


  // Alterna entre editar e salvar o nome
   // Alterna entre editar e salvar o nome
   toggleEditarNome(salvar: boolean = false) {
    if (salvar) {
      // Verifica se o nome foi alterado antes de salvar
      if (this.usuarioNomeEditando && this.usuarioNomeEditando !== this.usuarioNome) {
        this.usuarioNome = this.usuarioNomeEditando;
        localStorage.setItem('usuarioNome', this.usuarioNome);
        this.showToast('Nome atualizado com sucesso!', 'success');
      } else if (!this.usuarioNomeEditando) {
        this.showToast('Por favor, insira um nome válido.', 'danger');
      }
    }
    this.editandoNome = !this.editandoNome;
  }

    // Cancela a edição e restaura o nome original
    cancelarEdicao() {
      this.usuarioNomeEditando = this.usuarioNome; // Restaura o nome original
      this.editandoNome = false; // Sai do modo de edição
    }

 
  


  // Função para exibir o toast (já existe no seu código)


  ngOnInit() {
    this.carregarFotoAvatar();
    this.carregarDadosDoUsuario();
 
  }

  // Carrega o avatar salvo no localStorage
  carregarFotoAvatar() {
    this.fotoAvatar = localStorage.getItem('fotoAvatar');
  }

  // Carrega dados do usuário no localStorage
  carregarDadosDoUsuario() {
    this.usuarioNome = localStorage.getItem('usuarioNome');
    this.investorProfile = localStorage.getItem('investorProfile');
    this.email = localStorage.getItem('usuarioEmail');
    this.pais = localStorage.getItem('usuarioPais') || ''; // Caso não tenha, define como vazio
    this.telefone = localStorage.getItem('usuarioTelefone') || ''; // Caso não tenha, define como vazio
  }

  // Atualiza o avatar
  selecionarImagem() {
    const input = document.getElementById('uploadAvatar') as HTMLInputElement;
    input.click();
  }

  atualizarAvatar(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fotoBase64 = reader.result as string;
        localStorage.setItem('fotoAvatar', fotoBase64); // Salva no localStorage
        this.carregarFotoAvatar(); // Atualiza localmente
      };
      reader.readAsDataURL(file);
    }
  }

  // Salva as alterações no localStorage
  async salvarAlteracoes() {
    if (this.pais) {
      localStorage.setItem('usuarioPais', this.pais);
    }
    if (this.telefone) {
      localStorage.setItem('usuarioTelefone', this.telefone);
    }

    // Exibe o toast de sucesso
    this.showToast('Alterações salvas com sucesso!', 'success');
  }

  // Função para sair da conta (volta para a tela de login)
  sairDaConta() {
    this.router.navigate(['/login']); // Redireciona para a tela de login
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

  // Função para formatar o número de telefone
  formatarTelefone() {
    // Remove todos os caracteres não numéricos
    let telefoneFormatado = this.telefone.replace(/\D/g, '');

    // Aplica a formatação desejada (XXX) XXXXX-XXXX
    if (telefoneFormatado.length <= 2) {
      this.telefone = telefoneFormatado;
    } else if (telefoneFormatado.length <= 6) {
      this.telefone = `(${telefoneFormatado.slice(0, 2)}) ${telefoneFormatado.slice(2)}`;
    } else {
      this.telefone = `(${telefoneFormatado.slice(0, 2)}) ${telefoneFormatado.slice(2, 7)}-${telefoneFormatado.slice(7, 11)}`;
    }
  }
}
