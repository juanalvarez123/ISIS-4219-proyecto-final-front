import {Component} from '@angular/core';
import {PredictionService} from "./services/prediction.service";
import {Question} from "./question";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  predictionsV1: any = []
  predictionsV2: any = []
  text: string | undefined
  questions: Question[] = [new Question('')]
  predictionVersion: string = ''
  predictionTitle: string = ''
  modeloSinEntrenarTitle = 'Respuesta de modelo BASE'
  modeloEntrenadoTitle = 'Respuesta de modelo PROPIO'
  contexts = [
    {
      'title': 'Music',
      'text': 'Lindisfarne are a folk-rock group with a strong Tyneside connection. Their most famous song, \"Fog on the Tyne\" (1971), was covered by Geordie ex-footballer Paul Gascoigne in 1990. Venom, reckoned by many to be the originators of black metal and extremely influential to the extreme metal scene as a whole, formed in Newcastle in 1979. Folk metal band Skyclad, often regarded as the first folk metal band, also formed in Newcastle after the break-up of Martin Walkyier thrash metal band, Sabbat. Andy Taylor, former lead guitarist of Duran Duran was born here in 1961. Brian Johnson was a member of local rock band Geordie before becoming the lead vocalist of AC/DC.',
      'questions': [
        'What genre of music is Lindisfarne classified as?',
        'What year was the song Fog on the Tyne released?',
        'Qué banda se considera por muchos como el primer grupo de black metal?'
      ]
    },
    {
      'title': 'Mongoles',
      'text': 'Camuka ve Temu\u00e7in\'in aras\u0131ndaki arkada\u015fl\u0131k ba\u011flar\u0131 kopunca, her biri g\u00fc\u00e7 toplamaya ba\u015flad\u0131 ve k\u0131sa bir s\u00fcre sonra rakip oldular. Camuka, geleneksel Mo\u011fol aristokrasisini desteklerken, Temu\u00e7in meritokratik bir y\u00f6ntem izleyerek daha geni\u015f, ancak daha d\u00fc\u015f\u00fck s\u0131n\u0131ftan bir kitle olu\u015fturdu. Merkitleri daha \u00f6nce yenilgiye u\u011fratm\u0131\u015f olmas\u0131 ve \u015faman Kokochu\'nun Ebedi Mavi G\u00f6ky\u00fcz\u00fc\'n\u00fcn d\u00fcnyay\u0131 Temu\u00e7in\'e adad\u0131\u011f\u0131n\u0131 ilan etmesiyle birlikte, Temu\u00e7in iktidara y\u00fckselmeye ba\u015flad\u0131. 1186\'da, Temu\u00e7in Mo\u011fol han\u0131 se\u00e7ildi. Ancak, Temu\u00e7in\'in h\u0131zl\u0131 y\u00fckseli\u015fiyle tehdit alt\u0131nda kalan Camuka, Temu\u00e7in\'in h\u0131rslar\u0131n\u0131n \u00f6n\u00fcne ge\u00e7mek i\u00e7in hemen harekete ge\u00e7ti. 1187\'de eski arkada\u015f\u0131na kar\u015f\u0131 otuz bin askeri birlikten olu\u015fan ordusuyla bir sald\u0131r\u0131 ba\u015flatt\u0131. Temu\u00e7in, sald\u0131r\u0131ya kar\u015f\u0131 savunmak i\u00e7in kitlesini apar topar bir araya getirdi, ancak Dalan Balcut Sava\u015f\u0131\'nda net bir yenilgi ald\u0131. Camuka insanlar\u0131 olduk\u00e7a deh\u015fete d\u00fc\u015f\u00fcrd\u00fc ve yetmi\u015f gen\u00e7 erkek tutsa\u011f\u0131 kazanlarda diri diri kaynatarak, potansiyel kitlesinin \u00e7o\u011funu uzakla\u015ft\u0131rarak ve Temu\u00e7in\'e sempati uyand\u0131rarak imaj\u0131na zarar verdi. Temu\u00e7in\'in koruyucusu olan Tu\u011frul, Karah\u0131tay\'a s\u00fcrg\u00fcne g\u00f6nderildi. Gelecek on y\u0131l i\u00e7in Temu\u00e7in\'in hayat\u0131 \u00e7ok net de\u011fil, \u00e7\u00fcnk\u00fc tarihi kay\u0131tlar o d\u00f6nemde \u00e7o\u011funlukla yetersiz kal\u0131yor',
      'questions': [
        'Camuka, Temu\u00e7in\'in kitlesinden olmayan kimleri destekledi?',
        'Hangi \u015faman\u0131n ilan\u0131 Temu\u00e7in\'in y\u00fckseli\u015fine yard\u0131mc\u0131 oldu?',
        'Cuándo fue Temujin elegido khan de los mongoles?'
      ]
    },
    {
      'title': 'Genética',
      'text': 'Un tercer tipo de conjeturas se refiere a aspectos de la distribuci\u00f3n de los primos. Se conjetura que hay infinitamente muchos primos gemelos, pares de primos con diferencia 2 (conjetura de primos gemelos). La conjetura de Polignac es un corolario de esa conjetura, establece que por cada n\u00famero entero positivo n, hay infinitamente muchos pares de primos consecutivos que difieren en 2n. Se conjetura que hay infinitamente muchos primos de la forma n2 + 1. Estas conjeturas son casos especiales de la hip\u00f3tesis amplia de Schinzel H. La conjetura de Brocard dice que siempre hay al menos cuatro primos entre los cuadrados de los primos consecutivos mayores de 2. La conjetura de Legendre establece que hay un n\u00famero primo entre n2 y (n + 1)2 por cada n\u00famero entero positivo n. Est\u00e1 impl\u00edcito en la conjetura m\u00e1s fuerte de Cram\u00e9r.',
      'questions': [
        '\u00bfQué conjetura sostiene que hay una cantidad infinita de primos gemelos?',
        '\u00bfQu\u00e9 es un \"primo gemelo\"?',
        '\u00bfQu\u00e9 conjetura sostiene que para cualquier n\u00famero entero positivo n, hay una cantidad infinita de pares de primos consecutivos que difieren en 2n?'
      ]
    }]

  constructor(private predictionService: PredictionService) {
  }

  public loadContext(indexOfContext: number) {
    this.text = this.contexts[indexOfContext].text
    this.questions = this.contexts[indexOfContext].questions.map(q => new Question(q))
    this.predictionsV1 = []
    this.predictionsV2 = []
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
    this.predictionsV1 = []
    this.predictionsV2 = []
    this.text = ''
    this.questions = [new Question('')]
    this.predictionVersion = ''
    this.predictionTitle = ''
  }

  public getPredictions() {
    this.predictionsV1 = []
    this.predictionsV2 = []
    let questionsTexts: string[] = []
    this.questions.forEach(q => questionsTexts.push(q.text))
    this.predictionService.makePrediction('v1', this.text, questionsTexts).subscribe(response => {
      this.predictionsV1 = response.predictions;
      this.predictionService.makePrediction('v2', this.text, questionsTexts).subscribe(response => {
        this.predictionsV2 = response.predictions;
      });
    });
  }
}
