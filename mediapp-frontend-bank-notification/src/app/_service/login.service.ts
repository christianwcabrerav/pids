import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HOST, TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME, TOKEN_NAME} from '../_shared/var.constant';
import {Router} from '@angular/router';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = HOST + '/oauth/token';
  mensajeCambioSubject = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Esta funcion golpea en endpoint que me va a generar un token
   *
   * @param usuario
   * @param contrasena
   */
  login(usuario: string, contrasena: string) {

    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    // Poner en la consola del chrome: btoa('mitomediapp:mito89codex')  "bWl0b21lZGlhcHA6bWl0bzg5Y29kZXg="
    // el encodeURIComponent es lo que genera el btoa de la consola del browser.
    return this.http.post(this.url, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
    });
  }

  estaLogueado() {
    return sessionStorage.getItem(TOKEN_NAME) != null;
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  enviarCorreo(correo: string) {
    return this.http.post<number>(`${HOST}/login/enviarCorreo`,correo, {
      headers: new HttpHeaders().set('Content-Type','text/plain')
    })
  }

  verificarTokenReset(token: string) {
    return this.http.get<number>(`${HOST}/login/restablecer/verificar/${token}`);
  }

  restablecer(token: string, clave: string) {
    return this.http.post<number>(`${HOST}/login/restablecer/${token}`, clave, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    })
  }
}
