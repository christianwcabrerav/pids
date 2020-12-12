import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HOST, TOKEN_NAME} from '../_shared/var.constant';
import {Observable, Subject} from 'rxjs';
import {Examen} from '../_model/examen';
import {ConsultaListaExamen} from '../_model/consultaListExamen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  url = HOST + '/examenes';
  examenesCambioSubject = new Subject<Examen[]>();
  mensajeCambioSubject = new Subject<string>();

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.get<Examen[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarExamenPorId(id: number): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.get<Examen>(this.url + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(examen: Examen): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.post(this.url, examen, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  actualizar(examen: Examen): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.put(this.url, examen, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(id: number): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.delete(this.url + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarExamenPorConsulta(idConsulta: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.get<ConsultaListaExamen[]>(`${HOST}/consultaexamenes/${idConsulta}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
