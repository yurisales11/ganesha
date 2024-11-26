import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'; // Importando o ToastController

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.page.html',
  styleUrls: ['./receitas.page.scss'],
})
export class ReceitasPage implements OnInit {
  receitas: any[] = []; // Lista de receitas
  totalReceitas: number = 0; // Total calculado das receitas

  constructor(private toastController: ToastController) {} // Injetando o ToastController

  ngOnInit() {
    this.carregarReceitas();
  }

  ionViewWillEnter() {
    this.carregarReceitas();
  }

  carregarReceitas() {
    const receitasSalvas = JSON.parse(localStorage.getItem('receitas') || '[]');
    this.receitas = receitasSalvas;

    // Calcula o total das receitas
    this.calcularTotal();
  }

  calcularTotal() {
    // Calcula o total das receitas somando o valor de cada uma
    this.totalReceitas = this.receitas.reduce(
      (total, receita) => total + (receita.valor || 0),
      0
    );
  }

  // Função para exibir Toast
  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color, // Define a cor do toast (success ou danger)
      position: 'top' // Posição do toast
    });
    toast.present();
  }

  adicionarReceita() {
    const nome = prompt('Digite o nome da receita');
    const valor = prompt('Digite o valor da receita');
    const categoria = prompt('Digite a categoria da receita');

    if (nome && valor && categoria) {
      const novaReceita = {
        nome: nome,
        valor: parseFloat(valor),
        categoria: categoria
      };

      this.receitas.push(novaReceita);
      localStorage.setItem('receitas', JSON.stringify(this.receitas));

      // Atualiza o total de receitas
      this.calcularTotal();

      // Exibe o toast de sucesso
      this.showToast('Receita adicionada com sucesso!', 'success');
    } else {
      // Exibe o toast de erro
      this.showToast('Por favor, preencha todos os campos!', 'danger');
    }
  }

  editarReceita(index: number) {
    const receita = this.receitas[index];
    const novoNome = prompt('Digite o novo nome da receita', receita.nome);
    const novoValor = prompt('Digite o novo valor da receita', receita.valor.toString());
    const novaCategoria = prompt('Digite a nova categoria da receita', receita.categoria);

    if (novoNome && novoValor && novaCategoria) {
      receita.nome = novoNome;
      receita.valor = parseFloat(novoValor);
      receita.categoria = novaCategoria;

      this.receitas[index] = receita;
      localStorage.setItem('receitas', JSON.stringify(this.receitas));

      // Atualiza o total de receitas
      this.calcularTotal();

      // Exibe o toast de sucesso
      this.showToast('Receita atualizada com sucesso!', 'success');
    } else {
      // Exibe o toast de erro
      this.showToast('Por favor, preencha todos os campos!', 'danger');
    }
  }

  excluirReceita(index: number) {
    const confirmar = confirm('Tem certeza que deseja excluir esta receita?');
    
    if (confirmar) {
      this.receitas.splice(index, 1);
      localStorage.setItem('receitas', JSON.stringify(this.receitas));

      // Atualiza o total de receitas
      this.calcularTotal();

      // Exibe o toast de sucesso
      this.showToast('Receita excluída com sucesso!', 'success');
    } else {
      // Exibe o toast de cancelamento
      this.showToast('Exclusão cancelada.', 'danger');
    }
  }
}
