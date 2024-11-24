import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {
  totalContas: number = 0;
  saldoGeral: number = 0;
  isSaldoVisivel: boolean = false;
  mesSelecionado: Date = new Date();
  fotoAvatar: string | null = null;

  constructor() {}

  ngOnInit() {
    this.carregarFotoAvatar();
    this.carregarDados();  // Carrega saldo e contas
    this.ouvirMudancasNoLocalStorage();
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.atualizarAvatarAoMudarLocalStorage.bind(this));
  }

  carregarFotoAvatar() {
    const fotoSalva = localStorage.getItem('fotoAvatar');
    this.fotoAvatar = fotoSalva;
  }

  selecionarImagem() {
    const uploadElement = document.getElementById('uploadAvatar') as HTMLElement;
    uploadElement.click();
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



  
  // Funções para avançar e voltar meses
  previousMonth() {
    this.mesSelecionado = new Date(this.mesSelecionado.setMonth(this.mesSelecionado.getMonth() - 1));
  }

  nextMonth() {
    this.mesSelecionado = new Date(this.mesSelecionado.setMonth(this.mesSelecionado.getMonth() + 1));
  }

  carregarDados() {
   // const contas: Conta[] = JSON.parse(localStorage.getItem('contas') || '[]');
    
   // this.totalContas = contas.length;
  //  this.saldoGeral = contas.reduce((total, conta) => total + (conta.saldo || 0), 0);
  }

  alternarVisibilidadeSaldo() {
    this.isSaldoVisivel = !this.isSaldoVisivel;
  }


  
}
