import {Component, OnInit} from '@angular/core';
import {Examen} from '../../../_model/examen';
import {Especialidad} from '../../../_model/especialidad';
import {Medico} from '../../../_model/medico';
import {Paciente} from '../../../_model/paciente';
import {Observable} from 'rxjs';
import {DetalleConsulta} from '../../../_model/detalle-consulta';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Consulta} from '../../../_model/consulta';
import {PacienteService} from '../../../_service/paciente.service';
import {MedicoService} from '../../../_service/medico.service';
import {EspecialidadService} from '../../../_service/especialidad.service';
import {ExamenService} from '../../../_service/examen.service';
import {MatSnackBar} from '@angular/material';
import {filter, map, startWith} from 'rxjs/operators';
import {ConsultaListaExamen} from '../../../_model/consultaListExamen';
import {ConsultaService} from '../../../_service/consulta.service';


@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {

  form: FormGroup;

  myControlPaciente: FormControl = new FormControl();
  myControlMedico: FormControl = new FormControl();

  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  consulta: Consulta;
  examenes: Examen[] = [];

  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];
  diagnostico: string;
  tratamiento: string;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  mensaje: string;

  filteredOpionsPaciente: Observable<any[]>;
  filteredOptionsMedico: Observable<any[]>;

  pacienteSeleccionado: Paciente;
  medicoSeleccionado: Medico;
  especialidadSeleccionada: Especialidad;
  examenSeleccionado: Examen;

  constructor(private builder: FormBuilder, private pacienteService: PacienteService, private medicoService: MedicoService,
              private especialidadService: EspecialidadService, private examenService: ExamenService,
              private snackBar: MatSnackBar, private consultaService: ConsultaService) {

    // Usamos formBuilder porque necesitamos asignar a objetos y no solo a primitivos como fue en FormGroup
    // Cada dato de la derecha esta amarrado en el formulario en la propiedad formControlName
    // Se puede apreciar que se puede instanciar como 'new FormControl()' al lado derecho o tambien llamarlo
    // como 'this.myControlPaciente' como en el primer valor y es porque se ha asignado ese valor al inicio de la clase(line 21).
    // Lo hemos hecho de forma diferente en este caso para podcer hacer uso de los autocompletes(la documentacion lo usa asi).
    // Consideraciones sobre este caso de uso:
    // - Cuando estamos usando two way binding dentro de un formulario estamos obligados a usar "FormBuilder" y no FormGroup.
    this.form = builder.group({
      'paciente': this.myControlPaciente,
      'especialidad': new FormControl(),
      'medico': this.myControlMedico,
      'fecha': new FormControl(new Date()),
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl('')
    });
  }

  ngOnInit() {
    this.listarPacientes();
    this.listarEspecilidad();
    this.listarExamenes();
    this.listarMedicos();

    // Para el autocomplete de los medicos
    // En la documentacione el ejemplo esta con una lista de Strings
    // Lo que estamos haciendo aca es adaptar el ejemplo a Objetos.
    this.filteredOpionsPaciente = this.myControlPaciente.valueChanges.pipe(map(val => this.filterPaciente(val)));

    this.filteredOptionsMedico = this.myControlMedico.valueChanges.pipe(map(val => this.filterMedico(val)));
  }

  filterPaciente(val: any) {
    if (val != null && val.idPaciente > 0) { // Si viene como objeto(cuando elijo la opcion en la pantalla)
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) ||
        option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.dni.includes(val.dni));
    } else { // Si viene como texto( cuando voy digitando los valores)
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) ||
        option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dni.includes(val));
    }
  }

  // Haciendo el simil seria como el toString en java(Queremos mostrar un formarto al llamarlo como objeto)
  displayFnPaciente(val: Paciente) { // Si es que existe 'val' muestra nombres y apellidos, caso contrario el texto.
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  seleccionarPaciente(e: any) {
    // console.log(e);
    this.pacienteSeleccionado = e.option.value;
  }

  filterMedico(val: any) {
    if (val != null && val.idMedico > 0) {
      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) ||
        option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.cmp.includes(val.cmp));
    } else {
      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) ||
        option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.cmp.includes(val));
    }
  }

  displayFnMedico(val: Medico) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  seleccionarMedico(e: any) {
    this.medicoSeleccionado = e.option.value;
  }

  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarEspecilidad() {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    });
  }

  listarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    });
  }

  listarExamenes() {
    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    });
  }

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.especialidadSeleccionada === null
      || this.medicoSeleccionado === null || this.pacienteSeleccionado === null);
  }

  agregarDiagnostico() {

    if (this.diagnostico != null && this.tratamiento != null) {
      const det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.mensaje = `Debe agregar un diagnóstico y tramiento`;
      this.snackBar.open(this.mensaje, 'Aviso', {duration: 2000});
    }
  }

  agregarExamen() {
    if (this.examenSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        const examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.examenSeleccionado.idExamen) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = `El examen se encuentra en la lista`;
        this.snackBar.open(this.mensaje, 'Aviso', {duration: 2000});
      } else {
        this.examenesSeleccionados.push(this.examenSeleccionado);
      }
    } else {
      this.mensaje = `Debe agregar un examen`;
      this.snackBar.open(this.mensaje, 'Aviso', {duration: 2000});
    }
  }

  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }

  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }

  aceptar() {
    this.consulta = new Consulta();
    this.consulta.especialidad = this.form.value['especialidad']; // this.especialidadSeleccionada;
    this.consulta.paciente = this.form.value['paciente']; // this.pacienteSeleccionado;
    this.consulta.medico = this.form.value['medico']; // this.medicoSeleccionado;
    this.consulta.consultaDetalleList = this.detalleConsulta;
    const tzoffset = (this.form.value['fecha']).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    this.consulta.fecha = localISOTime;

    const consultaListaExamen = new ConsultaListaExamen();
    consultaListaExamen.consulta = this.consulta;
    consultaListaExamen.examenList = this.examenesSeleccionados;

    console.log(consultaListaExamen);

    this.consultaService.registrar(consultaListaExamen).subscribe(data => {

      // console.log(data);

      this.snackBar.open('Se registró', 'Aviso', {duration: 2000});

      setTimeout(() => {
        this.limpiarControles();
      }, 2000);

    });
  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.pacienteSeleccionado = null;
    this.especialidadSeleccionada = null;
    this.medicoSeleccionado = null;
    this.examenSeleccionado = null;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
    this.consulta = new Consulta();
  }
}
