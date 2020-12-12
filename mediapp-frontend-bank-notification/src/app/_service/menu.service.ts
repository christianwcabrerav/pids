import {Injectable} from '@angular/core';
import {HOST, TOKEN_NAME} from '../_shared/var.constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Menu} from '../_model/menu';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCambio = new Subject<Menu[]>();

  private url = HOST;

  constructor(private httpClient: HttpClient) {
  }

  listar() {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.get<Menu[]>(`${this.url}/menus`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorUsuario(nombre: string) {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.httpClient.post<Menu[]>(`${this.url}/menus/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
