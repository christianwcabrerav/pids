package com.cibertec.util;

import com.cibertec.dao.IConfiguracionDAO;
import com.cibertec.dao.INotificacionDAO;
import com.cibertec.model.Configuracion;
import com.cibertec.model.Notificacion;
import com.cibertec.model.TipoNotificacion;
import com.cibertec.model.Usuario;
import com.cibertec.proxy.model.WebSocketRequest;
import com.cibertec.proxy.model.WebSocketResponse;
import com.cibertec.util.callers.WebSocketCaller;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class NotificationHelper {

  private final INotificacionDAO notificacionDAO;
  private final IConfiguracionDAO configuracionDAO;
  private final WebSocketCaller webSocketCaller;

  public void validateEnvioNotificaciones(String username, int idUsername, String mensajeNotificacion, int tipoNotificacion) {
    configuracionDAO.findByUsuario_Username(username)
        .map(configuracion -> getWebSocketResponse(username,
            idUsername,
            mensajeNotificacion,
            tipoNotificacion,
            configuracion));
  }

  private WebSocketResponse getWebSocketResponse(String username, int idUsername, String mensajeTransferencia, int tipoNotificacion,
      Configuracion configuracion) {
    if (configuracion.isNotificaciones()) {
      saveNotifacion(idUsername, mensajeTransferencia, tipoNotificacion);
      return enviarNotificacion(this.countNotifications(username), username);
    }
    return null;
  }

  private WebSocketResponse enviarNotificacion(Long numeroNotificacion, String username) {
    return this.webSocketCaller.enviarNotificacion(WebSocketRequest.builder()
        .username(username)
        .tipoNotificacion("Transferencia")
        .mensaje("La transferencia fue exitosa")
        .numeroNotificacion(numeroNotificacion.intValue())
        .build());
  }

  private void saveNotifacion(int idUsername, String mensajeTransferencia, int codigoNotificacion) {
    Notificacion notificacion = new Notificacion();
    notificacion.setActivo(true);
    notificacion.setDescripcion(mensajeTransferencia);
    notificacion.setFechaNotificacion(LocalDateTime.now());
    TipoNotificacion tipoNotificacion = new TipoNotificacion();
    tipoNotificacion.setIdTipoNotificacion(codigoNotificacion);
    notificacion.setTipoNotificacion(tipoNotificacion);
    Usuario usuario = new Usuario();
    usuario.setIdUsuario(idUsername);
    notificacion.setUsuario(usuario);
    notificacionDAO.save(notificacion);
  }

  private Long countNotifications(String username) {
    return notificacionDAO.countByActivoAndUsuario_Username(true, username);
  }
}
