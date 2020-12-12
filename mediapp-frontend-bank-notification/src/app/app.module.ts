import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// sockets
import { SocketIoModule, SocketIoConfig} from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: environment.wsUrl, options: {}
};

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PacienteComponent} from './pages/paciente/paciente.component';
import {MaterialModule} from './material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {PacienteEdicionComponent} from './pages/paciente/paciente-edicion/paciente-edicion.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MedicoComponent} from './pages/medico/medico.component';
import {DialogoComponent} from './pages/medico/dialogo/dialogo.component';
import {EspecialidadComponent} from './pages/especialidad/especialidad.component';
import {EspecialidadEdicionComponent} from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import {ExamenEdicionComponent} from './pages/examen/examen-edicion/examen-edicion.component';
import {ExamenComponent} from './pages/examen/examen.component';
import {ConsultaComponent} from './pages/consulta/consulta.component';
import {EspecialComponent} from './pages/consulta/especial/especial.component';
import {BuscarComponent} from './pages/buscar/buscar.component';
import {DialogoDetalleComponent} from './pages/buscar/dialogo-detalle/dialogo-detalle.component';
import {ReporteComponent} from './pages/reporte/reporte.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {LoginComponent} from './login/login.component';
import {Not403Component} from './pages/not403/not403.component';
import {RecuperarComponent} from "./login/recuperar/recuperar.component";
import {TokenComponent} from "./login/recuperar/token/token.component";
import {CuentaComponent} from './pages/cuenta/cuenta.component';
import {TransferenciaComponent} from './pages/transferencia/transferencia.component';
import {DialogoTransferenciaComponent} from './pages/transferencia/dialogo/cuenta-destino/dialogo-transferencia.component';
import {DialogoConfirmacionTransferenciaComponent} from './pages/transferencia/dialogo/confirmacion-transferencia/dialogo-confirmacion-transferencia.component';
import {environment} from "../environments/environment";
import { FooterComponent } from './pages/footer/footer.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import {TimeAgoPipe} from "time-ago-pipe";
import { NotificacionComponent } from './pages/notificacion/notificacion.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    PacienteEdicionComponent,
    MedicoComponent,
    DialogoComponent,
    EspecialidadComponent,
    EspecialidadEdicionComponent,
    ExamenComponent,
    ExamenEdicionComponent,
    ConsultaComponent,
    EspecialComponent,
    BuscarComponent,
    DialogoDetalleComponent,
    ReporteComponent,
    LoginComponent,
    RecuperarComponent,
    TokenComponent,
    Not403Component,
    CuentaComponent,
    TransferenciaComponent,
    DialogoTransferenciaComponent,
    DialogoConfirmacionTransferenciaComponent,
    FooterComponent,
    PerfilComponent,
    TimeAgoPipe,
    NotificacionComponent,
    UsuarioComponent
  ],
  entryComponents: [
    DialogoComponent, DialogoDetalleComponent, DialogoTransferenciaComponent, DialogoConfirmacionTransferenciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
