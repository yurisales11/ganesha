import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionarplanejamentos',
  templateUrl: './adicionarplanejamentos.page.html',
  styleUrls: ['./adicionarplanejamentos.page.scss'],
})
export class AdicionarplanejamentosPage implements OnInit {
  selectedIcon: string | null = null; // Ícone selecionado pelo usuário
  showIconModal: boolean = false; // Controle do modal

  // Lista de ícones para seleção
  icons: string[] = [
    'home-outline',
    'wallet-outline',
    'car-outline',
    'cart-outline',
    'game-controller-outline',
    'pizza-outline',
    'gift-outline',
    'heart-outline',
    'train-outline',
    'airplane-outline',
    'cash-outline',
    'leaf-outline',
  ];

  // Dados do formulário
  nomeConta: string = '';
  saldoAtual: number = 0;
  saldoObjetivo: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {}

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
    if (!this.nomeConta || !this.saldoObjetivo || !this.selectedIcon) {
      alert('Preencha todos os campos!');
      return;
    }

    // Carrega planejamentos existentes do localStorage
    const planejamentos = JSON.parse(localStorage.getItem('planejamentos') || '[]');

    // Adiciona o novo planejamento
    planejamentos.push({
      nome: this.nomeConta,
      saldoAtual: this.saldoAtual,
      saldoObjetivo: this.saldoObjetivo,
      icon: this.selectedIcon,
    });

    // Salva no localStorage
    localStorage.setItem('planejamentos', JSON.stringify(planejamentos));

    // Redireciona para a página de planejamentos
    this.router.navigate(['/planejamentos']).then(() => {
      // Atualiza os planejamentos ao redirecionar
      window.location.reload();  // Força o recarregamento da página para mostrar as alterações
    });
  }
}
