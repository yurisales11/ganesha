import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  mesSelecionado: Date = new Date();
  saldoAtual: any = [];
  despesas: any[] = [];
  receitas: any[] = [];
  mostrarCards = false; 
  perfilSelecionado: string = '';
  public categories: Array<{ label: string, currentBalance: number, targetValue: number, progress: number }> = [];


  constructor(private router: Router) {}

  // Funções para avançar e voltar meses
  previousMonth() {
    this.mesSelecionado = new Date(this.mesSelecionado.setMonth(this.mesSelecionado.getMonth() - 1));
  }

  nextMonth() {
    this.mesSelecionado = new Date(this.mesSelecionado.setMonth(this.mesSelecionado.getMonth() + 1));
  }
  calcularTotalDespesas(): number {
    return this.despesas.reduce((acc, despesa) => acc + (despesa.valor || 0), 0);
  }
  
  calcularTotalReceitas(): number {
    return this.receitas.reduce((acc, receita) => acc + (receita.valor || 0), 0);
  }

  adicionarDespesa() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Adicionar Despesa';
    alert.inputs = [
      {
        name: 'nome',
        type: 'text',
        placeholder: 'Nome da Despesa',
        attributes: {
          required: true,
        }
      },
      {
        name: 'valor',
        type: 'number',
        placeholder: 'Valor da Despesa',
        attributes: {
          required: true,
          min: 0
        }
      },
    ];
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Adicionar',
        handler: (data) => {
          // Validação para garantir que os campos não estão vazios ou incorretos
          if (data.nome.trim() && !isNaN(data.valor)) {
            // Verifica se já existe um nome duplicado na lista de despesas
            const nomeExistente = this.despesas.find(despesa => despesa.nome === data.nome.trim());
            if (!nomeExistente) {
              this.despesas.push({
                nome: data.nome.trim(),
                valor: Number(data.valor), // Garante que o valor seja numérico
              });
            } else {
              this.showAlert('Essa despesa já foi adicionada. Escolha outro nome.');
            }
          } else {
            this.showAlert('Por favor, preencha todos os campos corretamente.');
          }
        }
      },
    ];
  
    document.body.appendChild(alert);
    return alert.present();
  }
  
  

  adicionarReceita() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Adicionar Receita';
    alert.inputs = [
      {
        name: 'nome',
        type: 'text',
        placeholder: 'Nome da Receita',
        attributes: {
          required: true,
        }
      },
      {
        name: 'valor',
        type: 'number',
        placeholder: 'Valor da Receita',
        attributes: {
          required: true,
          min: 0
        }
      },
    ];
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Adicionar',
        handler: (data) => {
          // Validação para garantir que os campos não estão vazios ou incorretos
          if (data.nome.trim() && !isNaN(data.valor)) {
            // Verifica se já existe um nome duplicado na lista de receitas
            const nomeExistente = this.receitas.find(receita => receita.nome === data.nome.trim());
            if (!nomeExistente) {
              this.receitas.push({
                nome: data.nome.trim(),
                valor: Number(data.valor), // Garante que o valor seja numérico
              });
            } else {
              this.showAlert('Essa receita já foi adicionada. Escolha outro nome.');
            }
          } else {
            this.showAlert('Por favor, preencha todos os campos corretamente.');
          }
        }
      },
    ];
  
    document.body.appendChild(alert);
    return alert.present();
  }
  excluirDespesa(index: number) {
    this.despesas.splice(index, 1);
  }

  excluirReceita(index: number) {
    this.receitas.splice(index, 1);
  }

  calcularSaldoPrevisto() {
    const totalDespesas = this.despesas.reduce((acc, item) => acc + (item.valor || 0), 0);
    const totalReceitas = this.receitas.reduce((acc, item) => acc + (item.valor || 0), 0);
    return this.saldoAtual + totalReceitas - totalDespesas;
  }

  // Métodos para gerenciar categorias
  selecionarPerfil(perfil: string) {
    this.perfilSelecionado = perfil;
  }

  // Método para apresentar o alerta para editar o valor e o rótulo
  presentEditAlert(index: number) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Editar Categoria';
    alert.inputs = [
      {
        name: 'label',
        type: 'text',
        placeholder: 'Planejamento',
        value: this.categories[index].label,
      },
      {
        name: 'currentBalance',
        type: 'number',
        placeholder: 'Saldo Atual',
        value: this.categories[index].currentBalance.toString(),
      },
      {
        name: 'targetValue',
        type: 'number',
        placeholder: 'Planejamento',
        value: this.categories[index].targetValue.toString(),
      },
    ];
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Salvar',
        handler: (data) => {
          this.updateCategoryDetails(index, data.currentBalance, data.targetValue, data.label);
        },
      },
    ];

    document.body.appendChild(alert);
    return alert.present();
  }

  // Função que calcula o progresso quando ambos os valores são preenchidos
updateCategoryDetails(index: number, currentBalance: number, targetValue: number, newLabel: string) {
  if (newLabel) {
    this.categories[index].label = newLabel;
  }

  if (currentBalance !== null && targetValue !== null) {
    this.categories[index].currentBalance = currentBalance;
    this.categories[index].targetValue = targetValue;

    // Cálculo da porcentagem de progresso apenas se ambos os valores estiverem definidos
    if (targetValue > 0) {
      const progressPercentage = (currentBalance / targetValue) * 100;
      this.categories[index].progress = Math.min(progressPercentage, 100);
    }
  }
}

  // Método para mostrar alertas
  showAlert(message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Atenção';
    alert.message = message;
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    return alert.present();
  }

  adicionarCategoria() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Adicionar Planejamento';
    alert.backdropDismiss = false; // Impede o desfoque ao focar em um input
    alert.inputs = [
      {
        name: 'label',
        type: 'text',
        placeholder: 'Planejamento',
        attributes: {
          required: true, // Certifica-se de que este campo seja obrigatório
        }
      },
      {
        name: 'currentBalance',
        type: 'number',
        placeholder: 'Saldo Atual',
        attributes: {
          required: true, // Certifica-se de que este campo seja obrigatório
          min: 0
        }
      },
      {
        name: 'targetValue',
        type: 'number',
        placeholder: 'Valor de Planejamento',
        attributes: {
          required: true, // Certifica-se de que este campo seja obrigatório
          min: 1
        }
      },
    ];
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Adicionar',
        handler: (data) => {
          // Validação para garantir que os campos não estão vazios ou incorretos
          if (data.label.trim() && !isNaN(data.currentBalance) && !isNaN(data.targetValue)) {
            const currentBalance = Number(data.currentBalance);
            const targetValue = Number(data.targetValue);
  
            // Calcular a porcentagem de progresso com base no saldo atual e no valor planejado
            const progressPercentage = (currentBalance / targetValue) * 100;
  
            this.categories.push({
              label: data.label.trim(), // Remove espaços extras
              currentBalance: currentBalance, // Garante que o valor seja numérico
              targetValue: targetValue, // Garante que o valor seja numérico
              progress: Math.min(progressPercentage, 100), // Limita a 100% o progresso
            });
          } else {
            this.showAlert('Por favor, preencha todos os campos corretamente.');
          }
        },
      },
    ];
  
    document.body.appendChild(alert);
    return alert.present();
  }
  
  
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
}