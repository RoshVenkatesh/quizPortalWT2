import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { Storage } from '@ionic/storage';
import { GraphsPage } from '../graphs/graphs';

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
  items2: Array<{name:string,topics:Array<"">,score:number,possible:number}>;
  items1: Array<{question:string,answer:string,title:string,options:Array<"">,fib:Number, response: String, correct:String}>;
  title1 : String;
  title2 : String;
  title3 : String;
  title4 : String;
  subjects : any;
  topic: any;
  name : any;
  topics: any;
  score : any;
  possible : any;


  constructor(public navCtrl: NavController, public storage:Storage,public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
    this.items1 = [];
    this.items2 = [];
    this.subjects = navParams.get('item');
    
  }

  ionViewDidLoad() {
    console.log(this.subjects)
    console.log('ionViewDidLoad QuizPage');
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let postParams = {'topics': this.subjects.topics}
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
                 response : "",   
                 correct: "notanswered"          
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

  if (given_answer.toLowerCase() === item.answer.toLowerCase()){
    item.correct = "1"
  }
  else{
    item.correct = "0"
  }

}

public continue(){

  let x = 0;
  for (let i = 0; i<20 ; i++){
    if (this.items1[i].correct == "1"){
      console.log("CORRECT")
      x++;
    }
  }

  console.log(x)
  var current = [0,0]
  console.log(this.subjects.name)
  this.storage.get(this.subjects.name).then((value) => {

    /*console.log("OLD")
    console.log(value[0])
    console.log(value[1])*/

    current[0] = value[0] + x;
    current[1] = value[1] + 20;

    /*console.log("NEW")
    console.log(current[0])
    console.log(current[1])*/
    

  this.storage.set(this.subjects.name,[current[0], current[1]])

});
  this.navCtrl.setRoot(HelloIonicPage,{loggedin:1})
}

public graph(){

  let x = 0;
  for (let i = 0; i<20 ; i++){
    if (this.items1[i].correct == "1"){
      console.log("CORRECT")
      x++;
    }
  }

  console.log(x)
  var current = [0,0]
  console.log(this.subjects.name)
  this.storage.get(this.subjects.name).then((value) => {

    current[0] = value[0] + x;
    current[1] = value[1] + 20;    

  this.storage.set(this.subjects.name,[current[0], current[1]])

});

let headers = new Headers();
headers.append('Content-Type', 'application/json');

    let url = "http://localhost:5000"
    let path = url.concat( "/get_topics");
    //console.log(postParams);
    this.name = [];
    this.topics = [];
    this.score = [];
    this.possible = [];

    this.http.get(path, {headers: headers})
      .subscribe(res => {
       let data = res.json()['topics'];
       //console.log(data)
       for(let i in data){
         console.log(i)
         if(i!='_id'){
          this.items2.push({
            name : i,
            topics:data[i],
            score : 0,
            possible : 0         
        })   
          }  
        }     
        
        for (let i = 0; i< this.items2.length; i++ ){

              this.storage.get(this.items2[i].name).then((value) => {  
              console.log(this.items2[i].name,value[0],value[1])
              this.setValue(i,value[0],value[1]);
          });

        }
        
       });
      }
       
  public setValue(i,val1,val2){
    console.log("HI BRO")
    this.items2[i].score = val1;
    this.items2[i].possible = val2;

    if (i == 7){
      console.log(this.items2)
      this.navCtrl.setRoot(GraphsPage, {scores:this.items2})

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