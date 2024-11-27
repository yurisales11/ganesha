import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importando o ToastController

@Component({
  selector: 'app-investidor',
  templateUrl: './investidor.page.html',
  styleUrls: ['./investidor.page.scss'],
})
export class InvestidorPage {
  selectedProfile: string = ''; // Armazena o perfil selecionado

  constructor(private router: Router, private toastController: ToastController) {} // Injetando o ToastController

  // Função para salvar o perfil e redirecionar
  saveProfile() {
    if (this.selectedProfile) {
      localStorage.setItem('investorProfile', this.selectedProfile);
      this.router.navigate(['/teste']); // Redireciona para a página "teste"
    } else {
      this.showToast('Por favor, selecione um perfil antes de continuar.', 'danger'); // Exibe o Toast de erro
    }
  }

  // Função para exibir o Toast
  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  // Tempo de exibição do toast
      color: color,  // Define a cor do toast (success ou danger)
      position: 'top',  // Posição do toast
    });
    toast.present();
  }
}
