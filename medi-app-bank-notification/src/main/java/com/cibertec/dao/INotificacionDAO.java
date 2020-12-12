package com.cibertec.dao;

import com.cibertec.model.Notificacion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface INotificacionDAO extends JpaRepository<Notificacion, Integer> {

  /**
   * Elimina las notificaciones de un usuario cuando clickea la campanita
   * @param username
   */
  @Transactional
  @Modifying
  @Query("UPDATE Notificacion noti SET noti.activo = false WHERE noti.usuario.username = :username")
  void desactivar(@Param("username") String username);

  /**
   * Devuelve el numero de notificaciones segun estado(Activo, inactivo) y username
   * @param activo
   * @param username
   * @return integer
   */
  Long countByActivoAndUsuario_Username(boolean activo, String username);

  /**
   * Devuelve un List de las notificaciones activas por usuario especifico
   * @param activo
   * @param username
   * @return
   */
  List<Notificacion> findByActivoAndUsuario_UsernameOrderByFechaNotificacionDesc(boolean activo, String username);
}
