
import { AvatarService } from '../services/avatar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor() { }
  ngOnInit() {
    this.carregarFotoAvatar();
    this.ouvirMudancasNoLocalStorage();
    this.usuarioNome = localStorage.getItem('usuarioNome');
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.atualizarAvatarAoMudarLocalStorage.bind(this));
  }
  // Campos do formulário
  pais: string = '';
  telefone: string = '';
  email: string = '';
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';
  usuarioNome: string | null = '';


  // Avatar
  fotoAvatar: string | null = null;

  // Visibilidade de troca de senha
  showChangePassword = false;

  


  // Alternar visibilidade do campo de troca de senha
  toggleChangePassword() {
    this.showChangePassword = !this.showChangePassword;
  }


  carregarFotoAvatar() {
    const fotoSalva = localStorage.getItem('fotoAvatar');
    this.fotoAvatar = fotoSalva;
  }

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

  ouvirMudancasNoLocalStorage() {
    window.addEventListener('storage', this.atualizarAvatarAoMudarLocalStorage.bind(this));
  }

  atualizarAvatarAoMudarLocalStorage(event: StorageEvent) {
    if (event.key === 'fotoAvatar') {
      this.carregarFotoAvatar(); // Recarrega a foto se ela for alterada
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