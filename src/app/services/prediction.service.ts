import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private readonly headers: HttpHeaders;
  private URL_HOST: string = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
  }

  makePrediction(text: string | undefined, questions: string[] | undefined): Observable<any> {
    let body = {'text': text, 'questions': questions}
    return this.http.post(this.URL_HOST + '/predict', body, {headers: this.headers});
  }
}
