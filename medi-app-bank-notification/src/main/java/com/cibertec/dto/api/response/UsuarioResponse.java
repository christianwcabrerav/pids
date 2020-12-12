package com.cibertec.dto.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UsuarioResponse {
  private Integer idUsuario;
  private String username;
}
