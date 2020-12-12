import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HOST, TOKEN_NAME} from '../_shared/var.constant';
import {Observable, Subject} from 'rxjs';
import {Especialidad} from '../_model/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  url = HOST + '/especialidades';

  especialidadesCambioSubject = new Subject<Especialidad[]>();
  mensajeCambioSubject = new Subject<string>();

  constructor(private httpClient: HttpClient) {
  }

  listar(): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.get<Especialidad[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarEspecialidadPorId(id: number): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.get<Especialidad>(this.url + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(paciente: Especialidad): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.post(this.url, paciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  actualizar(paciente: Especialidad): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.put(this.url, paciente, {
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
