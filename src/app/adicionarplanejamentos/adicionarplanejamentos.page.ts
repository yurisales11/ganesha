import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importando o ToastController

@Component({
  selector: 'app-adicionarplanejamentos',
  templateUrl: './adicionarplanejamentos.page.html',
  styleUrls: ['./adicionarplanejamentos.page.scss'],
})
export class AdicionarplanejamentosPage implements OnInit {
  selectedIcon: string | null = null; // Ícone selecionado pelo usuário
  showIconModal: boolean = false; // Controle do modal

  icons: string[] = [
    'calendar-outline',      // Calendário
    'checkmark-circle-outline', // Marca de verificação
    'clipboard-outline',     // Clipboard (prancheta)
    'book-outline',          // Livro (representa planejamento ou diário)
    'alarm-outline',         // Alarme (para indicar prazos ou lembretes)
    'timer-outline',         // Temporizador
    'timer-sharp',           // Temporizador (com bordas mais nítidas)
    'desktop-outline',       // Computador de mesa (planejamento digital)
    'grid-outline',          // Grade (representa organização)
    'analytics-outline',     // Análise (para representar progresso)
    'list-outline',          // Lista
    'clipboard-sharp',       // Clipboard (com bordas mais nítidas)
 
];


  // Dados do formulário
  nomeConta: string = '';
  saldoAtual: number = 0;
  saldoObjetivo: number = 0;

  constructor(private router: Router, private toastController: ToastController) {}

  ngOnInit() {}

  // Função para exibir o Toast
  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color, // Cor do toast: sucesso (verde) ou erro (vermelho)
      position: 'top' // Posição do toast
    });
    toast.present();
  }

  // Abre o modal de seleção de ícones
  openIconModal() {
    this.showIconModal = true;
  }

  // Fecha o modal
  closeIconModal() {
    this.showIconModal = false;
  }

  // Seleciona um ícone
  selectIcon(icon: string) {
    this.selectedIcon = icon;
    this.closeIconModal();
  }

  // Salva o planejamento e redireciona
  criarPlanejamento() {
    if (!this.nomeConta || !this.saldoObjetivo || this.saldoObjetivo <= 0 || !this.selectedIcon) {
      // Exibe um toast de erro se os campos não forem preenchidos corretamente
      this.showToast('Preencha todos os campos corretamente!', 'danger');
      return;
    }

    // Calcula o progresso e o saldo restante
    const progresso = (this.saldoAtual / this.saldoObjetivo) * 100;
    const restante = this.saldoObjetivo - this.saldoAtual;

    // Carrega planejamentos existentes do localStorage
    const planejamentos = JSON.parse(localStorage.getItem('planejamentos') || '[]');

    // Adiciona o novo planejamento
    planejamentos.push({
      nome: this.nomeConta,
      saldoAtual: this.saldoAtual, // Inclui o saldo atual do usuário
      saldoObjetivo: this.saldoObjetivo, // Inclui o saldo objetivo
      progresso: Math.min(progresso, 100), // Garante que o progresso não ultrapasse 100%
      restante: restante > 0 ? restante : 0, // Evita valores negativos para restante
      icon: this.selectedIcon,
    });

    // Salva no localStorage
    localStorage.setItem('planejamentos', JSON.stringify(planejamentos));

    // Exibe um toast de sucesso
    this.showToast('Planejamento criado com sucesso!', 'success');

    // Redireciona para a página de planejamentos e carrega os dados atualizados
    this.router.navigate(['/planejamentos']).then(() => {
      // Opcional: Caso queira recarregar os dados após a navegação
      window.location.reload();
    });
  }
}
