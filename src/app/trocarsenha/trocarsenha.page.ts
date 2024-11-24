import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trocarsenha',
  templateUrl: './trocarsenha.page.html',
  styleUrls: ['./trocarsenha.page.scss'],
})
export class TrocarsenhaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Campos do formulário
  pais: string = '';
  telefone: string = '';
  email: string = '';
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';

  // Avatar
  fotoAvatar: string | null = null;

  // Visibilidade de troca de senha
  showChangePassword = false;



  // Alternar visibilidade do campo de troca de senha
  toggleChangePassword() {
    this.showChangePassword = !this.showChangePassword;
  }

  // Atualizar avatar do usuário
  selecionarImagem() {
    const input = document.getElementById('uploadAvatar') as HTMLInputElement;
    input.click();
  }

  atualizarAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoAvatar = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Salvar Alterações
  salvarAlteracoes() {
    if (this.showChangePassword && this.novaSenha !== this.confirmarNovaSenha) {
      alert('As novas senhas não coincidem!');
      return;
    }

    // Lógica para salvar todas as alterações
    console.log('País:', this.pais);
    console.log('Telefone:', this.telefone);
    console.log('Email:', this.email);
    console.log('Senha Atual:', this.senhaAtual);
    console.log('Nova Senha:', this.novaSenha);
    alert('Alterações salvas com sucesso!');
  }
}

