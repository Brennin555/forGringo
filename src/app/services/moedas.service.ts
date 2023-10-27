import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoedasService {
  infosMoeda = {
    ask : '',
    bid: '',
    code: '',
    codein: '',
    create_date: '',
    high: '',
    low: '',
    name: '',
    pctChange: '',
    timestamp: '',
    varBid: '',
  };

  constructor(private http: HttpClient) {}

  public async consultaMoedas(): Promise<any> {
    try {
      return this.http
        .get(`https://economia.awesomeapi.com.br/json/all`)
        .toPromise()
        .then(
          (resposta) => {
            return resposta;
          },

        );
    } catch (error) {
      console.log(error);
    }
  }
}
