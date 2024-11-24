import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {
  contas: any[] = [];

  constructor() {}

  ngOnInit() {
    // Carregar contas quando a página for inicializada
    this.carregarContas();
  }

  ionViewWillEnter() {
    // Recarregar contas sempre que a página for exibida
    this.carregarContas();
  }

  carregarContas() {
    const contasSalvas = JSON.parse(localStorage.getItem('contas') || '[]');
    this.contas = contasSalvas;
  }

  // Função para editar uma conta
  editarConta(index: number) {
    const conta = this.contas[index];
    const novoNome = prompt("Digite o novo nome da conta", conta.nome);
    const novoSaldo = prompt("Digite o novo saldo da conta", conta.saldo.toString());
    const novoIcone = prompt("Digite o novo ícone da conta", conta.icone);

    if (novoNome && novoSaldo && novoIcone) {
      conta.nome = novoNome;
      conta.saldo = parseFloat(novoSaldo);
      conta.icone = novoIcone;

      // Atualiza o array de contas e salva novamente no localStorage
      this.contas[index] = conta;
      localStorage.setItem('contas', JSON.stringify(this.contas));
    }
  }

  // Função para excluir uma conta
  excluirConta(index: number) {
    if (confirm("Tem certeza que deseja excluir esta conta?")) {
      this.contas.splice(index, 1); // Remove a conta do array

      // Atualiza o localStorage
      localStorage.setItem('contas', JSON.stringify(this.contas));
    }
  }
}
