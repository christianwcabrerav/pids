package com.cibertec.util.mappers;

import com.cibertec.dto.api.response.UsuarioResponse;
import com.cibertec.model.Usuario;
import org.springframework.stereotype.Component;

@Component
public class UsuarioMapper {

  public UsuarioResponse buildUsuarioResponse(Usuario usuario) {
    return UsuarioResponse.builder()
        .idUsuario(usuario.getIdUsuario())
        .username(usuario.getUsername())
        .build();
  }

}
