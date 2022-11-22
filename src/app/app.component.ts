import {Component} from '@angular/core';
import {PredictionService} from "./services/prediction.service";
import {Question} from "./question";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  predictions: any;
  text: string | undefined;
  questions: Question[] = [new Question('')];

  constructor(private predictionService: PredictionService) {
  }

  public addQuestion() {
    this.questions.push(new Question(''));
  }

  public getPredictions() {
    let questionsTexts: string[] = []
    this.questions.forEach(q => questionsTexts.push(q.text))
    this.predictionService.makePrediction(this.text, questionsTexts).subscribe(response => {
      this.predictions = response.predictions;
    });
  }
}
