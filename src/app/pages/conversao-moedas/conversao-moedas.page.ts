import { Component, OnInit } from '@angular/core';
import { MoedasService } from 'src/app/services/moedas.service';

@Component({
  selector: 'app-conversao-moedas',
  templateUrl: './conversao-moedas.page.html',
  styleUrls: ['./conversao-moedas.page.scss'],
})
export class ConversaoMoedasPage implements OnInit {

  listaMoedas: any[] = [];
  moedaEscolhida = this.moedasService.infosMoeda;

  constructor(
    private moedasService: MoedasService,
  ) { }

  ngOnInit() {
  }

  async buscarMoedas() {
    this.listaMoedas = await this.moedasService.consultaMoedas();
    this.listaMoedas = Object.values(this.listaMoedas);

    console.log(this.listaMoedas);
    console.log(this.listaMoedas[0].name);
  }

  atualizarMoedaEscolhida(event: CustomEvent) {
    this.moedaEscolhida = event.detail.value;
    console.log('Moeda Escolhida:', this.moedaEscolhida);
  }
}
