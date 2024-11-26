import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importando o ToastController

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

  constructor(private router: Router, private toastController: ToastController) {}

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

  adicionarConta(nome: any, saldo: any) {
    const nomeConta = String(nome || '').trim(); // Garante que seja uma string e remove espaços
    const saldoConta = parseFloat(String(saldo || '0')); // Converte o saldo para número
  
    // Validações
    if (!nomeConta) {
      this.showToast('Por favor, preencha o nome da conta.', 'danger');
      return;
    }
  
    if (!this.selectedIcon) {
      this.showToast('Por favor, selecione um ícone.', 'danger');
      return;
    }
  
    if (isNaN(saldoConta)) {
      this.showToast('Por favor, insira um saldo válido.', 'danger');
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
  
    // Exibe um toast de sucesso
    this.showToast('Conta adicionada com sucesso!', 'success');

    // Redirecionar para a página "conta"
    this.router.navigate(['/conta']).then(() => {
      // Após redirecionar, recarregar os dados de contas na página de destino
      window.location.reload();
    });
  }
}
