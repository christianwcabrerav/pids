package com.cibertec.dto.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BuscarCuentaResponse {
  private int idCuenta;
  private String numeroCuenta;
  private String username;
}
