import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Cuenta} from "../../_model/cuenta";
import {CuentaService} from "../../_service/cuenta.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  cuentas: Cuenta[];

  constructor(private cuentaService: CuentaService, public route: ActivatedRoute, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    // Ejecutamos nuestra variable reactiva cuando se ejecute el ngOnInit de nuestro componente
    this.cuentaService.cuentaCambioSubject.subscribe(data => {
      console.log(data);
      this.cuentas = data;
    });

    this.cuentaService.mensajeCambioSubject.subscribe(mensaje => {
      this.matSnackBar.open(mensaje, 'Aviso', {duration: 2000});
    });

    this.cuentaService.listarPorIdUsuario().subscribe(data => {
      console.log(data);
      this.cuentas = data;
    });
  }
}
