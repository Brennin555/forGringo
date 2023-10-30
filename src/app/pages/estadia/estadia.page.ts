import { Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/services/cep.service';
import { Endereco } from 'src/app/interfaces/endereco';
import { ToastService } from 'src/app/services/toast.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavegacaoService } from 'src/app/services/navegacao.service';


@Component({
  selector: 'app-estadia',
  templateUrl: './estadia.page.html',
  styleUrls: ['./estadia.page.scss'],
})
export class EstadiaPage implements OnInit {

  estadia = {} as Endereco;
  estadiaAtual = {} as Endereco;
  editar = false;

  constructor(
    private cepService: CepService,
    private toast: ToastService,
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore,
    private navService: NavegacaoService

  ) {

    let estadiaJson = localStorage.getItem('estadiaDb');

    if (estadiaJson != null) {
      this.estadia = JSON.parse(estadiaJson);
    }
   }

  ngOnInit() {
  }

  public navBack(): void {
    this.navService.navegarPara('home');
  }

  updateLocalStorage() {
    localStorage.setItem('estadiaDb', JSON.stringify(this.estadia));
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

    this.estadiaAtual.rua = meuEndereco.logradouro;
    this.estadiaAtual.bairro = meuEndereco.bairro;
    this.estadiaAtual.cidade = meuEndereco.localidade;
    this.estadiaAtual.estado = meuEndereco.uf;
  }

  cadastrarEstadia() {

    // this.estadia.uid = this.firebaseService.userID;
    // this.firestore.collection('estadias').add(this.estadia);
    // this.toast.showToast('Estadia cadastrada com sucesso!');
    this.estadia = {...this.estadiaAtual};
    this.editar = false;
    this.updateLocalStorage();
  }

  editarEstadia() {
    this.editar = true;
    this.estadiaAtual = {...this.estadia};
  }

  abrirMapa() {
    if(this.estadia.rua == undefined){
      this.estadia.rua = '';
    }
    if(this.estadia.numero == undefined){
      this.estadia.numero = '';
    }
    if(this.estadia.cidade == undefined){
      this.estadia.cidade = '';
    }
    if(this.estadia.estado == undefined){
      this.estadia.estado = '';
    }

    let link = 'https://www.google.com/maps/search/?api=1&query=' + this.estadia.rua + ',' + this.estadia.numero + ',' + this.estadia.cidade + ',' + this.estadia.estado;
    console.log(link);
    window.open(link, '_blank');
  }

}
