import {Cuenta} from "./cuenta";
import {TipoTransactionResponse} from "./tipo-transaction-response";

export class TransferenciaResponse {
  codigoTransaction: number;
  monto: number;
  moneda: string;
  fechaOperacion: Date;
  tipoTransaction: string;
  cuentaOrigen: string;
  cuentaDestino: string;
  usernameDestino: string;
}
