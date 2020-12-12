package com.cibertec.dto.api.response;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TransactionResponse {

  private Integer codigoTransaction;
  private double monto;
  private String moneda;
  private String fechaOperacion;
  private TipoTransactionResponse tipoTransaction;
  private CuentaResponse cuentaOrigen;
  private CuentaResponse cuentaDestino;
}
