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

  // Array para la cabecera de las noticias
  categorias: string[] = ["general", "business", "technology", "science", "sports"];

  // Creo e inicializo un array vacío
  listaNoticias: IArticle[] = [];

  constructor(private leerFichero: HttpClient, public gestionNoticiasLeer: GestionNoticiasLeerService) {
    // this.cargarFichero();
    this.cargarCategoria(this.categorias[0]);
  }

  ngOnInit() {
  }

  // Lee el fichero con los artículos y los guarda en el array "listaNoticias"
  private cargarFichero() {

    let respuesta: Observable<RespuestaNoticias> = this.leerFichero.get<RespuestaNoticias>("/assets/datos/articulos.json");

    respuesta.subscribe( resp => {
      if (resp) {
        // console.log("Noticias", resp);
        this.listaNoticias.push(... resp.articles);
      }
    } );
  }

  // Comprueba si se ha seleccionado o no el artículo y en función de ello añade o borra la noticia
  public check(eventoRecibido: any, item: IArticle) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeer.addNoticia(item);
    } else {
      this.gestionNoticiasLeer.borrarNoticia(item);
    }
  }

  // En función de la categoría elegida se realiza la consulta REST correspondiente
  public cambiarCategoria(eventoRecibido: any) {
    this.listaNoticias = [];
    this.cargarCategoria(eventoRecibido.detail.value);
  }

  // Se realiza la consulta REST de una categoría
  private cargarCategoria(categoria: string) {
    let respuesta: Observable<RespuestaNoticias> = this.leerFichero.get<RespuestaNoticias>("https://newsapi.org/v2/top-headlines?category=" + categoria + "&apiKey=b883c8f523d741a08035b2d6dc47f0e2");

    respuesta.subscribe( resp => {
      // console.log("Noticias", resp);
      this.listaNoticias.push(... resp.articles);
    } );
  }

  // Comprueba si un artículo está en la lista para leer
  public buscar(articulo: IArticle): boolean {
    let indice = this.gestionNoticiasLeer.buscarNoticia(articulo);
    if (indice == -1) {
      return false;
    }
    return true;
  }
}