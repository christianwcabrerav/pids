import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PacienteComponent} from './pages/paciente/paciente.component';
import {PacienteEdicionComponent} from './pages/paciente/paciente-edicion/paciente-edicion.component';
import {MedicoComponent} from './pages/medico/medico.component';
import {EspecialidadComponent} from './pages/especialidad/especialidad.component';
import {EspecialidadEdicionComponent} from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import {ExamenComponent} from './pages/examen/examen.component';
import {ExamenEdicionComponent} from './pages/examen/examen-edicion/examen-edicion.component';
import {ConsultaComponent} from './pages/consulta/consulta.component';
import {EspecialComponent} from './pages/consulta/especial/especial.component';
import {BuscarComponent} from './pages/buscar/buscar.component';
import {ReporteComponent} from './pages/reporte/reporte.component';
import {LoginComponent} from './login/login.component';
import {GuardService} from './_service/guard.service';
import {Not403Component} from './pages/not403/not403.component';
import {RecuperarComponent} from "./login/recuperar/recuperar.component";
import {TokenComponent} from "./login/recuperar/token/token.component";
import {CuentaComponent} from "./pages/cuenta/cuenta.component";
import {TransferenciaComponent} from "./pages/transferencia/transferencia.component";
import {PerfilComponent} from "./pages/perfil/perfil.component";
import {UsuarioComponent} from "./pages/usuario/usuario.component";

const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent, children: [
      {path: 'nuevo', component: PacienteEdicionComponent},
      {path: 'edicion/:id', component: PacienteEdicionComponent},
    ], canActivate: [GuardService]
  },
  {path: 'medico', component: MedicoComponent, canActivate: [GuardService]},
  {
    path: 'especialidad', component: EspecialidadComponent, children: [
      {path: 'nuevo', component: EspecialidadEdicionComponent},
      {path: 'edicion/:id', component: EspecialidadEdicionComponent},
    ], canActivate: [GuardService]
  },
  {
    path: 'examen', component: ExamenComponent, children: [
      {path: 'nuevo', component: ExamenEdicionComponent},
      {path: 'edicion/:id', component: ExamenEdicionComponent},
    ], canActivate: [GuardService]
  },
  {path: 'consulta', component: ConsultaComponent, canActivate: [GuardService]},
  {path: 'consulta-especial', component: EspecialComponent, canActivate: [GuardService]},
  {path: 'buscar', component: BuscarComponent, canActivate: [GuardService]},
  {path: 'cuenta', component: CuentaComponent, children: [
      {path: 'transferencia/:id', component: TransferenciaComponent}
    ], canActivate: [GuardService
    ]
  },
  {path: 'usuarios', component: UsuarioComponent, canActivate: [GuardService]},
  {path: 'perfil', component: PerfilComponent, canActivate: [GuardService]},
  // {
  //   path: 'transferencia', component: TransferenciaComponent, children: [
  //     {path: 'nuevo/:id', component: EspecialidadEdicionComponent},
  //   ], canActivate: [GuardService]
  // },
  {path: 'reporte', component: ReporteComponent, canActivate: [GuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'recuperar', component: RecuperarComponent},
  {path: 'not-403', component: Not403Component},
  {
    path: 'recuperar', component: RecuperarComponent, children: [
      {path: ':token', component: TokenComponent}
    ]
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
