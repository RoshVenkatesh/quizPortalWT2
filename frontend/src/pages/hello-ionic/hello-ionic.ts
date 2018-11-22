import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import {QuizPage} from '../quiz/quiz'

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  items1: Array<{name:string,topics:Array<"">,no:string}>;
  loggedin:Number;
  constructor( public http: Http,public navParams:NavParams,public storage:Storage,public navCtrl:NavController,public alertCtrl:AlertController) {

    this.items1 = [];
    this.loggedin=this.navParams.get('loggedin')
  }
  
  checklogin(item)
  {
    //this.storage.get('username').then((value) => {

          if(this.loggedin==0)
          {
            this.loggedin=1
            let alert = this.alertCtrl.create({
              title: 'Login',
              message:'Enter name',
              inputs: [
                {
                  name: 'uname',
                  placeholder: 'Name'
                }
               
              ],
              buttons:[
                {
                  text: 'Cancel',
                  role: 'cancel',
                  
                },
                {
                  text: 'Submit',
                  handler: data => {
                  console.log(data);
                  console.log(item)
                  this.storage.set('username',data['uname'])
                  this.navCtrl.push(QuizPage,{item:item});
                  }
                }
              ]
            });
            alert.present();
          }
          else
          {
            console.log('yo')
            console.log(item)
            this.navCtrl.push(QuizPage,{item:item});
          }
      
          //this.navCtrl.push(QuizPage,{})
        
            
  }
  ionViewDidLoad(){
    //let postParams = {'topics': this.dummy_list}
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

        let url = "http://localhost:5000"
        let path = url.concat( "/get_topics");
        //console.log(postParams);

        this.http.get(path, {headers: headers})
          .subscribe(res => {
           let data = res.json()['topics'];
           console.log(data)
           let c=0
           for(let i in data){
             if(i!='_id'){
               //console.log("../../assets/imgs/"+name)
               //console.log(name)
               this.items1.push({
                 name : i,
                 topics:data[i] ,
                 no:"../../assets/imgs/"+i+".jpg"      
             })
             console.log(this.items1[c].no)
             c=c+1    
            }                    
           }
  });
}
}
