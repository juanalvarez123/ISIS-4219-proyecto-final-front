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
  text: string | undefined
  questions: Question[] = [new Question('')]
  predictionVersion: string = ''
  predictionTitle: string = ''
  modeloSinEntrenarTitle = 'con modelo SIN entrenar'
  modeloEntrenadoTitle = 'con modelo entrenado'
  contexts = [
    {
      'title': 'Futbol',
      'text': 'Hansi Flick, seleccionador de Alemania, que tras su derrota contra Japón se medirá a España este domingo en un partido clave de la segunda jornada del grupo E del Mundial, ha comentado este sábado que aprecia “mucho a Luis Enrique”, su homólogo en la Roja, que ha formado “un equipo joven y de calidad”. “España tiene muy claros todos sus automatismos, es un equipo que me gusta mucho; y Busquets es el corazón de este equipo”, ha dicho el técnico alemán un día antes del encuentro en el que la selección alemana se juega su futuro en la Copa del Mundo. Poco antes de que lo hiciera Flick también ha hablado Luis Enrique: “Una Alemania herida puede ser más peligrosa”, ha advertido. El campeonato continúa hoy con los partidos de la segunda jornada de los grupos C y D. En el D, Australia ha ganado a Túnez (1-0) y Francia ha derrotado a Dinamarca (2-1), con lo que Les Bleus se han convertido en la primera selección en clasificarse para octavos de final. En el C, Polonia ha vencido a Arabia Saudí (2-0). El gran partido del día lo ha protagonizado la Albiceleste, que tras perder ante Arabia Saudí en la primera jornada ha ganado a México (2-0) y se jugará la clasificación a octavos ante Polonia.',
      'questions': [
        'Quién es Hansi Flick?',
        'Contra quién se jugará la clasificación?',
        'Who is Luis Enrique?'
      ]
    },
    {
      'title': 'Recombinant cytokines',
      'text': 'Affordable therapeutics are vitally needed for humans worldwide. Plant-based production of recombinant proteins can potentially enhance, back-up, or even substitute for the manufacturing capacity of the conventional, fermenter-based technologies. We plastome-engineered a tobacco cultivar to express high levels of two “plantakines” — recombinant human cytokines, interleukins IL-37b and IL-38, and confirmed their native conformation and folding. Assessment of their biological functionality was performed ex vivo by analyzing the effects exerted by the plantakines on levels of 11 cytokines secreted from human peripheral blood mononuclear cells (PBMCs) challenged with an inflammatory agent. Application of the plant-produced IL-37b and IL-38 in PBMCs stimulated with Lipopolysaccharide or Phytohaemagglutinin resulted in significant, and in particular cases—dose-dependent modulation of pro-inflammatory cytokines secretion, showing attenuation in two-thirds of significant level modulations observed. Plantakine treatments that increased inflammatory responses were associated with the higher dosage. Our results demonstrate feasibility of manufacturing functional recombinant human proteins using scalable, cost-effective and eco-friendly plant-based bioreactors.',
      'questions': [
        'What plantakine treatments does?',
        'What application of the plant produces?',
        'Que demostraron los resultados?'
      ]
    }]

  constructor(private predictionService: PredictionService) {
  }

  public loadContext(indexOfContext: number) {
    this.text = this.contexts[indexOfContext].text
    this.questions = this.contexts[indexOfContext].questions.map(q => new Question(q))
    this.predictions = []
    this.predictionVersion = ''
    this.predictionTitle = ''
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

  public cleanForm() {
    this.predictions = []
    this.text = ''
    this.questions = [new Question('')]
    this.predictionVersion = ''
    this.predictionTitle = ''
  }

  public getBgClass(score: number): string {
    if (score < 0.3) {
      return 'bg-danger'
    } else if (score < 0.7) {
      return 'bg-warning'
    }
    return 'bg-success'
  }

  public getPredictions(predictionVersion: string, predictionTitle: string) {
    this.predictions = []
    this.predictionVersion = predictionVersion
    this.predictionTitle = predictionTitle
    let questionsTexts: string[] = []
    this.questions.forEach(q => questionsTexts.push(q.text))
    this.predictionService.makePrediction(this.predictionVersion, this.text, questionsTexts).subscribe(response => {
      this.predictions = response.predictions;
    });
  }
}
