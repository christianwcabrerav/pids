import {Component, OnInit} from '@angular/core';
// import '../login-animation.js';
import {LoginService} from '../_service/login.service';
import {TOKEN_NAME} from '../_shared/var.constant.js';
import {Router} from '@angular/router';
import {MenuService} from '../_service/menu.service';
import * as decode from 'jwt-decode';
import {WebsocketService} from "../_service/websocket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login-fino.component.html',
  styleUrls: ['./login-fino.component.css']
})
export class LoginComponent implements OnInit {

  usuario = '';
  clave = '';
  mensaje = '';
  error = '';

  form: FormGroup;

  constructor(
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router,
    private wsService: WebsocketService,
    private matSnackBar: MatSnackBar
  ) {
    // Enlazamos el html del formulario al codigo typescript
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

    this.loginService.mensajeCambioSubject.subscribe(mensaje => {
      this.matSnackBar.open(mensaje, 'Aviso', {duration: 5000});
    });

    (window as any).initialize();
  }

  iniciarSesion() {

    this.usuario = this.form.value['email'];
    this.clave = this.form.value['password'];

    this.loginService.login(this.usuario, this.clave).subscribe(data => {
        console.log(data);
        if (data) {
          const token = JSON.stringify(data);
          sessionStorage.setItem(TOKEN_NAME, token);

          const tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));

          // Decodifinamos el token para obtener el usuario del token
          const decodedToken = decode(tk.access_token);
          console.log(decodedToken);

          // Pasamos el usuario al servidor de WebSockets
          this.wsService.loginWs(decodedToken.user_name);

          this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(menues => {
            console.log(menues);
            this.menuService.menuCambio.next(menues);
          });
          console.log(decodedToken)
          // authorities
          if (decodedToken.user_name.includes('admin@gmail.com')) {
            //Usuario Administrador
            this.router.navigate(['usuarios']);
          } else {
            // Despues que el login es correcto lo ruteamos a /cuenta
            this.router.navigate(['cuenta']); // Usuario normal
          }
        }
      }, ex => {
        this.loginService.mensajeCambioSubject.next(ex.error.error_description);
      }
    );
  }

}
