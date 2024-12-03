import { IArticle } from './../interfaces/articulos-interfaces';
import { Injectable } from '@angular/core';
import { GestionCapacitorStorageService } from './gestion-capacitor-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  private noticiasLeer: IArticle [] = [];

  constructor(private gestionStorage: GestionCapacitorStorageService) {
    let datosPromesa: Promise<IArticle[]> = gestionStorage.getObject("noticiasLeer");
    datosPromesa.then( datos => {
      if (datos) {
        // console.log(datos);
        this.noticiasLeer.push(...datos);
      }
    });
  }

  // Añade una nueva noticia a leer
  addNoticia(item : IArticle) {
    // copiar item
    let itemString = JSON.stringify(item);
    item = JSON.parse(itemString);

    // Añadirlo
    this.noticiasLeer.push(item);
    this.gestionStorage.setObject("noticiasLeer", this.noticiasLeer);
  }

  // Comprueba si una noticia ya está en el array  // Se busca un artículo en el array
  public buscarNoticia(item: IArticle): number  {
    let indice: number = this.noticiasLeer.findIndex(
      function(cadaArticulo) { 
        return JSON.stringify(cadaArticulo) == JSON.stringify(item);
      }
    );
    //let indice = this.noticiasLeer.indexOf(articuloEncontrado);
    return indice;
  }

  // Borra una noticia
  borrarNoticia(item: IArticle) {
    let indice = this.buscarNoticia(item);
    if (indice != -1) {
      this.noticiasLeer.splice(indice, 1);
      this.gestionStorage.setObject("noticiasLeer", this.noticiasLeer);
    }
  }

  // Devuelve todas las noticias para leer
  getNoticias() {
    return this.noticiasLeer;
  }
}