import {Injectable} from '@angular/core';
import {HOST, TOKEN_NAME} from '../_shared/var.constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {UsuarioResponse} from "../_model/usuario-response";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioCambio = new Subject<UsuarioResponse[]>();
  mensajeCambioSubject = new Subject<string>();

  private url = HOST;

  constructor(private httpClient: HttpClient) {
  }

  listar() {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.get<UsuarioResponse[]>(`${this.url}/usuarios`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
