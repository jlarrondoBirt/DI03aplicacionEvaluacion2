import { HttpClient } from '@angular/common/http';
import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { RespuestaNoticias, IArticle } from './../../interfaces/articulos-interfaces';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Creo e inicializo un array vacío
  listaNoticias: IArticle[] = [];
  respuesta: Observable<RespuestaNoticias> = {} as Observable<RespuestaNoticias>;

  constructor(private leerFichero: HttpClient, public gestionNoticiasLeer: GestionNoticiasLeerService) {
    this.cargarFichero();
  }

  // Al cambiar el check, añade o borra la noticia
  check(eventoRecibido: any, item: IArticle) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeer.addNoticia(item);
    } else {
      this.gestionNoticiasLeer.borrarNoticia(item);
    }
  }

  // Lee el fichero con los artículos
  private cargarFichero() {

    let respuesta: Observable<RespuestaNoticias> = this.leerFichero.get<RespuestaNoticias>("/assets/datos/articulos.json");

    respuesta.subscribe( resp => {
      console.log("Noticias", resp);
      this.listaNoticias.push(... resp.articles);
    } );
  }

  // Comprueba si la noticia está para leer
  seleccionado(item: IArticle): boolean {
    let indice: number = this.gestionNoticiasLeer.buscarNoticia(item);
    if (indice != -1) {
      return true;
    }
    return false;
  }

  ngOnInit() {
  }
}
