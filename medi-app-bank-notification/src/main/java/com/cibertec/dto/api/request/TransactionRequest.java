package com.cibertec.dto.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionRequest {
  private int idCuentaOrigen;
  private double monto;
  private String moneda;
  private String cuentaDestino;
}
