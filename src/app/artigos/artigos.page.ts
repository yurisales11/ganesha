import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artigos',
  templateUrl: './artigos.page.html',
  styleUrls: ['./artigos.page.scss'],
})
export class ArtigosPage implements OnInit {
  news: any[] = []; // Inicialize como um array vazio
  loading: boolean = true; // Variável para controlar o estado de carregamento

  constructor() {}

  ngOnInit() {
    this.getTeslaNews();
  }

  getTeslaNews() {
    const apiUrl = 'https://newsapi.org/v2/everything?q=financeiro&from=2024-10-24&sortBy=publishedAt&apiKey=725a67681180417681f0ecd373d8176f';

    // Adicionando tratamento de erro para garantir que a API seja chamada corretamente
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar dados');
        }
        return response.json();
      })
      .then(data => {
        this.news = data.articles.slice(6, 11); // Pega um intervalo específico dos artigos
        this.loading = false; // Finaliza o carregamento
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        this.loading = false; // Finaliza o carregamento mesmo em caso de erro
      });
  }
}
