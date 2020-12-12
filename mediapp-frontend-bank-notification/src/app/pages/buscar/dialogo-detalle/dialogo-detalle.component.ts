import {Component, Inject, OnInit} from '@angular/core';
import {Consulta} from '../../../_model/consulta';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ExamenService} from '../../../_service/examen.service';
import {ConsultaListaExamen} from '../../../_model/consultaListExamen';

@Component({
  selector: 'app-dialogo-detalle',
  templateUrl: './dialogo-detalle.component.html',
  styleUrls: ['./dialogo-detalle.component.css']
})
export class DialogoDetalleComponent implements OnInit {

  consulta: Consulta;
  examenes: ConsultaListaExamen[];

  // Relacionamos la data que viene desde el otro componente
  constructor(public dialogRef: MatDialogRef<DialogoDetalleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Consulta,
              private examenService: ExamenService) {
  }

  ngOnInit() {

    // Apenas cargue el componente, la data que viene desde el otro componente recepcionalo en mi variable this.consulta
    this.consulta = this.data;
    this.listarExamenes();
  }

  listarExamenes() {
    this.examenService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe((data) => {
      this.examenes = data;
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

}
