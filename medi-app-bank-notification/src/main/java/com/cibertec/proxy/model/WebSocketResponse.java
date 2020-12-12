package com.cibertec.proxy.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WebSocketResponse {
  private String ok;
  private String mensaje;
  private String username;
  private String tipoNotificacion;
  private int numeroNotificacion;
}
