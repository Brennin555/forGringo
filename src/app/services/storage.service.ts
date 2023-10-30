import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirebaseService } from 'src/app/services/firebase.service';
@Injectable({
	providedIn: 'root',
})

export class StorageService {
	constructor(
    private storage: Storage,
  ) {}

  public async saveStorage(user: unknown) {
    let userString = JSON.stringify(user);
    await this.storage.set('usuario', userString);
  }

  public async getStorage(): Promise<string> {
    return await this.storage.get('usuario');
  }

}
