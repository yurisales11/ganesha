import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionarcontas',
  templateUrl: './adicionarcontas.page.html',
  styleUrls: ['./adicionarcontas.page.scss'],
})
export class AdicionarcontasPage {
  selectedIcon: string | null = null; // Ícone selecionado pelo usuário
  showIconModal: boolean = false; // Controle do modal
  icons: string[] = [
    'home-outline', 'wallet-outline', 'car-outline', 'cart-outline', 'game-controller-outline',
    'pizza-outline', 'gift-outline', 'heart-outline', 'train-outline', 'airplane-outline',
    'cash-outline', 'leaf-outline',
  ];

  constructor(private router: Router) {}

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

  adicionarConta(nome: any, saldo: any) {
    const nomeConta = String(nome || '').trim(); // Garante que seja uma string e remove espaços
    const saldoConta = parseFloat(String(saldo || '0')); // Converte o saldo para número
  
    // Validações
    if (!nomeConta) {
      alert('Por favor, preencha o nome da conta.');
      return;
    }
  
    if (!this.selectedIcon) {
      alert('Por favor, selecione um ícone.');
      return;
    }
  
    if (isNaN(saldoConta)) {
      alert('Por favor, insira um saldo válido.');
      return;
    }
  
    const novaConta = {
      nome: nomeConta,
      icone: this.selectedIcon,
      saldo: saldoConta,
    };
  
    // Salvar no localStorage
    const contas = JSON.parse(localStorage.getItem('contas') || '[]');
    contas.push(novaConta);
    localStorage.setItem('contas', JSON.stringify(contas));
  
    // Redirecionar para a página "conta"
    this.router.navigate(['/conta']).then(() => {
      // Após redirecionar, recarregar os dados de contas na página de destino
      window.location.reload();
    });
  }
}
