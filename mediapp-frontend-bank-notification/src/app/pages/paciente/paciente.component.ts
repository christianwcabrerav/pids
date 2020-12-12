import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {Paciente} from '../../_model/paciente';
import {PacienteService} from '../../_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  dataSource: MatTableDataSource<Paciente>;

  displayedColumns = ['idPaciente', 'nombres', 'apellidos', 'acciones'];

  cantidad: number;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private pacienteService: PacienteService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {

    // Ejecutamos nuestra variable reactiva cuando se ejecute el ngOnInit de nuestro componente
    this.pacienteService.pacienteCambioSubject.subscribe(data => {
      this.fillDataSourcePacientes(data);
    });

    this.pacienteService.mensajeCambioSubject.subscribe(mensaje => {
      this.matSnackBar.open(mensaje, 'Aviso', {duration: 2000});
    });

    // this.pacienteService.listar().subscribe(data => {
    //   this.fillDataSourcePacientes(data);
    // });
    this.pacienteService.listarPageable(0, 10).subscribe(data => {
      const pacientes = JSON.parse(JSON.stringify(data)).content;
      this.dataSource = new MatTableDataSource(pacientes);
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
    });
  }


  private fillDataSourcePacientes(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(id: number): void {
    this.pacienteService.eliminar(id).subscribe(data => {
      this.pacienteService.listar().subscribe(pacientes => {
        this.pacienteService.pacienteCambioSubject.next(pacientes);
        this.pacienteService.mensajeCambioSubject.next('Se ha eliminado el registro');
      });
    });
  }

  mostrarMas($event: PageEvent) {
    this.pacienteService.listarPageable($event.pageIndex, $event.pageSize).subscribe(data => {
      const pacientes = JSON.parse(JSON.stringify(data)).content;
      this.dataSource = new MatTableDataSource(pacientes);
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
    });
  }
}
