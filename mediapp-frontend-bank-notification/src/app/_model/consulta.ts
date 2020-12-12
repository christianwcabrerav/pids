import {Paciente} from './paciente';
import {Medico} from './medico';
import {Especialidad} from './especialidad';
import {DetalleConsulta} from './detalle-consulta';

export class Consulta {
  idConsulta: number;
  paciente: Paciente;
  fecha: string;
  medico: Medico;
  especialidad: Especialidad;
  consultaDetalleList: DetalleConsulta[];
}

