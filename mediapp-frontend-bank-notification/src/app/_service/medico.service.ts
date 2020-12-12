import {Injectable} from '@angular/core';
import {HOST, TOKEN_NAME} from '../_shared/var.constant';
import {Observable, Subject} from 'rxjs';
import {Medico} from '../_model/medico';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url = HOST + '/medicos';

  medicosCambioSubject = new Subject<Medico[]>();
  mensajeCambioSubject = new Subject<string>();

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.get<Medico[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPacientePorId(id: number): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.get<Medico>(this.url + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(medico: Medico): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.post(this.url, medico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  actualizar(medico: Medico): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.put(this.url, medico, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(id: number): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.delete(this.url + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
  
}
