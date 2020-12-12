package com.cibertec.proxy.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class WebSocketRequest {
  private String mensaje;
  private String username;
  private String tipoNotificacion;
  private int numeroNotificacion;
}
