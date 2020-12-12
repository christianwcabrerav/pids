import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CuentaService} from "../../_service/cuenta.service";
import {TransferenciaRequest} from "../../_model/transferencia-request";
import {TransferenciaService} from "../../_service/transferencia.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogoTransferenciaComponent} from "./dialogo/cuenta-destino/dialogo-transferencia.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogoConfirmacionTransferenciaComponent} from "./dialogo/confirmacion-transferencia/dialogo-confirmacion-transferencia.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  idCuenta: number;
  btnDisabledAceptar = true;
  transferenciaRequest: TransferenciaRequest;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private transferenciaService: TransferenciaService,
    private cuentaService: CuentaService,
    private router: Router,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {
    this.form = new FormGroup({
      'numeroCuenta': new FormControl(''),
      'idCuentaOrigen': new FormControl(''),
      'moneda': new FormControl('DOLARES'),
      'monto': new FormControl(''),
      'cuentaDestino': new FormControl('')
    });
  }

  ngOnInit() {

    this.transferenciaService.mensajeCambioSubject.subscribe(mensaje => {
      this.matSnackBar.open(mensaje, 'Aviso', {duration: 5000});
    });

    this.transferenciaRequest = new TransferenciaRequest();

    // Apenas cargue la pagina capturamos el id de la cuenta que viene por parametro
    this.route.params.subscribe((params: Params) => {
      this.idCuenta = params['id'];
      this.initForm();
    });
  }

  initForm() {
    this.cuentaService.obtenerPorIdCuenta(this.idCuenta).subscribe(data => {
      this.form = new FormGroup({
        'numeroCuenta': new FormControl(data.numeroCuenta),
        'idCuentaOrigen': new FormControl(data.idCuenta),
        'moneda': new FormControl('DOLARES'),
        'monto': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        'cuentaDestino': new FormControl('', [Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(9),
          Validators.maxLength(9)]),
        'checkBusqueda': new FormControl('', Validators.required)
      });
    });
  }

  aceptar() {
    this.transferenciaRequest.idCuentaOrigen = this.form.value['idCuentaOrigen'];
    this.transferenciaRequest.moneda = this.form.value['moneda'];
    this.transferenciaRequest.monto = this.form.value['monto'];
    this.transferenciaRequest.cuentaDestino = this.form.value['cuentaDestino'];

    // Insertamos
    this.transferenciaService.transferir(this.transferenciaRequest).subscribe(data => {
      this.dialog.open(DialogoConfirmacionTransferenciaComponent, {
        width: '250px',
        disableClose: true,
        data: data
      });

      this.cuentaService.listarPorIdUsuario().subscribe(data => {
        console.log(data);
        this.cuentaService.cuentaCambioSubject.next(data);
      });

    }, (ex) => {
      console.log(ex);
      this.transferenciaService.mensajeCambioSubject.next(ex.error.mensaje);
    });
  }

  verificarCuentaDestino() {
    this.cuentaService.obtenerPorNumeroCuenta(this.form.value['cuentaDestino']).subscribe(data => {
        this.dialog.open(DialogoTransferenciaComponent, {
          width: '250px',
          disableClose: true,
          data: data
        });
        // this.form.value['checkBusqueda'] = 'xxx';
        this.form.patchValue({
          'checkBusqueda': 'xxxx'
        });
        this.btnDisabledAceptar = false;
      },
      (error) => {
        this.transferenciaService.mensajeCambioSubject.next(error.error.mensaje);
      }
    );
  }
}
