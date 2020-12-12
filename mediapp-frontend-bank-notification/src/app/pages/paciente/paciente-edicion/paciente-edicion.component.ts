import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {PacienteService} from '../../../_service/paciente.service';
import {Paciente} from '../../../_model/paciente';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion = false;
  paciente: Paciente;

  constructor(private route: ActivatedRoute, private pacienteService: PacienteService, private router: Router) {

    // Enlazamos el html del formulario al codigo typescript
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl('')
    });
  }

  ngOnInit() {

    this.paciente = new Paciente();

    // Apenas cargue la pagina capturamos el id que viene por parametro
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // usamos 'id' porque asi esta definido en la ruta
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.pacienteService.listarPacientePorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'dni': new FormControl(data.dni),
          'direccion': new FormControl(data.direccion),
          'telefono': new FormControl(data.telefono)
        });
      });
    }
  }

  operar(): void {
    this.paciente.idPaciente = this.form.value['id'];
    this.paciente.nombres = this.form.value['nombres'];
    this.paciente.apellidos = this.form.value['apellidos'];
    this.paciente.direccion = this.form.value['direccion'];
    this.paciente.dni = this.form.value['dni'];
    this.paciente.telefono = this.form.value['telefono'];

    if (this.edicion) {

      this.pacienteService.actualizar(this.paciente).subscribe(data => {
        this.pacienteService.listar().subscribe(pacientes => {
          this.pacienteService.pacienteCambioSubject.next(pacientes);
          this.pacienteService.mensajeCambioSubject.next('Se ha actualizado el registro');
        });
      });

    } else {
      // Insertamos
      this.pacienteService.registrar(this.paciente).subscribe(data => {
        this.pacienteService.listar().subscribe(pacientes => {
          this.pacienteService.pacienteCambioSubject.next(pacientes);
          this.pacienteService.mensajeCambioSubject.next('Se ha insertado el registro');
        });
      });
    }

    this.router.navigate(['paciente']);
  }
}
