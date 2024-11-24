import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Isso garante que o serviço esteja disponível globalmente
})
export class AvatarService {
  private avatarKey = 'userAvatar'; // Chave para salvar o avatar no localStorage

  constructor() {}

  /**
   * Obtém o avatar salvo no localStorage
   * @returns {string | null} A URL da imagem ou null caso não tenha sido salva.
   */
  getAvatar(): string | null {
    return localStorage.getItem(this.avatarKey);
  }

  /**
   * Salva a URL do avatar no localStorage
   * @param url A URL ou Base64 da imagem do avatar
   */
  setAvatar(url: string): void {
    localStorage.setItem(this.avatarKey, url);
  }

  /**
   * Remove o avatar do localStorage
   */
  clearAvatar(): void {
    localStorage.removeItem(this.avatarKey);
  }
}
