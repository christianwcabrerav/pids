package com.cibertec.service.impl;

import com.cibertec.dao.INotificacionDAO;
import com.cibertec.dto.api.response.NotificacionResponse;
import com.cibertec.service.INotificacionService;
import com.cibertec.util.mappers.NotificacionMapper;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class NotificacionServiceImpl implements INotificacionService {

  private final INotificacionDAO notificacionDAO;
  private final NotificacionMapper notificacionMapper;

  @Override
  public void desactivarNotifaciones(String username) {
    notificacionDAO.desactivar(username);
  }

  @Override
  public Long obtenerNumeroNotificacionesActivasYPorUsername(String username) {
    return notificacionDAO.countByActivoAndUsuario_Username(true, username);
  }

  @Override
  public List<NotificacionResponse> listarNotificacionesActivasPorUsername(String username) {
    return notificacionDAO.findByActivoAndUsuario_UsernameOrderByFechaNotificacionDesc(true, username)
        .stream()
        .map(this.notificacionMapper::buildNotificacionRespone)
        .collect(Collectors.toList());
  }
}
