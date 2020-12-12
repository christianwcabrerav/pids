package com.cibertec.dto.api.request;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActualizarCuentaRequest {
  private List<CuentaRequest> cuentas;
}
