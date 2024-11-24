import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planejamentos',
  templateUrl: './planejamentos.page.html',
  styleUrls: ['./planejamentos.page.scss'],
})
export class PlanejamentosPage implements OnInit {
  planejamentos: any[] = []; // Lista de planejamentos
  totalPlanejamentos: number = 0; // Total de planejamentos

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarPlanejamentos();
    
  }

  carregarPlanejamentos() {
    const planejamentosSalvos = localStorage.getItem('planejamentos');
    this.planejamentos = planejamentosSalvos ? JSON.parse(planejamentosSalvos) : [];
  }

  calcularProgresso(saldoAtual: number, saldoObjetivo: number): number {
    return Math.min((saldoAtual / saldoObjetivo) * 100, 100); // Limita a 100%
  }

  editarPlanejamento(i: number) {
    const planejamento = this.planejamentos[i];
    // Redireciona para a página de adicionar planejamento passando os dados
    this.router.navigate(['/adicionarplanejamentos'], {
      queryParams: {
        nome: planejamento.nome,
        saldoAtual: planejamento.saldoAtual,
        saldoObjetivo: planejamento.saldoObjetivo,
        icon: planejamento.icon,
      },
    });
  }

  excluirPlanejamento(i: number) {
    const planejamentos = [...this.planejamentos];
    planejamentos.splice(i, 1); // Remove o planejamento selecionado
    localStorage.setItem('planejamentos', JSON.stringify(planejamentos)); // Atualiza o localStorage
    this.carregarPlanejamentos(); // Atualiza a lista de planejamentos no componente
  }
}
