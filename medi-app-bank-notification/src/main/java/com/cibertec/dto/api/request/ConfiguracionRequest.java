package com.cibertec.dto.api.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfiguracionRequest {

  private Integer idConfiguracion;
  private boolean notificaciones;
  private boolean recibirTransferencias;
  private boolean hacerTransferencias;
  private String username;

}
