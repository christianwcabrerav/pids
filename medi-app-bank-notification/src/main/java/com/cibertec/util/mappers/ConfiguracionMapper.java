package com.cibertec.util.mappers;

import com.cibertec.dto.api.request.ConfiguracionRequest;
import com.cibertec.dto.api.response.ConfiguracionResponse;
import com.cibertec.model.Configuracion;
import com.cibertec.model.Usuario;
import org.springframework.stereotype.Component;

@Component
public class ConfiguracionMapper {

  public Configuracion buildConfiguracion(ConfiguracionRequest request, Usuario usuario) {
    Configuracion configuracion = new Configuracion();
    configuracion.setIdConfiguracion(request.getIdConfiguracion());
    configuracion.setHacerTransferencias(request.isHacerTransferencias());
    configuracion.setNotificaciones(request.isNotificaciones());
    configuracion.setRecibirTransferencias(request.isRecibirTransferencias());
    configuracion.setUsuario(usuario);
    return configuracion;
  }

  public ConfiguracionResponse buildConfiguracionResponse(Configuracion configuracion) {
    return ConfiguracionResponse.builder()
        .idConfiguracion(configuracion.getIdConfiguracion())
        .hacerTransferencias(configuracion.isHacerTransferencias())
        .recibirTransferencias(configuracion.isRecibirTransferencias())
        .notificaciones(configuracion.isNotificaciones())
        .username(configuracion.getUsuario().getUsername())
        .build();
  }

}
