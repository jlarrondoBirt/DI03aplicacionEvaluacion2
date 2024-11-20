import { IArticle } from './../interfaces/articulos-interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  private noticiasLeer: IArticle [] = [];

  constructor() {

  }

  // Añade una nueva noticia a leer
  addNoticia(item : IArticle) {
    // copiar item
    let itemString = JSON.stringify(item);
    item = JSON.parse(itemString);

    // Añadirlo
    this.noticiasLeer.push(item);
  }

  // Comprueba si una noticia ya está en el array
  buscarNoticia(item: IArticle): number  {
    let articuloEncontrado: any = this.noticiasLeer.find(
      function(cadaArticulo) {
        return JSON.stringify(cadaArticulo) == JSON.stringify(item);
      }
    );
    let indice = this.noticiasLeer.indexOf(articuloEncontrado);
    return indice;
  }

  // Borra una noticia
  borrarNoticia(item: IArticle) {
    let indice = this.buscarNoticia(item);
    if (indice != -1) {
      this.noticiasLeer.splice(indice, 1);
    }
  }

  // Devuelve todas las noticias para leer
  getNoticias() {
    return this.noticiasLeer;
  }
}