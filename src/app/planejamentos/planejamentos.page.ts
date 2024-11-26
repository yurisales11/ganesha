import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-planejamentos',
  templateUrl: './planejamentos.page.html',
  styleUrls: ['./planejamentos.page.scss'],
})
export class PlanejamentosPage implements OnInit {
  planejamentos: any[] = []; // Lista de planejamentos

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.carregarPlanejamentos();
  }

  ionViewWillEnter() {
    this.carregarPlanejamentos();
  }

  // Carregar os planejamentos do localStorage
  carregarPlanejamentos() {
    const planejamentosSalvos = localStorage.getItem('planejamentos');
    this.planejamentos = planejamentosSalvos ? JSON.parse(planejamentosSalvos) : [];
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

  // Função para editar um planejamento
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

    // Exibe um toast informando que o planejamento está sendo editado
    this.showToast('Planejamento editado!', 'success');
  }

  // Função para excluir um planejamento
  excluirPlanejamento(i: number) {
    const planejamento = this.planejamentos[i];
    const planejamentos = [...this.planejamentos];
    planejamentos.splice(i, 1); // Remove o planejamento selecionado
    localStorage.setItem('planejamentos', JSON.stringify(planejamentos)); // Atualiza o localStorage
    this.carregarPlanejamentos(); // Atualiza a lista de planejamentos no componente

    // Exibe um toast de sucesso após excluir
    this.showToast('Planejamento excluído com sucesso!', 'success');
  }
}
