import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo-confirmacion-transferencia.component.html',
  styleUrls: ['./dialogo-confirmacion-transferencia.component.css']
})
export class DialogoConfirmacionTransferenciaComponent {

  constructor(private dialogRef: MatDialogRef<DialogoConfirmacionTransferenciaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router
  ) {
    console.log(data);
  }

  aceptar(): void {
    this.dialogRef.close();
    this.router.navigate(['cuenta']);
  }

}
