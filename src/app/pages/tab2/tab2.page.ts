import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { IArticle } from './../../interfaces/articulos-interfaces';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  listaNoticias: IArticle[] = [];

  constructor(public gestionNoticiasLeer: GestionNoticiasLeerService) {

  }
}
