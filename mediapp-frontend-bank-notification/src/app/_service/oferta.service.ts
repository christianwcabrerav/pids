import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HOST, TOKEN_NAME} from "../_shared/var.constant";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Paciente} from "../_model/paciente";
import {RegistroOfertaRequest} from "../_model/registro-oferta-request";

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  url = HOST + '/ofertas';

  ofertaCambioSubject = new Subject<Paciente[]>();
  mensajeCambioSubject = new Subject<string>();
  constructor(private httpClient: HttpClient) {
  }

  registrar(registroOfertaRequest: RegistroOfertaRequest): Observable<any> {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.post(this.url, registroOfertaRequest, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
