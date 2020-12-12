import {Component, OnInit} from '@angular/core';
import {Paciente} from '../../_model/paciente';
import {Especialidad} from '../../_model/especialidad';
import {Medico} from '../../_model/medico';
import {PacienteService} from '../../_service/paciente.service';
import {EspecialidadService} from '../../_service/especialidad.service';
import {MedicoService} from '../../_service/medico.service';
import {DetalleConsulta} from '../../_model/detalle-consulta';
import {MatSnackBar} from '@angular/material';
import {Examen} from '../../_model/examen';
import {ExamenService} from '../../_service/examen.service';
import {Consulta} from '../../_model/consulta';
import {ConsultaListaExamen} from '../../_model/consultaListExamen';
import {ConsultaService} from '../../_service/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  fechaMax: Date = new Date();
  fechaSeleccionada: Date = new Date();
  diagnostico: string;
  tratamiento: string;
  listDetalleConsulta: DetalleConsulta[] = [];
  mensaje: string;

  idPacienteSeleccionado: number;
  idEspecialidadSeleccionada: number;
  idMedicoSeleccionado: number;
  idExamenSeleccionado: number;
  examenes: Examen[] = [];
  examenesSeleccionados: Examen[] = [];


  constructor(private pacienteService: PacienteService, private especialidadService: EspecialidadService,
              private medicoService: MedicoService, private consultaService: ConsultaService,
              private snackBar: MatSnackBar, private examenService: ExamenService) {
  }

  ngOnInit() {

    this.listarPacientes();

    this.listarMedicos();

    this.listarEspecialidades();

    this.listarExamenes();

  }

  private listarExamenes() {
    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    });
  }

  private listarEspecialidades() {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    });
  }

  private listarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    });
  }

  private listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  agregar(): void {

    if (this.diagnostico != null && this.tratamiento != null) {
      const deta = new DetalleConsulta();
      deta.diagnostico = this.diagnostico;
      deta.tratamiento = this.tratamiento;
      this.listDetalleConsulta.push(deta);

      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.mensaje = 'Debe agregar un diagnostico y un tratamiento';
      this.snackBar.open(this.mensaje, 'Aviso', {duration: 2000});
    }

  }

  removerDiagnostico(index: number): void {
    this.listDetalleConsulta.splice(index);
  }

  agregarExamen(): void {
    if (this.idExamenSeleccionado > 0) {

      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        const examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.idExamenSeleccionado) {
          cont++;
          break;
        }
      }

      if (cont > 0) {
        this.mensaje = `El examen se encuentra en la lista`;
        this.snackBar.open(this.mensaje, 'Aviso', {duration: 2000});
      } else {
        const examen = new Examen();
        examen.idExamen = this.idExamenSeleccionado;
        this.examenService.listarExamenPorId(this.idExamenSeleccionado).subscribe(data => {
          examen.nombre = data.nombre;
          this.examenesSeleccionados.push(examen);
        });
      }
    } else {
      this.mensaje = `Debe agregar un examen`;
      this.snackBar.open(this.mensaje, 'Aviso', {duration: 2000});
    }
  }

  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }

  aceptar() {
    const medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;
    const especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionada;
    const paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;

    const consulta = new Consulta();
    consulta.especialidad = especialidad;
    consulta.paciente = paciente;
    consulta.medico = medico;
    const tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    consulta.fecha = localISOTime;
    // 2018-09-27T21:00:35.259Z ISODate
    consulta.consultaDetalleList = this.listDetalleConsulta;

    const consultaListaExamen = new ConsultaListaExamen();
    consultaListaExamen.consulta = consulta;
    consultaListaExamen.examenList = this.examenesSeleccionados;

    this.consultaService.registrar(consultaListaExamen).subscribe(data => {

      this.snackBar.open('Se registró', 'Aviso', {duration: 2000});
      setTimeout(() => {
        this.limpiarControles();
      }, 2000);

    });
  }


  estadoBotonRegistrar() {
    return (this.listDetalleConsulta.length === 0 || this.idEspecialidadSeleccionada === 0 ||
      this.idMedicoSeleccionado === 0 || this.idPacienteSeleccionado === 0);
  }

  limpiarControles() {
    this.listDetalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.idPacienteSeleccionado = 0;
    this.idEspecialidadSeleccionada = 0;
    this.idMedicoSeleccionado = 0;
    this.idExamenSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
  }
}






















