import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {HOST, TOKEN_NAME} from '../_shared/var.constant';
import {Cuenta} from "../_model/cuenta";
import * as decode from 'jwt-decode';
import {BuscarCuentaResponse} from "../_model/buscar-cuenta-response";
import {ActualizarCuentaRequest} from "../_model/actualizar-cuenta-request";

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  url = HOST + '/cuentas';

  cuentaCambioSubject = new Subject<Cuenta[]>();
  mensajeCambioSubject = new Subject<string>();

  constructor(private httpClient: HttpClient) {
  }

  listarPorIdUsuario(): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    const decodedToken = decode(access_token);
    return this.httpClient.get<Cuenta[]>(`${this.url}/usuario/${decodedToken.user_name}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  obtenerPorIdCuenta(idCuenta: number): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.get<Cuenta[]>(`${this.url}/id-cuenta/${idCuenta}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  obtenerPorNumeroCuenta(numeroCuenta: string): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.get<BuscarCuentaResponse[]>(`${this.url}/numero-cuenta/${numeroCuenta}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  actualizar(cuentas: ActualizarCuentaRequest): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.put(this.url, cuentas, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
