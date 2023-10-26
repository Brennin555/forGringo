import { Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-estadia',
  templateUrl: './estadia.page.html',
  styleUrls: ['./estadia.page.scss'],
})
export class EstadiaPage implements OnInit {

  cep = '';
  constructor(
    private cepService: CepService,
  ) { }

  ngOnInit() {
  }

  private tiraTracoCEP(cep: string): string {
    let cepSemTraco = cep.replace('-', '');
    return cepSemTraco;
  }

  async buscarCEP(cep: string): Promise<void> {
    const meuEndereco = await this.cepService.consultaCEP(
      this.tiraTracoCEP(cep)
    );
    console.log(meuEndereco);
  }

}
