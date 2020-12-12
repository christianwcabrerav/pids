package com.cibertec.dto.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ConfiguracionResponse {
  private Integer idConfiguracion;
  private boolean notificaciones;
  private boolean recibirTransferencias;
  private boolean hacerTransferencias;
  private String username;
}
