import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UsuarioResponse} from "../../_model/usuario-response";
import {UsuarioService} from "../../_service/usuario.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SelectionModel} from "@angular/cdk/collections";
import {OfertaService} from "../../_service/oferta.service";
import {OfertaRequest} from "../../_model/oferta-request";
import {RegistroOfertaRequest} from "../../_model/registro-oferta-request";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<UsuarioResponse>(this.allowMultiSelect, this.initialSelection);

  dataSource: MatTableDataSource<UsuarioResponse>;

  displayedColumns = ['idUsuario', 'Username','acciones'];

  registrarOfertaRequest: RegistroOfertaRequest;

  constructor(
    private usuarioService: UsuarioService,
    private matSnackBar: MatSnackBar,
    private ofertaService: OfertaService
  ) {
  }

  ngOnInit() {

    this.registrarOfertaRequest = new RegistroOfertaRequest();

    // Ejecutamos nuestra variable reactiva cuando se ejecute el ngOnInit de nuestro componente
    this.usuarioService.usuarioCambio.subscribe(data => {
      this.fillDataSourceUsuarios(data);
    });

    this.usuarioService.mensajeCambioSubject.subscribe(mensaje => {
      this.matSnackBar.open(mensaje, 'Aviso', {duration: 5000});
    });

    this.ofertaService.mensajeCambioSubject.subscribe(mensaje => {
      this.matSnackBar.open(mensaje, 'Aviso', {duration: 5000});
    });

    this.usuarioService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource<UsuarioResponse>(data);
    });

  }

  private fillDataSourceUsuarios(data) {
    this.dataSource = new MatTableDataSource(data);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  enviarOferta() {
    console.log(this.selection.selected.length);

    if (this.selection.selected.length === 0) {
      this.ofertaService.mensajeCambioSubject.next('Seleccione al menos un cliente');
      return true;
    }

    this.registrarOfertaRequest.ofertaRequestList = this.selection.selected.map(value => {
      let ofertaRequest: OfertaRequest;
      ofertaRequest = new OfertaRequest();
      ofertaRequest.idUsuario = value.idUsuario;
      ofertaRequest.idTipoOferta = 1; // Tipo de oferta - tarjetas de credito
      return ofertaRequest;
    });

    this.ofertaService.registrar(this.registrarOfertaRequest).subscribe(data => {
      console.log(data);
      this.ofertaService.mensajeCambioSubject.next('Se han mandado las ofertas de tarjeta de credito');
    });
  }
}
