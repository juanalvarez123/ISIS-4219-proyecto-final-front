import {Component} from '@angular/core';
import {PredictionService} from "./services/prediction.service";
import {Question} from "./question";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  predictions: any = []
  text: string | undefined;
  questions: Question[] = [new Question('')];

  constructor(private predictionService: PredictionService) {
  }

  public addQuestion() {
    this.questions.push(new Question(''));
  }

  public deleteQuestion(indexOfQuestion: number) {
    this.questions.splice(indexOfQuestion, 1)
  }

  public isValidForPredictions(): boolean {
    let emptyQuestions = this.questions.map(q => q.text.trim()).filter(q => q == '').length
    let isValidText = this.text != undefined && this.text.trim() !== ''
    return this.questions.length >= 1 && emptyQuestions == 0 && isValidText;
  }

  public getPredictions() {
    let questionsTexts: string[] = []
    this.questions.forEach(q => questionsTexts.push(q.text))
    this.predictionService.makePrediction(this.text, questionsTexts).subscribe(response => {
      this.predictions = response.predictions;
    });
  }
}
