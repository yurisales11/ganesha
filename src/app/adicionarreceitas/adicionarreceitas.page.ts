import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importando o ToastController

@Component({
  selector: 'app-adicionarreceitas', // Mantém o seletor apropriado
  templateUrl: './adicionarreceitas.page.html',
  styleUrls: ['./adicionarreceitas.page.scss'],
})
export class AdicionarreceitasPage {
  selectedIcon: string | null = null; // Ícone selecionado pelo usuário
  showIconModal: boolean = false; // Controle do modal
  icons: string[] = [
    'cash-outline',        // Dinheiro
    'wallet-outline',      // Carteira
    'card-outline',        // Cartão de crédito
   
  
    'business-outline',    // Empresa
   
  
    'cash-sharp',          // Dinheiro (versão com bordas mais nítidas)
    'wallet-sharp',        // Carteira (versão com bordas mais nítidas)
    'trending-up-outline', // Gráfico crescente
    'analytics-outline',   // Análise (gráfico)
    'bar-chart-outline',   // Gráfico de barras
    'pie-chart-outline',   // Gráfico de pizza
    'calculator-outline',  // Calculadora
    'receipt-outline',     // Recibo
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

  adicionarReceita(nome: any, valor: any) {
    const nomeReceita = String(nome || '').trim(); // Garante que seja uma string e remove espaços
    const valorReceita = parseFloat(String(valor || '0')); // Converte o valor para número

    // Recupera o saldo atual do localStorage ou de algum serviço
    let saldoAtual = parseFloat(localStorage.getItem('saldo') || '0'); // Verificando o saldo

    // Log para verificar os valores de saldoAtual e valorReceita
    console.log('Saldo Atual:', saldoAtual);
    console.log('Valor da Receita:', valorReceita);

    // Se o valor da receita for negativo ou zero, retornamos um erro
    if (valorReceita <= 0) {
      this.showToast('Por favor, insira um valor positivo para a receita.', 'danger');
      return;
    }

    // Validações
    if (!nomeReceita) {
      this.showToast('Por favor, preencha o nome da receita.', 'danger');
      return;
    }

    if (!this.selectedIcon) {
      this.showToast('Por favor, selecione um ícone.', 'danger');
      return;
    }

 

    const novaReceita = {
      nome: nomeReceita,
      icone: this.selectedIcon,
      valor: valorReceita,
    };

    // Salvar no localStorage
    const receitas = JSON.parse(localStorage.getItem('receitas') || '[]');
    receitas.push(novaReceita);
    localStorage.setItem('receitas', JSON.stringify(receitas));

    // Atualiza o saldo após a criação da receita
    saldoAtual -= valorReceita;
    localStorage.setItem('saldo', saldoAtual.toFixed(2)); // Atualiza saldo com 2 casas decimais

    // Exibe um toast de sucesso
    this.showToast('Receita adicionada com sucesso!', 'success');

    // Redirecionar para a página "receitas"
    this.router.navigate(['/receitas']).then(() => {
      // Após redirecionar, recarregar os dados de receitas na página de destino
      window.location.reload();
    });
  }
}
