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

  nota: number = 5;
  list: any[] = new Array(5);


  constructor(

    private cepService: CepService,
    private toast: ToastService,
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore,
    private navService: NavegacaoService
  ) {
    let lugaresJson = localStorage.getItem('lugaresDb');

    if (lugaresJson != null) {
      this.lugares = JSON.parse(lugaresJson);
    }
  }

  ngOnInit() {
  }

  public navBack(): void {
    this.navService.navegarPara('home');
  }

  updateLocalStorage() {
    localStorage.setItem('lugaresDb', JSON.stringify(this.lugares));
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
    this.updateLocalStorage();
  }

  addEndereco(){
    this.lugar = {} as Endereco;
    this.lugar.avaliacao = 5;
    this.addLugar = true;
  }

  abrirMapa(i: number) {
    if(this.lugares[i].rua == undefined){
      this.lugares[i].rua = '';
    }
    if(this.lugares[i].numero == undefined){
      this.lugares[i].numero = '';
    }
    if(this.lugares[i].cidade == undefined){
      this.lugares[i].cidade = '';
    }
    if(this.lugares[i].estado == undefined){
      this.lugares[i].estado = '';
    }


    let link = 'https://www.google.com/maps/search/?api=1&query=' + this.lugares[i].rua + ',' + this.lugares[i].numero + ',' + this.lugares[i].cidade + ',' + this.lugares[i].estado;
    console.log(link);
    window.open(link, '_blank');
  }

  editarLocal(i: number){
    this.lugar = this.lugares[i];
    this.addLugar = true;
    this.editaLugar = true;
    this.updateLocalStorage();
  }

  excluirLocal(i: number){
    this.lugares.splice(i, 1);
    this.updateLocalStorage();
  }

  review(i: number) {
    this.nota = i + 1;
    this.lugar.avaliacao = this.nota;
  }


}
