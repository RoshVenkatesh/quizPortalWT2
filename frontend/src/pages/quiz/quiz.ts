import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  dummy_list: any;
  items1: Array<{question:string,answer:string,title:string,options:Array<"">,fib:Number}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController,) {
    this.items1 = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.dummy_list = ['Molecules', 'Hydrogen', 'Noble Gases',"Chemical Reaction", 'Atoms']
    let postParams = {'topics': this.dummy_list}
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

        let url = "http://localhost:5000"
        let path = url.concat( "/get_questions");
        console.log(postParams);

        this.http.post(path, postParams, {headers: headers})
          .subscribe(res => {
           let data = res.json()['list'];
           for(let i in data){
               this.items1.push({
                 question : data[i].question,
                 answer : data[i].answer,
                 title : data[i].title,
                 fib : data[i].fib,
                 options : data[i].options               
             })                        
           }
           console.log(this.items1[0])
           loading.dismiss();
           // let ques=data['questions'];
            //traverse the questions array
          
});

  }

}
