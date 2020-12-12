package com.cibertec.controller;

import com.cibertec.dto.api.response.NotificacionResponse;
import com.cibertec.service.INotificacionService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.hibernate.validator.constraints.Email;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/notificaciones")
public class NotificacionController {

  private final INotificacionService notificacionService;

  @GetMapping(value = "/count/usuario/{username:.+}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Long> contarNotificaciones(@Email @PathVariable("username") String username) {
    return new ResponseEntity<>(notificacionService.obtenerNumeroNotificacionesActivasYPorUsername(username), HttpStatus.OK);
  }

  @GetMapping(value = "/usuario/{username:.+}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<NotificacionResponse>> listarNotificaciones(@Email @PathVariable("username") String username) {
    return new ResponseEntity<>(notificacionService.listarNotificacionesActivasPorUsername(username), HttpStatus.OK);
  }

  @DeleteMapping(value = "/desactivar/{username:.+}", produces = MediaType.APPLICATION_JSON_VALUE)
  public void eliminar(@Email @PathVariable("username") String username) {
    this.notificacionService.desactivarNotifaciones(username);
  }
}
