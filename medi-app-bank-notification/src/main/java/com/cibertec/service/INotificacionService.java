package com.cibertec.service;

import com.cibertec.dto.api.response.NotificacionResponse;
import java.util.List;

public interface INotificacionService {
  void desactivarNotifaciones(String username);
  Long obtenerNumeroNotificacionesActivasYPorUsername(String username);
  List<NotificacionResponse> listarNotificacionesActivasPorUsername(String username);
}
