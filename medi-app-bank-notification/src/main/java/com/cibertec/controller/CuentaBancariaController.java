package com.cibertec.controller;

import com.cibertec.dto.api.request.ActualizarCuentaRequest;
import com.cibertec.dto.api.response.BuscarCuentaResponse;
import com.cibertec.dto.api.response.CuentaResponse;
import com.cibertec.exception.ModeloNotFoundException;
import com.cibertec.service.ICuentaService;
import java.util.List;
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
@RequestMapping("/cuentas")
public class CuentaBancariaController {

  private final ICuentaService cuentaService;

  @GetMapping(value = "/usuario/{nombreUsuario:.+}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<CuentaResponse>> listarPorNombreUsuario(@Email @PathVariable("nombreUsuario") String nombreUsuario) {
    List<CuentaResponse> cuentas = cuentaService.listarCuentasPorNombreUsuario(nombreUsuario);
    return new ResponseEntity<>(cuentas, HttpStatus.OK);
  }

  @GetMapping(value = "/numero-cuenta/{numeroCuenta}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<BuscarCuentaResponse> obtenerPorNumeroCuenta(@PathVariable("numeroCuenta") String numeroCuenta) {
    return new ResponseEntity<>(
        cuentaService.buscarPorNumeroCuenta(numeroCuenta)
            .orElseThrow(() -> new ModeloNotFoundException("No se encontro el numero de cuenta: " + numeroCuenta)),
        HttpStatus.OK);
  }

  @GetMapping(value = "/id-cuenta/{idCuenta}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<CuentaResponse> obtenerPorIdCuenta(@PathVariable("idCuenta") Integer idCuenta) {
    return new ResponseEntity<>(
        cuentaService.buscarPorIdCuenta(idCuenta)
            .orElseThrow(() -> new ModeloNotFoundException("No se encontro el numero de cuenta: " + idCuenta)),
        HttpStatus.OK);
  }

  /**
   * Habilitar o deshabilitar las cuentas(neutralizar)
   *
   * @param request
   * @return
   */
  @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<CuentaResponse>> neutralizar(@RequestBody ActualizarCuentaRequest request) {
    return new ResponseEntity<>(
        cuentaService.actualizar(request),
        HttpStatus.OK);
  }

}
