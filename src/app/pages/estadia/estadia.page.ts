import { Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/services/cep.service';
import { Endereco } from 'src/app/interfaces/endereco';
import { ToastService } from 'src/app/services/toast.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-estadia',
  templateUrl: './estadia.page.html',
  styleUrls: ['./estadia.page.scss'],
})
export class EstadiaPage implements OnInit {

  estadia = {} as Endereco;
  editar = false;

  constructor(
    private cepService: CepService,
    private toast: ToastService,
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore

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

    this.estadia.rua = meuEndereco.logradouro;
    this.estadia.bairro = meuEndereco.bairro;
    this.estadia.cidade = meuEndereco.localidade;
    this.estadia.estado = meuEndereco.uf;
  }

  cadastrarEstadia() {

    // this.estadia.uid = this.firebaseService.userID;
    // this.firestore.collection('estadias').add(this.estadia);
    // this.toast.showToast('Estadia cadastrada com sucesso!');
    this.editar = false;
  }

  abrirMapa() {
    let link = 'https://www.google.com/maps/search/?api=1&query=' + this.estadia.rua + ',' + this.estadia.numero + ',' + this.estadia.cidade + ',' + this.estadia.estado;
    console.log(link);
    window.open(link, '_blank');
  }

}
