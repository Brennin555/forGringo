
import { Component, OnInit } from '@angular/core';
import { MoedasService } from 'src/app/services/moedas.service';
import { NavegacaoService } from 'src/app/services/navegacao.service';

@Component({
  selector: 'app-conversao-moedas',
  templateUrl: './conversao-moedas.page.html',
  styleUrls: ['./conversao-moedas.page.scss'],
})
export class ConversaoMoedasPage implements OnInit {

  listaMoedas: any[] = [];
  moedaEscolhida = this.moedasService.infosMoeda;
  valor1: number = 0;
  taxa: number = 0;
  resultado: number = this.valor1 * this.taxa ;

  constructor(
    private moedasService: MoedasService,
    private navService: NavegacaoService
  ) { }

  ngOnInit() {
    this.buscarMoedas();
  }

  public navBack(): void {
    this.navService.navegarPara('home');
  }

  async buscarMoedas() {
    this.listaMoedas = await this.moedasService.consultaMoedas();
    this.listaMoedas = Object.values(this.listaMoedas);

    console.log(this.listaMoedas);
    console.log(this.listaMoedas[0].name);
  }

  atualizarMoedaEscolhida(event: CustomEvent) {
    let nomeMoedaEscolhida = event.detail.value;
    this.listaMoedas.forEach((moeda) => {
      if (moeda.name === nomeMoedaEscolhida) {
        this.moedaEscolhida = moeda;
        this.taxa = Number(this.moedaEscolhida.ask);
      }
    });
    console.log('Moeda Escolhida:', this.moedaEscolhida);
  }
}
