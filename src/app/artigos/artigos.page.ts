import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artigos',
  templateUrl: './artigos.page.html',
  styleUrls: ['./artigos.page.scss'],
})
export class ArtigosPage implements OnInit {
  news: any = [];

  constructor() { }

  ngOnInit() {
 
    
    this.getTeslaNews();
    
  }
  getTeslaNews() {
    const apiUrl = 'https://newsapi.org/v2/everything?q=mercado financeiro&from=2024-09-22&sortBy=publishedAt&apiKey=834c92db1be44f6ca2f114bd56199215';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.news = data.articles.slice(6,11 );
      })
      .catch(error => console.error('Error fetching data:', error));
  }
}

 


