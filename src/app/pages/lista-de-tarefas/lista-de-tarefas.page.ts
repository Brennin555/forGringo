import { Component, OnInit } from '@angular/core';
import { NavegacaoService } from 'src/app/services/navegacao.service';

@Component({
  selector: 'app-lista-de-tarefas',
  templateUrl: './lista-de-tarefas.page.html',
  styleUrls: ['./lista-de-tarefas.page.scss'],
})
export class ListaDeTarefasPage implements OnInit {

  constructor(
    private navService: NavegacaoService
  ) { }

  ngOnInit() {
  }
  public navBack(): void {
    this.navService.navegarPara('home');
  }

}
