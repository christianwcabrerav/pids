import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Especialidad} from '../../../_model/especialidad';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EspecialidadService} from '../../../_service/especialidad.service';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion = false;
  especialidad: Especialidad;

  constructor(private route: ActivatedRoute, private especialidadService: EspecialidadService, private router: Router) {

    // Enlazamos el codigo del html al typescript
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl('')
    });
  }

  ngOnInit() {

    this.especialidad = new Especialidad();

    // Apenas cargue la pagina capturamos el id si es que existe
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // Tal cual esta definido en el archivo de rutas
      this.edicion = params['id'] != null; // Si es que existe un id, vamos a editar
      this.initForm();

    });

  }

  private initForm() {
    if (this.edicion) {
      this.especialidadService.listarEspecialidadPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idEspecialidad),
          'nombre': new FormControl(data.nombre)
        });
      });
    }
  }

  operar(): void {

    this.especialidad.idEspecialidad = this.form.value['id'];
    this.especialidad.nombre = this.form.value['nombre'];

    if (this.edicion) {
      this.especialidadService.actualizar(this.especialidad).subscribe(data => {
        this.especialidadService.listar().subscribe(especialidades => {
          this.especialidadService.especialidadesCambioSubject.next(especialidades);
          this.especialidadService.mensajeCambioSubject.next('Se ha actualizado la especialidad');
        });
      });
    } else {
      this.especialidadService.registrar(this.especialidad).subscribe(data => {
        this.especialidadService.listar().subscribe(especialidades => {
          this.especialidadService.especialidadesCambioSubject.next(especialidades);
          this.especialidadService.mensajeCambioSubject.next('Se ha registrado la especialidad');
        });
      });
    }

    this.router.navigate(['especialidad']);
  }
}
