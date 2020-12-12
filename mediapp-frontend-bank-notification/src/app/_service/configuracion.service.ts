import {Injectable} from "@angular/core";
import {HOST, TOKEN_NAME} from "../_shared/var.constant";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {ConfiguracionRequest} from "../_model/configuracion-request";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  url = HOST + '/configuraciones';

  configuracionCambioSubject = new Subject<any>();
  mensajeCambioSubject = new Subject<string>();

  constructor(private httpClient: HttpClient) {
  }

  buscarPorUsername(): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    const decodedToken = decode(access_token);
    return this.httpClient.get<any>(`${this.url}/usuario/${decodedToken.user_name}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  actualizar(configuracionRequest: ConfiguracionRequest): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    const decodedToken = decode(access_token);
    configuracionRequest.username = decodedToken.user_name;
    return this.httpClient.put<any>(`${this.url}`, configuracionRequest, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
