package com.cibertec.dto.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class NotificacionResponse {
  private Integer idNotificacion;
  private String descripcion;
  private String fechaNotificacion; //A partir de java8
  private Integer tipoNotificacion;
  private String username;
}
