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
  items1: Array<{question:string,answer:string,title:string,options:Array<"">,fib:Number, response: String}>;
  title1 : String;
  title2 : String;
  title3 : String;
  title4 : String;

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
            let optionsArray = data[i].options
            optionsArray.push(data[i].answer)
            console.log(optionsArray)
            shuffleArray(optionsArray)
               this.items1.push({
                 question : data[i].question,
                 answer : data[i].answer,
                 title : data[i].title,
                 fib : data[i].fib,
                 options : optionsArray,
                 response : ""             
             })                        
           }
           console.log(this.items1[0])
           loading.dismiss();
           this.title1 = data[0].title;
           this.title2 = data[5].title;
           this.title3 = data[10].title;
           this.title4 = data[15].title;
           // let ques=data['questions'];
            //traverse the questions array
          
});

}

public checkAnswer(item, given_answer){
  console.log(given_answer)

  if (given_answer.toLowerCase() === item.answer){
    console.log("Correct")
  }
  else{
    console.log("Wrong")
  }
}

}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}