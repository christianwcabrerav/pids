import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {HOST, TOKEN_NAME} from '../_shared/var.constant';
import {Cuenta} from "../_model/cuenta";
import {TransferenciaRequest} from "../_model/transferencia-request";

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  url = HOST + '/transactions';

  cuentaCambioSubject = new Subject<Cuenta[]>();
  mensajeCambioSubject = new Subject<string>();

  constructor(private httpClient: HttpClient) {
  }

  transferir(transferenciaRequest: TransferenciaRequest): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.post(this.url, transferenciaRequest, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
