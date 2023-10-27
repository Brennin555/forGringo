import { Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/services/cep.service';
import { Endereco } from 'src/app/interfaces/endereco';
import { ToastService } from 'src/app/services/toast.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-lugares-favoritos',
  templateUrl: './lugares-favoritos.page.html',
  styleUrls: ['./lugares-favoritos.page.scss'],
})
export class LugaresFavoritosPage implements OnInit {

  lugar = {} as Endereco;
  lugares = [];

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

    this.lugar.rua = meuEndereco.logradouro;
    this.lugar.bairro = meuEndereco.bairro;
    this.lugar.cidade = meuEndereco.localidade;
    this.lugar.estado = meuEndereco.uf;
  }

  cadastrarLugar() {

    this.lugar.uid = this.firebaseService.userID;
    this.firestore.collection('estadias').add(this.lugar);
    this.toast.showToast('Estadia cadastrada com sucesso!');
  }

}
