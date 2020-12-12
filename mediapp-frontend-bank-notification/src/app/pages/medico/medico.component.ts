import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Medico} from '../../_model/medico';
import {MedicoService} from '../../_service/medico.service';
import {DialogoComponent} from './dialogo/dialogo.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  dataSource: MatTableDataSource<Medico>;

  displayedColumns = ['idMedico', 'nombres', 'apellidos', 'cmp', 'acciones'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;


  constructor(private medicoService: MedicoService, private matSnackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit() {

    this.medicoService.mensajeCambioSubject.subscribe(data => {
      this.matSnackBar.open(data, 'Aviso', {duration: 3000});
    });

    this.medicoService.medicosCambioSubject.subscribe(data => {
      this.fillDataSourceMedicos(data);
    });

    this.medicoService.listar().subscribe(data => {
      this.fillDataSourceMedicos(data);
    });


  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  private fillDataSourceMedicos(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminar(medico: Medico) {
    this.medicoService.eliminar(medico.idMedico).subscribe(data => {
      this.medicoService.listar().subscribe(medicos => {
        this.medicoService.medicosCambioSubject.next(medicos);
        this.medicoService.mensajeCambioSubject.next('Se ha eliminado el medico');
      });
    });
  }

  openDialog(medico?: Medico): void {

    const med = (medico != null) ? medico : new Medico();

    this.dialog.open(DialogoComponent, {
      width: '250px',
      disableClose: true,
      data: med
    });
  }
}
