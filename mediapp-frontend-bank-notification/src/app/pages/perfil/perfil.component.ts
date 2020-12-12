import {Component, OnInit} from '@angular/core';
import {ConfiguracionService} from "../../_service/configuracion.service";
import {ConfiguracionRequest} from "../../_model/configuracion-request";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {Cuenta} from "../../_model/cuenta";
import {CuentaService} from "../../_service/cuenta.service";
import {SelectionModel} from "@angular/cdk/collections";
import {UsuarioResponse} from "../../_model/usuario-response";
import {ActualizarCuentaRequest} from "../../_model/actualizar-cuenta-request";
import {OfertaRequest} from "../../_model/oferta-request";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  step = 0;

  idConfiguracion = 0;
  notificaciones = false;
  hacerTransferencias = false;
  recibirTransferencias = false;
  configuracionRequest: ConfiguracionRequest;

  // configuracion para el datatable para neutralizar la cuenta de los usuarios
  dataSource: MatTableDataSource<Cuenta>;
  displayedColumns = ['idCuenta', 'numeroCuenta', 'moneda', 'saldo', 'neutro', 'acciones'];

  // Checkbox para neutralizar las filas seleccionadas
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Cuenta>(this.allowMultiSelect, this.initialSelection);

  actualizarCuentaRequest: ActualizarCuentaRequest;

  constructor(
    private configuracionService: ConfiguracionService,
    private cuentaService: CuentaService,
    private matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit() {

    this.actualizarCuentaRequest = new ActualizarCuentaRequest();

    this.configuracionService.mensajeCambioSubject.subscribe(mensaje => {
      this.matSnackBar.open(mensaje, 'Aviso', {duration: 5000});
    });

    this.cuentaService.cuentaCambioSubject.subscribe(data => {
      this.fillDataSourceCuentas(data);
    });

    // Ejecutamos nuestra variable reactiva cuando se ejecute el ngOnInit de nuestro componente
    this.configuracionService.configuracionCambioSubject.subscribe(data => {
      this.notificaciones = data.notificaciones;
      this.recibirTransferencias = data.recibirTransferencias;
      this.hacerTransferencias = data.hacerTransferencias;
      this.idConfiguracion = data.idConfiguracion;
    });

    this.configuracionService.mensajeCambioSubject.subscribe(mensaje => {
      //this.matSnackBar.open(mensaje, 'Aviso', {duration: 2000});
    });

    this.configuracionService.buscarPorUsername().subscribe(data => {
      this.notificaciones = data.notificaciones;
      this.recibirTransferencias = data.recibirTransferencias;
      this.hacerTransferencias = data.hacerTransferencias;
      this.idConfiguracion = data.idConfiguracion;
    });

    // Cargamos la data de las cuentas para decidir si son neutralizadas
    this.cuentaService.listarPorIdUsuario().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource<Cuenta>(data);
    });

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  guardar() {
    this.configuracionRequest = new ConfiguracionRequest();
    this.configuracionRequest.idConfiguracion = this.idConfiguracion;
    this.configuracionRequest.notificaciones = this.notificaciones;
    this.configuracionRequest.recibirTransferencias = this.recibirTransferencias;
    this.configuracionRequest.hacerTransferencias = this.hacerTransferencias;

    this.configuracionService.actualizar(this.configuracionRequest).subscribe(data => {
      this.configuracionService.mensajeCambioSubject.next('Se ha actualizado tu perfil');
    });
  }

  private fillDataSourceCuentas(data) {
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

  neutralizar() {
    if (this.selection.selected.length === 0) {
      this.configuracionService.mensajeCambioSubject.next('Seleccione al menos una cuenta');
      return true;
    }

    this.actualizarCuentaRequest.cuentas = this.selection.selected.map(value => {
      let cuenta: Cuenta;
      cuenta = new Cuenta();
      cuenta.idCuenta = value.idCuenta;
      console.log(value)
      cuenta.neutro = !value.neutro; // Si lo checkeo es porque quiero neutralizarlo
      return cuenta;
    });
    console.log(this.actualizarCuentaRequest);

    this.cuentaService.actualizar(this.actualizarCuentaRequest).subscribe(value => {
      this.configuracionService.mensajeCambioSubject.next('Se ha actualizado tu perfil');
      this.cuentaService.listarPorIdUsuario().subscribe(data => {
       this.cuentaService.cuentaCambioSubject.next(data);
       
      });
    });
  }
}
