package com.cibertec.dto.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CuentaResponse {

  private int idCuenta;
  private String numeroCuenta;
  private String moneda;
  private double saldo;
  private int idUsername;
  private String username;
  private boolean neutro;
}
