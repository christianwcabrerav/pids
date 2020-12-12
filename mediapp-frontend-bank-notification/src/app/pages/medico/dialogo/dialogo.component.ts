import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Medico} from '../../../_model/medico';
import {MedicoService} from '../../../_service/medico.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  medico: Medico;

  constructor(private dialogRef: MatDialogRef<DialogoComponent>, @Inject(MAT_DIALOG_DATA) public data: Medico,
              private medicoService: MedicoService) {
  }

  ngOnInit() {

    console.log(this.data);

    this.medico = new Medico();
    this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres;
    this.medico.apellidos = this.data.apellidos;
    this.medico.cmp = this.data.cmp;

  }

  operar(): void {

    if (this.medico != null && this.medico.idMedico > 0) {
      this.medicoService.actualizar(this.medico).subscribe(data => {
        this.medicoService.listar().subscribe(medicos => {
          this.medicoService.medicosCambioSubject.next(medicos);
          this.medicoService.mensajeCambioSubject.next('Se ha actualizado al medico');
        });
      });
    } else {
      this.medicoService.registrar(this.medico).subscribe(data => {
        this.medicoService.listar().subscribe(medicos => {
          this.medicoService.medicosCambioSubject.next(medicos);
          this.medicoService.mensajeCambioSubject.next('Se ha registrado nuevo medico');
        });
      });
    }

    this.cancelar();
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
