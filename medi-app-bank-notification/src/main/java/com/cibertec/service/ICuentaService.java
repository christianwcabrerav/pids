package com.cibertec.service;

import com.cibertec.dto.api.request.ActualizarCuentaRequest;
import com.cibertec.dto.api.response.BuscarCuentaResponse;
import com.cibertec.dto.api.response.CuentaResponse;
import java.util.List;
import java.util.Optional;

public interface ICuentaService {
  List<CuentaResponse> listarCuentasPorNombreUsuario(String nombreUsuario);
  Optional<BuscarCuentaResponse> buscarPorNumeroCuenta(String numeroCuenta);
  Optional<CuentaResponse> buscarPorIdCuenta(Integer idCuenta);
  List<CuentaResponse> actualizar(ActualizarCuentaRequest cuentaRequestList);
}
