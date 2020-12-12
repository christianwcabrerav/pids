import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Examen} from '../../_model/examen';
import {ExamenService} from '../../_service/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  dataSource: MatTableDataSource<Examen>;
  displayedColumns = ['id', 'nombre', 'descripcion', 'acciones'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;


  constructor(private examenService: ExamenService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.examenService.mensajeCambioSubject.subscribe(data => {
      this.matSnackBar.open(data, 'Aviso', {duration: 2000});
    });

    this.examenService.examenesCambioSubject.subscribe(data => {
      this.fillDataSourceExamen(data);
    });

    this.examenService.listar().subscribe(data => {
      this.fillDataSourceExamen(data);
    });

  }

  private fillDataSourceExamen(data) {
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
    this.examenService.eliminar(id).subscribe(data => {
      this.examenService.listar().subscribe(examenes => {
        this.examenService.examenesCambioSubject.next(examenes);
        this.examenService.mensajeCambioSubject.next('Se ha eliminado el examen');
      });
    });
  }
}
