package com.cibertec.util;

import com.cibertec.dao.IUsuarioDAO;
import com.cibertec.dto.api.response.OfertaResponse;
import com.cibertec.dto.api.response.TransactionResponse;
import com.cibertec.util.constants.Constants;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class NotificacionProccesor {

  private final NotificationHelper notificationHelper;
  private final IUsuarioDAO usuarioDAO;

  public void enviarNotificacionFromTransaction(TransactionResponse transactionResponse) {
    // Mandamos las notificaciones TODO aun queda validar si destinatario tiene desactivado las notif.
    String usernameOrigen = transactionResponse.getCuentaOrigen().getUsername();
    String usernameDestino = transactionResponse.getCuentaDestino().getUsername();
    int idUsernameOrigen = transactionResponse.getCuentaOrigen().getIdUsername();
    int idUsernameDestino = transactionResponse.getCuentaDestino().getIdUsername();
    // Validaremos si el usuario que transfiere quiere recibir notificaciones
    this.notificationHelper.validateEnvioNotificaciones(usernameOrigen,
        idUsernameOrigen,
        Constants.MENSAJE_TRANSFERENCIA_ENVIADA,
        Constants.TIPO_NOTIFICACION_TRANSFERENCIA_REALIZADA);
    // Validaremos si el usuario que recibe la transferencia quiere recibir notificaciones
    this.notificationHelper.validateEnvioNotificaciones(
        usernameDestino,
        idUsernameDestino,
        Constants.MENSAJE_TRANSFERENCIA_RECIBIDA,
        Constants.TIPO_NOTIFICACION_TRANSFERENCIA_RECIBIDA);
  }

  public void enviarNotificacionFromOfertas(OfertaResponse ofertaResponse) {

    ofertaResponse.getIdUsuarios()
        .stream()
        .map(this.usuarioDAO::findOne)
        .forEach(usuario -> this.notificationHelper.validateEnvioNotificaciones(
            usuario.getUsername(),
            usuario.getIdUsuario(),
            Constants.MENSAJE_OFERTA_TARJETA_RECIBIDA,
            Constants.TIPO_NOTIFICACION_OFERTA_TARJETA_RECIBIDA));
  }

}
