import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginService} from './login.service';
import {TOKEN_NAME} from '../_shared/var.constant';
import * as decode from 'jwt-decode';
import {MenuService} from './menu.service';
import {Menu} from '../_model/menu';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router, private menuService: MenuService) {
  }

  // Este metodo me va a devolver un boolean segun la logica que uno quiera aplicar.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const helper = new JwtHelperService();

    if (!this.loginService.estaLogueado()) {
      console.log('No estas logueado');
      sessionStorage.clear();
      this.router.navigate(['login']);
      return false;
    } else {
      console.log('Si estas logueado');
      const token = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
      // Preguntamos si el token ha expirado
      if (!helper.isTokenExpired(token.access_token)) {
        console.log('El token aun no expira');
        // Decodificamos el token
        // Verificamos que el rol del token tiene permitido estar en esta pagina
        const decodedToken = decode(token.access_token);
        console.log(decodedToken);

        const url = state.url; // pagina que quieres acceder /pacientes /consulta
        console.log(url);

        // Recordar que este me devuelve un asincrono
        // Nunca usar esto en un Activate, ya que solo necesitamos un boolean a secas
        // Usaremos map
        return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((menus: Menu[]) => {

          console.log(menus);

          this.menuService.menuCambio.next(menus); // Refrescamos el menu lateral

          let contador = 0;
          for (const menu of menus) {
            if (menu.url === url) {
              contador++;
              break;
            }
          }

          if (contador > 0) {
            return true;
          } else {
            this.router.navigate(['not-403']);
            return false;
          }

          console.log('El contador es: ' + contador);

        }));
      } else {
        console.log('El token ha expirado');
        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
      }
    }

    return false;
  }
}
