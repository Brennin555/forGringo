import { Component, OnInit } from '@angular/core';
import { NavegacaoService } from 'src/app/services/navegacao.service';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Tarefa } from 'src/app/interfaces/tarefa';
//import { stringify } from 'querystring';

@Component({
  selector: 'app-lista-de-tarefas',
  templateUrl: './lista-de-tarefas.page.html',
  styleUrls: ['./lista-de-tarefas.page.scss'],
})
export class ListaDeTarefasPage implements OnInit {
  tarefas: any[] = [];
  tarefa = {} as Tarefa;
  editarTarefa = false;
  addTarefa = false;
  escolherIcone = false;
  icones = [
    '',
    'home-outline',
    'person-outline',
    'people-outline',
    'airplane-outline',
    'cash-outline',
    'help-outline',
    'camera-outline',
    'alarm-outline',
    'calendar-number-outline',
    'fast-food-outline',
  ];

  constructor(
    private navService: NavegacaoService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {
    let taskJson = localStorage.getItem('taskDb');

    if (taskJson != null) {
      this.tarefas = JSON.parse(taskJson);
    }
  }

  async ngOnInit() {}

  public navBack(): void {
    this.navService.navegarPara('home');
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      cssClass: 'secondary',
      header: 'Cadastrar nova tarefa:',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'O que deseja fazer?',
        },
        {
          name: 'categoria',
          type: 'number',
          placeholder: 'Selecione uma Categoria',
          min: 0,
          max: 5,
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descrição da tarefa',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            this.add(form.task, form.description, form.categoria);
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }

  async add(newTask: string, detalhes: string, categoria: number) {
    if (newTask.trim().length < 1) {
      //VALIDA SE O USUÁRIO PREENCHEU A TAREFA
      const toast = await this.toastCtrl.create({
        message: 'Informe o que deseja fazer',
        duration: 2000,
        position: 'top',
      });

      toast.present();
      return;
    }

    this.tarefas.push(this.tarefa);

    // if (this.tarefa.categoria == 1) {
    //   this.tarefa.cor = 'categoria1';
    // }
    // if (this.tarefa.categoria == 2) {
    //   this.tarefa.cor = 'categoria2';
    // }
    // if (this.tarefa.categoria == 3) {
    //   this.tarefa.cor = 'categoria3';
    // }
    // if (this.tarefa.categoria == 4) {
    //   this.tarefa.cor = 'categoria4';
    // }
    // if (this.tarefa.categoria == 5) {
    //   this.tarefa.cor = 'categoria5';
    // }

    //this.this.tarefas.push(this.tarefa);

    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('taskDb', JSON.stringify(this.tarefas));
  }

  async openActions(task: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O QUE DESEJA FAZER?',
      buttons: [
        {
          text: this.tarefa.feita ? 'Desmarcar' : 'Marcar',
          icon: this.tarefa.feita ? 'radio-button-off' : 'checkmark-circle',
          handler: () => {
            task.feita = !task.feita;

            this.updateLocalStorage();
          },
        },
        {
          text: 'Descrição',
          icon: 'search',
          handler: () => {
            console.log('Search clicked');
            this.showDescription(task);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  delete(task: any) {
    this.tarefas = this.tarefas.filter((taskArray) => task != taskArray);

    this.updateLocalStorage();
  }

  async showDescription(task: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: task.name,
      subHeader: 'Categoria :     ' + task.cat,
      message: task.info,

      buttons: [
        {
          text: 'Ok',
          handler: (form) => {
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }

  novaTarefa() {
    this.tarefa = {} as Tarefa;
    this.addTarefa = true;
  }

  cadastrarTarefa() {
    this.addTarefa = false;
    if (this.editarTarefa == false) {
      this.tarefas.push(this.tarefa);
    }
  }

  showIcones() {
    this.escolherIcone = true;
  }

  closeIcones() {
    this.escolherIcone = false;
  }

  defineCategoria(i: number) {
    console.log(this.icones[i]);
    this.tarefa.categoria = this.icones[i];
  }
}
