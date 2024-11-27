import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

interface Conta {
  nome: string;
  saldo: number;
  icone?: string;
}

interface Planejamento {
  nome: string; // Nome do planejamento
  progresso: number; // Porcentagem concluída
  restante: number; // Saldo restante para conclusão
}

interface Receita {
  nome: string;
  valor: number;
  icone?: string;
}

@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit, OnDestroy {
  totalContas: number = 0;
  contas: Conta[] = []; // Armazena as contas do localStorage
  saldoGeral: number = 0;
  isSaldoVisivel: boolean = false; // Controle de visibilidade do saldo
  mesSelecionado: Date = new Date();
  fotoAvatar: string | null = null;
  usuarioNome: string | null = '';
  totalReceitas: number = 0; // Soma total das receitas
  saldoAtual: number = 0; // Saldo atual calculado (receitas - despesas)
  receitas: Receita[] = []; // Armazena receitas do localStorage
  planejamentos: Planejamento[] = [];
  saldoVisivel: boolean = true; // Inicialmente o saldo está visível

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarFotoAvatar();
    this.carregarContas();
    this.carregarReceitas();
    this.carregarPlanejamentos();
    this.usuarioNome = localStorage.getItem('usuarioNome');
    console.log('Nome do usuário carregado:', this.usuarioNome);  // Verifique se está carregando corretamente
    this.cdRef.detectChanges(); // Força a detecção de mudanças, se necessário
    this.ouvirMudancasNoLocalStorage(); // Inicia o listener para mudanças no localStorage
    this.calcularSaldoAtual();
  }

  ngOnDestroy() {
    // Remove o listener ao destruir o componente
    window.removeEventListener('storage', this.atualizarDados.bind(this));
  }

  // Método para recarregar todos os dados
  atualizarDados(event?: StorageEvent) {
    if (event) {
      console.log(`Alteração detectada no localStorage: ${event.key}`);
    }
    // Recarregar as informações do localStorage
    this.carregarFotoAvatar();
    this.carregarContas();
    this.carregarReceitas();
    this.carregarPlanejamentos();
    this.calcularSaldoAtual();
    this.cdRef.detectChanges(); // Garante que as alterações sejam refletidas na interface
  }

  // Método para ouvir mudanças no localStorage
  ouvirMudancasNoLocalStorage() {
    // Adiciona um listener para o evento de mudança no localStorage
    window.addEventListener('storage', this.atualizarDados.bind(this));
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

  // Método para carregar contas
  carregarContas() {
    const contasSalvas = JSON.parse(localStorage.getItem('contas') || '[]');
    this.contas = contasSalvas;

    console.log('Contas Carregadas:', this.contas); // Verifique se as contas estão sendo carregadas corretamente

    // Calcula o total de contas somando os saldos
    this.totalContas = this.contas.reduce(
      (total, conta) => total + (conta.saldo || 0),
      0
    );
    console.log('Total Contas:', this.totalContas); // Verifique se o total de contas está correto

    this.calcularSaldoAtual(); // Recalcular o saldo após carregar as contas
  }

  // Carregar receitas do localStorage
  carregarReceitas() {
    const receitasSalvas = JSON.parse(localStorage.getItem('receitas') || '[]');
    this.receitas = receitasSalvas;

    console.log('Receitas Carregadas:', this.receitas); // Verifique se as receitas estão sendo carregadas corretamente

    // Calcula o total de receitas somando os valores
    this.totalReceitas = this.receitas.reduce(
      (total, receita) => total + (receita.valor || 0),
      0
    );
    console.log('Total Receitas:', this.totalReceitas); // Verifique se o total de receitas está correto

    this.calcularSaldoAtual(); // Recalcular o saldo após carregar as receitas
  }

  // Método para calcular o saldo atual (receitas - despesas)
  calcularSaldoAtual() {
    this.saldoAtual = this.totalReceitas - this.totalContas;
    console.log('Saldo Atual:', this.saldoAtual);
    this.cdRef.detectChanges(); // Força a detecção de mudanças
  }

  // Funções para avançar e voltar meses
  previousMonth() {
    this.mesSelecionado = new Date(this.mesSelecionado.setMonth(this.mesSelecionado.getMonth() - 1));
  }

  nextMonth() {
    this.mesSelecionado = new Date(this.mesSelecionado.setMonth(this.mesSelecionado.getMonth() + 1));
  }

  // Método para alternar a visibilidade do saldo
  alternarVisibilidade() {
    this.saldoVisivel = !this.saldoVisivel;
  }

  carregarPlanejamentos() {
    const planejamentosSalvos: Planejamento[] = JSON.parse(localStorage.getItem('planejamentos') || '[]');
    this.planejamentos = planejamentosSalvos.map((p: Planejamento) => ({
      ...p,
      restante: p.restante !== undefined ? p.restante : 0 // Garante que o campo "restante" exista
    }));

    console.log('Planejamentos Carregados:', this.planejamentos); // Confirme os dados
  }
}
