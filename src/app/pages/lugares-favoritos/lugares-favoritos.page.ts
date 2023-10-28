import { Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/services/cep.service';
import { Endereco } from 'src/app/interfaces/endereco';
import { ToastService } from 'src/app/services/toast.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavegacaoService } from 'src/app/services/navegacao.service';

@Component({
  selector: 'app-lugares-favoritos',
  templateUrl: './lugares-favoritos.page.html',
  styleUrls: ['./lugares-favoritos.page.scss'],
})
export class LugaresFavoritosPage implements OnInit {

  lugar = {} as Endereco;
  lugares:Endereco[] = [];
  addLugar = false;
  editaLugar = false;


  constructor(

    private cepService: CepService,
    private toast: ToastService,
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore,
    private navService: NavegacaoService
  ) { }

  ngOnInit() {
  }

  public navBack(): void {
    this.navService.navegarPara('home');
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

    this.lugar.rua = meuEndereco.logradouro;
    this.lugar.bairro = meuEndereco.bairro;
    this.lugar.cidade = meuEndereco.localidade;
    this.lugar.estado = meuEndereco.uf;
  }

  cadastrarLugar() {

    this.addLugar = false;
    if(this.editaLugar == false){
      this.lugares.push(this.lugar);
    }
  }

  addEndereco(){
    this.lugar = {} as Endereco;
    this.addLugar = true;
  }

  abrirMapa(i: number) {
    let link = 'https://www.google.com/maps/search/?api=1&query=' + this.lugares[i].rua + ',' + this.lugares[i].numero + ',' + this.lugares[i].cidade + ',' + this.lugares[i].estado;
    console.log(link);
    window.open(link, '_blank');
  }

  editarLocal(i: number){
    this.lugar = this.lugares[i];
    this.addLugar = true;
    this.editaLugar = true;
  }


}
