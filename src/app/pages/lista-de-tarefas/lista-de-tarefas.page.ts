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
  tarefaAtual = {} as Tarefa;

  editarTarefa = false;
  addTarefa = false;
  escolherIcone = false;

  icones = [
    'arrow-forward-outline',
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
          text: 'Editar',
          icon: 'build-outline',
          handler: () => {
            console.log('Search clicked');
            //pegar tarefa e indice dela
            this.editaTarefa(task, this.tarefas.indexOf(task));
          },
        },
        {
          text: 'Deletar',
          icon: 'trash-outline',
          handler: () => {
            console.log('Search clicked');
            //pegar tarefa e indice dela
            this.delete(task);
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
      subHeader: 'Categoria :     ' + task.categoria,
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
    this.tarefaAtual = {} as Tarefa;
    this.addTarefa = true;
    this.editarTarefa = false;

  }

  cadastrarTarefa() {
    this.tarefa = { ...this.tarefaAtual };
    this.addTarefa = false;
    if (this.editarTarefa == false) {
      this.tarefa.indice = this.tarefas.length;
      this.tarefas.push(this.tarefa);
    }else{
      this.tarefas[this.tarefa.indice] = this.tarefa;
    }
    this.updateLocalStorage();
  }

  editaTarefa(task: any, i: number) {
    this.editarTarefa = true;
    this.addTarefa = true;
    this.tarefaAtual = { ...task };

    this.updateLocalStorage();
  }

  cancelarTarefa() {
    this.tarefaAtual = { ...this.tarefa };
    this.addTarefa = false;
    this.editarTarefa = false;
  }

  showIcones() {
    this.escolherIcone = true;
  }

  closeIcones() {
    this.escolherIcone = false;
  }

  defineCategoria(i: number) {
    console.log(this.icones[i]);
    this.tarefaAtual.categoria = this.icones[i];
  }
}
