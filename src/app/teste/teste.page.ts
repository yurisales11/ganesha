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
interface Artigo {
  id: number;
  titulo: string;
  resumo: string;
  imagemUrl: string; // URL da imagem do artigo
  title: string;
  url: string; // URL para redirecionamento
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
  artigos: Artigo[] = []; // Para armazenar os artigos

  

  constructor(private cdRef: ChangeDetectorRef) {}

  abrirArtigo(url: string) {
    window.open(url, '_blank');  // Abre a URL em uma nova aba
  }

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
    this.carregarArtigos();
  }

  
  

  ngOnDestroy() {
    // Remove o listener ao destruir o componente
    window.removeEventListener('storage', this.atualizarDados.bind(this));
  }


  carregarArtigos() {
    this.artigos = [
      {
        title: 'Dica 01',
        id: 1,
        titulo: 'Dicas de Finanças Pessoais',
        resumo: 'Aprenda como gerenciar melhor suas finanças com estas dicas incríveis.',
        imagemUrl: 'assets/1.png',
        url: 'https://www.hostinger.com.br/tutoriais/como-ganhar-dinheiro-na-internet' // URL do artigo
      },
      {
        title: 'Dica 02',
        id: 2,
        titulo: 'Os segredos para o sucesso',
        resumo: 'Descubra os segredos para sua liberdade financeira.',
        imagemUrl: 'assets/2.png',
        url: 'https://www.agendor.com.br/blog/qual-o-segredo-do-sucesso/' // URL do artigo
      },
      {
        title: 'Dica 03',
        id: 3,
        titulo: 'Mentalidade de Investidor',
        resumo: 'Aprenda os conceitos que vem mudando a mente dos investidores.',
        imagemUrl: 'assets/3.png',
        url: 'https://meusucesso.com/noticias/mentalidade-de-um-investidor-de-sucesso-7497/' // URL do artigo
      },
      {
        title: 'Dica 04',
        id: 4,
        titulo: 'Novidades Tecnológicas',
        resumo: 'Fique por dentro das novidades do mundo tecnológico.',
        imagemUrl: 'assets/4.png',
        url: 'https://ascenty.com/blog/artigos/financas-4-0/' // URL do artigo
      }
    ];
  }

  // Método para abrir detalhes do artigo
  


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
