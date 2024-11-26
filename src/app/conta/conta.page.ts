import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'; // Importando o ToastController

interface Conta {
  nome: string;
  saldo: number;
  icone?: string;
}

@Component({
  selector: 'app-contas',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {
  contas: Conta[] = []; // Lista de contas
  receitas: any[] = []; // Lista de receitas
  totalContas: number = 0; // Total das contas
  totalReceitas: number = 0; // Total das receitas
  saldoAtual: number = 0; // Saldo atual (receitas - despesas)

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    this.carregarContas();
    this.carregarReceitas();
  }

  ionViewWillEnter() {
    this.carregarContas();
    this.carregarReceitas();
  }

  // Carregar contas do localStorage
  carregarContas() {
    const contasSalvas = JSON.parse(localStorage.getItem('contas') || '[]');
    this.contas = contasSalvas;
    this.calcularTotalContas();
  }

  // Carregar receitas do localStorage
  carregarReceitas() {
    const receitasSalvas = JSON.parse(localStorage.getItem('receitas') || '[]');
    this.receitas = receitasSalvas;
    this.calcularTotalReceitas();
  }

  // Calcular o total das contas
  calcularTotalContas() {
    this.totalContas = this.contas.reduce((total, conta) => total + conta.saldo, 0);
    this.calcularSaldoAtual(); // Atualiza o saldo atual
  }

  // Calcular o total das receitas
  calcularTotalReceitas() {
    this.totalReceitas = this.receitas.reduce(
      (total, receita) => total + (receita.valor || 0),
      0
    );
    this.calcularSaldoAtual(); // Atualiza o saldo atual
  }

  // Calcular o saldo atual (receitas - despesas)
  calcularSaldoAtual() {
    this.saldoAtual = this.totalReceitas - this.totalContas;
  }

  // Função para exibir o Toast
  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color, // Cor do toast: sucesso (verde) ou erro (vermelho)
      position: 'top', // Posição do toast
    });
    toast.present();
  }

  // Salvar as contas no localStorage
  salvarContas() {
    localStorage.setItem('contas', JSON.stringify(this.contas));
    this.calcularTotalContas(); // Atualiza o total das contas e saldo atual
  }

  // Adicionar uma nova conta
  adicionarConta() {
    const nome = prompt('Digite o nome da conta');
    const saldo = prompt('Digite o saldo da conta');

    if (nome && saldo) {
      const novaConta: Conta = {
        nome: nome,
        saldo: parseFloat(saldo),
      };

      this.contas.push(novaConta);
      this.salvarContas(); // Salva as contas atualizadas no localStorage

      // Atualiza o total de contas e saldo atual
      this.calcularTotalContas();

      // Exibe uma mensagem de sucesso usando Toast
      this.showToast('Conta adicionada com sucesso!', 'success');
    } else {
      // Exibe uma mensagem de erro usando Toast
      this.showToast('Por favor, preencha todos os campos!', 'danger');
    }
  }

  // Editar uma conta
  editarConta(index: number) {
    const conta = this.contas[index];
    const novoNome = prompt('Digite o novo nome da conta', conta.nome);
    const novoSaldo = prompt('Digite o novo saldo da conta', conta.saldo.toString());

    if (novoNome && novoSaldo) {
      conta.nome = novoNome;
      conta.saldo = parseFloat(novoSaldo);

      this.contas[index] = conta;
      this.salvarContas(); // Salva as contas atualizadas no localStorage

      // Atualiza o total de contas e saldo atual
      this.calcularTotalContas();

      // Exibe uma mensagem de sucesso usando Toast
      this.showToast('Conta atualizada com sucesso!', 'success');
    } else {
      // Exibe uma mensagem de erro usando Toast
      this.showToast('Por favor, preencha todos os campos!', 'danger');
    }
  }

  // Excluir uma conta
  excluirConta(index: number) {
    const confirmar = confirm('Tem certeza que deseja excluir esta conta?');

    if (confirmar) {
      this.contas.splice(index, 1);
      this.salvarContas(); // Salva as contas atualizadas no localStorage

      // Atualiza o total de contas e saldo atual
      this.calcularTotalContas();

      // Exibe uma mensagem de sucesso usando Toast
      this.showToast('Conta excluída com sucesso!', 'success');
    } else {
      // Exibe uma mensagem de cancelamento usando Toast
      this.showToast('Exclusão cancelada.', 'danger');
    }
  }
}
