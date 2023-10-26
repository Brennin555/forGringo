import { Component } from '@angular/core';
import { NavegacaoService } from 'src/app/services/navegacao.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private navService: NavegacaoService
  ) {}

  irParaConversaoMoedas(){
    this.navService.navegarPara('conversao-moedas')
  }

  irParaEstadia(){
		this.navService.navegarPara('estadia')
	}

  irParaGerenciaPerfil(){
		this.navService.navegarPara('gerencia-perfil')
	}

  irParaListaTarefas(){
		this.navService.navegarPara('lista-de-tarefas')
	}

  irParaLugaresFavoritos(){
		this.navService.navegarPara('lugares-favoritos')
	}

  irParaLogin(){
		this.navService.navegarPara('login')
	}
}
