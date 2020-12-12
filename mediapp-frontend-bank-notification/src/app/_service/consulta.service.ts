import {Injectable} from '@angular/core';
import {HOST, TOKEN_NAME} from '../_shared/var.constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConsultaListaExamen} from '../_model/consultaListExamen';
import {FiltroConsulta} from '../_model/filtroConsulta';
import {ConsultaResumen} from '../_model/ConsultaResumen';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url = `${HOST}/consultas`;

  constructor(private http: HttpClient) {
  }

  registrar(consultaDTO: ConsultaListaExamen) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, consultaDTO, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  buscar(filtro: FiltroConsulta) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url + '/buscar', filtro, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarResumen() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<ConsultaResumen[]>(this.url + '/listarResumen', {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  // Por defecto el response es Json, para el pdf hay que especificarlo porque son bytes
  generarReporte() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get(this.url + '/generarReporte', {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  guardarArchivo( data: File ) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    const formData: FormData = new FormData();
    formData.append('file', data);
    return this.http.post(this.url + '/guardarArchivo', formData, {
      responseType: 'text', // El controller devuelve un '1' o '0'
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  // Para efectos del tutorial vamos a traernos en duro el archivo con id '1'
  leerArchivo() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get(this.url + '/leerArchivo/1', {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
