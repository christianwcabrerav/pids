package com.cibertec.controller;

import com.cibertec.dto.api.request.ConfiguracionRequest;
import com.cibertec.dto.api.response.ConfiguracionResponse;
import com.cibertec.exception.ModeloNotFoundException;
import com.cibertec.service.IConfiguracionService;
import lombok.AllArgsConstructor;
import org.hibernate.validator.constraints.Email;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/configuraciones")
public class ConfiguracionController {

  private final IConfiguracionService configuracionService;


  @GetMapping(value = "/usuario/{nombreUsuario:.+}",produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ConfiguracionResponse> obtenerPorUsername(@Email @PathVariable("nombreUsuario") String nombreUsuario) {
    return new ResponseEntity<>(
        this.configuracionService.buscarPorUsername(nombreUsuario)
            .orElseThrow(() -> new ModeloNotFoundException("No se encontro configuracion para: " + nombreUsuario)),
        HttpStatus.OK);
  }

  @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<ConfiguracionResponse> actualizar(@RequestBody ConfiguracionRequest request) {
    return new ResponseEntity<>(configuracionService.actualizar(request), HttpStatus.OK);
  }
}
