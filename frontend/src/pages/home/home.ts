import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
  }
navigate(){
  this.navCtrl.push(HelloIonicPage,{loggedin:0})
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.storage.set('Cartoons', [0,0]);
    this.storage.set('Chemistry', [0,0]);
    this.storage.set('Comic', [0,0]);
    this.storage.set('Human Body', [0,0]);
    this.storage.set('Indian Cities', [0,0]);
    this.storage.set('Monuments', [0,0]);
    this.storage.set('Physics', [0,0]);
    this.storage.set('Solar System', [0,0]);
  }

}
