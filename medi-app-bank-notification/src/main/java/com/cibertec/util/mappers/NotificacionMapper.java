package com.cibertec.util.mappers;

import com.cibertec.dto.api.response.NotificacionResponse;
import com.cibertec.model.Notificacion;
import java.time.format.DateTimeFormatter;
import org.springframework.stereotype.Component;

@Component
public class NotificacionMapper {
  public NotificacionResponse buildNotificacionRespone(Notificacion notificacion) {
    DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-M-dd HH:mm:ss");
    return NotificacionResponse.builder()
        .idNotificacion(notificacion.getIdNotificacion())
        .descripcion(notificacion.getDescripcion())
        .tipoNotificacion(notificacion.getTipoNotificacion().getIdTipoNotificacion())
        .username(notificacion.getUsuario().getUsername())
        .fechaNotificacion(notificacion.getFechaNotificacion().format(FORMATTER))
        .build();
  }
}
