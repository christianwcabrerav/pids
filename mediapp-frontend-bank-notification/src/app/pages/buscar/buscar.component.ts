import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Consulta} from '../../_model/consulta';
import {ConsultaService} from '../../_service/consulta.service';
import {FiltroConsulta} from '../../_model/filtroConsulta';
import {DialogoDetalleComponent} from './dialogo-detalle/dialogo-detalle.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  displayedColumns = ['paciente', 'medico', 'especialidad', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Consulta>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  maxFecha: Date = new Date();

  constructor(private consultaService: ConsultaService, private dialog: MatDialog) {

    this.form = new FormGroup({
      'dni': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta': new FormControl()
    });

  }

  ngOnInit() {
  }

  buscar() {
    const filtro = new FiltroConsulta(this.form.value['dni'], this.form.value['nombreCompleto'], this.form.value['fechaConsulta']);
    filtro.nombreCompleto = filtro.nombreCompleto.toLocaleLowerCase();

    if (filtro.fechaConsulta) {

      // Para setear la fecha que le vamos a pasar al backend a 00:00:00
      filtro.fechaConsulta.setHours(0);
      filtro.fechaConsulta.setMinutes(0);
      filtro.fechaConsulta.setSeconds(0);
      filtro.fechaConsulta.setMilliseconds(0);

      // Si es que el usuario escribe la fecha consulta, lo que hacemos es 'borrar' el contenido de dni y nombreCompleto
      delete filtro.dni;
      delete filtro.nombreCompleto;

    } else {

      delete filtro.fechaConsulta;

      if (filtro.dni.length === 0) {
        delete filtro.dni;
      }

      if (filtro.nombreCompleto.length === 0) {
        delete filtro.nombreCompleto;
      }
    }

    console.log(filtro);
    this.consultaService.buscar(filtro).subscribe(data => {
      // @ts-ignore
      this.dataSource = new MatTableDataSource(data);
    });
  }

  verDetalle(consulta: Consulta) {
    const dialogRef = this.dialog.open(DialogoDetalleComponent, {
      data: consulta
    });
  }

}
