import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public alertButtons = [
    {
      text: 'OK',
      handler: (selectedValue: string) => { // Especifica o tipo como string
        this.selectedColor = selectedValue; // Armazena a cor selecionada
        this.checkSelection(); // Verifica se uma opção foi escolhida
      }
    }
  ];

  public alertInputs: { // Definindo o tipo dos inputs corretamente
    label: string;
    type: 'radio'; // Especificando que o tipo é 'radio'
    value: string;
  }[] = [
    {
      label: 'Investidor Iniciante',
      type: 'radio',
      value: 'red',
    },
    {
      label: 'Investidor Moderado',
      type: 'radio',
      value: 'blue',
    },
    {
      label: 'Investidor Avançado',
      type: 'radio',
      value: 'green',
    },
  ];

  private selectedColor: string | null = null; // Variável para armazenar a cor selecionada

  constructor(private router: Router) {}

  presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Perfil de Investidor';
    alert.inputs = this.alertInputs; // Atribuindo diretamente os inputs
    alert.buttons = this.alertButtons;

    document.body.appendChild(alert);
    return alert.present();
  }

  // Método para verificar a seleção
  checkSelection() {
    if (this.selectedColor) {
      this.router.navigate(['/menu']); // Navega para a próxima tela se uma opção foi selecionada
    } else {
      this.showAlert('Por favor, selecione uma opção.'); // Exibe alerta se não houver seleção
    }
  }

  // Método para mostrar uma mensagem de alerta (opcional)
  showAlert(message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Atenção';
    alert.message = message;
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    return alert.present();
  }
  
}
