import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  enderecoVazio = {
    cep: '',
    complemento: '',
    gia: '',
    ibge: '',
    localidade: '',
    logradouro: '',
    uf: '',
    unidade: '',
    bairro: '',
  };

  constructor(
    private http: HttpClient,
  ) { }

  public async consultaCEP(cep: string): Promise<any> {
    try {
      return this.http.get(`https://viacep.com.br/ws/${cep}/json/`).toPromise().then((resposta) => {
        return resposta;
      }, (error) => {
        console.log(error);
        this.enderecoVazio.gia = String(error);
        return this.enderecoVazio;
      });
    } catch (error) {
      console.log(error);
      this.enderecoVazio.gia = String(error);
      return this.enderecoVazio;
    }
  }
}
