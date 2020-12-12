import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HOST, TOKEN_NAME} from "../_shared/var.constant";
import * as decode from 'jwt-decode';
import {Subject} from "rxjs";
import {NotificacionResponse} from "../_model/notificacion-response";

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  url = HOST + '/notificaciones';

  notificacionCambio = new Subject<any>();

  constructor(private httpClient: HttpClient) {
  }

  obtenerNumeroNotificaciones() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    const decodedToken = decode(access_token);
    return this.httpClient.get<any>(`${this.url}/count/usuario/${decodedToken.user_name}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listar() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    const decodedToken = decode(access_token);
    return this.httpClient.get<NotificacionResponse[]>(`${this.url}/usuario/${decodedToken.user_name}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  limpiarNotificaciones() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.delete<any>(`${this.url}/desactivar`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
