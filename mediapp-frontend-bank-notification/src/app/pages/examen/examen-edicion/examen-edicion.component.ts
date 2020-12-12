import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Examen} from '../../../_model/examen';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ExamenService} from '../../../_service/examen.service';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion = false;
  examen: Examen;

  constructor(private route: ActivatedRoute, private examenService: ExamenService, private router: Router) {
    this.form = new FormGroup({
      'idExamen': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl('')
    });
  }

  ngOnInit() {

    this.examen = new Examen();

    // Chekaremos si vino el id por parametro del componente padre
    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];
      this.edicion = (this.id != null);
      this.initForm();
    });
  }

  private initForm() {
    if (this.edicion) {
      this.examenService.listarExamenPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idExamen': new FormControl(data.idExamen),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        });
      });
    }
  }

  operar(): void {

    // Llenamos la variable examen ya sea para actualizarla o registrarla
    this.examen.idExamen = this.form.value['idExamen'];
    this.examen.nombre = this.form.value['nombre'];
    this.examen.descripcion = this.form.value['descripcion'];

    if (this.edicion) {
      this.examenService.actualizar(this.examen).subscribe(data => {
        this.examenService.listar().subscribe(examenes => {
          this.examenService.examenesCambioSubject.next(examenes);
          this.examenService.mensajeCambioSubject.next('Se ha actualizado el examen');
        });
      });
    } else {
      this.examenService.registrar(this.examen).subscribe(data => {
        this.examenService.listar().subscribe(examenes => {
          this.examenService.examenesCambioSubject.next(examenes);
          this.examenService.mensajeCambioSubject.next('Se ha registrado el examen');
        });
      });
    }

    this.router.navigate(['examen']);
  }

}
