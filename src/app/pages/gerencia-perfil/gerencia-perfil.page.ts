import { Component, OnInit } from '@angular/core';
import { NavegacaoService } from 'src/app/services/navegacao.service';

@Component({
  selector: 'app-gerencia-perfil',
  templateUrl: './gerencia-perfil.page.html',
  styleUrls: ['./gerencia-perfil.page.scss'],
})
export class GerenciaPerfilPage implements OnInit {

  constructor(
    private navService: NavegacaoService
  ) { }

  ngOnInit() {
  }

  public navBack(): void {
    this.navService.navegarPara('home');
  }

}
