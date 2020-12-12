import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {EspecialidadService} from '../../_service/especialidad.service';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Especialidad} from '../../_model/especialidad';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  dataSource: MatTableDataSource<Especialidad>;

  displayedColumns = ['id', 'nombre', 'acciones'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;


  constructor(private especialidadService: EspecialidadService, public route: ActivatedRoute, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.especialidadService.mensajeCambioSubject.subscribe(data => {
      this.matSnackBar.open(data, 'Aviso', {duration: 2000});
    });

    this.especialidadService.especialidadesCambioSubject.subscribe(data => {
      this.fillDataSourceEspecialidades(data);
    });

    this.especialidadService.listar().subscribe(data => {
      this.fillDataSourceEspecialidades(data);
    });

  }

  private fillDataSourceEspecialidades(data) {
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
    this.especialidadService.eliminar(id).subscribe(data => {
      this.especialidadService.listar().subscribe(especialidades => {
        this.especialidadService.especialidadesCambioSubject.next(especialidades);
        this.especialidadService.mensajeCambioSubject.next('Se ha eliminado la especialidad');
      });
    });
  }
}
