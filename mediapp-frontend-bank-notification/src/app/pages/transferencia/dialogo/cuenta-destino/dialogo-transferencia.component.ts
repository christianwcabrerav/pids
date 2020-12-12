import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BuscarCuentaResponse} from "../../../../_model/buscar-cuenta-response";

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo-transferencia.component.html',
  styleUrls: ['./dialogo-transferencia.component.css']
})
export class DialogoTransferenciaComponent implements OnInit {

  cuenta: BuscarCuentaResponse;

  constructor(private dialogRef: MatDialogRef<DialogoTransferenciaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BuscarCuentaResponse,
  ) {
  }

  ngOnInit() {
    this.cuenta = new BuscarCuentaResponse();
    this.cuenta.numeroCuenta = this.data.numeroCuenta;
    this.cuenta.username = this.data.username;
  }

  aceptar(): void {
    this.dialogRef.close();
  }

}
