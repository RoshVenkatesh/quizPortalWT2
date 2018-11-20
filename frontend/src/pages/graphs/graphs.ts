import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';


/**
 * Generated class for the GraphsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graphs',
  templateUrl: 'graphs.html',
})
export class GraphsPage {

  scores : any;
  topic : any;
  percent : any;
  actual : any;
  possible: any;
  name : any;
  @ViewChild('barCanvas') barCanvas;
 
    barChart: any;

  constructor(public storage: Storage,public navCtrl: NavController, public http: Http, public navParams: NavParams,  public loadingCtrl: LoadingController) {
    this.scores = navParams.get('scores');
  }

  ionViewDidLoad() {

    this.topic = [];
    this.percent = [];
    this.actual = [];
    this.possible = [];
    this.name = '';

    for (let i = 0; i < this.scores.length ; i++)
    {
      this.topic.push(this.scores[i].name)
      this.percent.push((this.scores[i].score/this.scores[i].possible)*100)
      this.actual.push(this.scores[i].score)
      this.possible.push(this.scores[i].possible)
    }

    this.storage.get('username').then((value) => {

      this.name = value;

    console.log(this.topic);
    console.log(this.percent);

    this.barChart = new Chart(this.barCanvas.nativeElement, {
 
      type: 'bar',
      data: {
          labels: this.topic,
          datasets: [{
              label: '% score',
              data: this.percent,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(99, 66, 33, 0.2)',
                  'rgba(39, 69, 69, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(99, 66, 33, 1)',
                  'rgba(39, 69, 69, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }

  });


    console.log('ionViewDidLoad GraphsPage');
  });
}

}
